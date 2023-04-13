import { ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject, Subscription, combineLatest, firstValueFrom, from, map } from 'rxjs';
import { MovieListService } from '../shared/services/movie.list.service';
import { GameDetails } from '../shared/services/GameList';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Full, ReviewData } from '../shared/services/user';
import { Guid } from 'guid-typescript';
import { AngularFirestore, fromDocRef } from '@angular/fire/compat/firestore';
import { LogUserService } from '../shared/services/log-user.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent {

  subs: Subscription;
  gameDetails!: GameDetails;
  userName!: string | null | undefined;
  uuid!: string | undefined;
  isLoading = false;

  doc: any;

  reviewExist: boolean = false;

  reviewError: boolean = false;

  get slug(): string {
    return this.router.snapshot.params['gameName']
  }

  // get document() {
  //   if (this.firestore.collection(`${this.uuid}`)) {
  //     const docRef = this.firestore.collection(`${this.uuid}`).doc(this.slug);
  //     docRef.get().subscribe((doc) => {
  //       if (doc.exists) {
  //         const data = doc.data();
  //         console.log(data);
  //         this.doc = data; // set the value of this.doc to the retrieved data

  //         this.formGroup.patchValue({
  //           review_text: this.doc.review_text
  //         })
  //         this.cd.markForCheck()

  //       } else {
  //         console.log('Document does not exist');
  //       }
  //     });
  //   } else {
  //     console.log('User has no document');
  //   }
  //   return this.doc
  // }
  
  formGroup = new FormGroup({
    user_name: new FormControl('', []),
    game: new FormControl('', []),
    review_text: new FormControl('', [Validators.required]),
    rating: new FormControl<number | null>(null, [Validators.max(10)])
  })

  get submitDisabled() {
    return this.formGroup.invalid
  }

  constructor(
    private movieService: MovieListService,
    private router: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private cd: ChangeDetectorRef,
    private logService: LogUserService,
    private route: Router,
  ) {
    this.subs = new Subscription;
    this.doc  = new BehaviorSubject(null)

    const subs3 = this.afAuth.user.pipe(
      map(v => v?.displayName)
    ).subscribe(userName => {
      this.formGroup.patchValue({
        user_name: userName,
        game: this.slug,
      })
      this.formGroup.get('user_name')?.disable()
      this.formGroup.get('game')?.disable()
    })
    this.subs.add(subs3)

  }

  ngOnInit() {

    /////////////////////
    ////SUBSCRIPTIONS///
    /////////////////////

    const subs1 = this.afAuth.user.pipe(
      map(u => u?.displayName)
    );

    const subs3 = this.afAuth.user.pipe(
      map(u => u?.uid)
    );

    const combinedSubs = combineLatest([subs1, subs3]).subscribe(([name, uuid]) => {
      this.userName = name;
      this.uuid = uuid;

      this.logService.getDocument(uuid,this.slug).subscribe((doc)=> {
        if(doc){
          console.log(doc.data())
          const docData = doc.data()
          this.formGroup.patchValue({
            review_text: docData.review_text
          })
          this.formGroup.get('review_text')?.disable()

          this.reviewExist = true;
        }
        else {
          console.log("No Doc found")
        }
      })
    });

    const subs2 = this.movieService.getDetailsData(this.slug).pipe(
      map((res: GameDetails) => res),
    ).subscribe(gameRes => {
      this.gameDetails = gameRes
      this.isLoading = true;
    })

    this.subs.add(subs2)
    this.subs.add(combinedSubs)
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }


  onSubmit(): void {
    const formGroupValue = this.formGroup.value as Full<typeof this.formGroup.value>

    const subs4 = this.afAuth.user.pipe(
      map((profile) => {
        const payload: ReviewData = {
          id: Guid.create().toString(),
          game_name: this.gameDetails.slug,
          uuid_user: profile?.uid,
          review_text: formGroupValue.review_text,
          user_name: profile?.displayName,
          created_at: new Date().toISOString(),
          image: {
            img1: this.gameDetails.background_image,
            img2: this.gameDetails.background_image_additional
          }
        }
        return payload
      })
    ).subscribe(async (payload) => {

      try {
        // Check existing documents with matching user_name and game_name fields
        const querySnapshot = await firstValueFrom(this.firestore.collection(`${payload.uuid_user}`, ref =>
          ref.where('user_name', '==', payload.user_name)
            .where('game_name', '==', payload.game_name)
        ).get());

        if (querySnapshot.empty) {
          const docRef = await this.firestore.collection(`${payload.uuid_user}`).doc(this.slug).set(payload);

          this.formGroup.get('review_text')?.markAsTouched();
        } else {
          console.warn('Duplicate document detected, not adding to collection');
          this.reviewError = true;

        }

      } catch (error) {
        console.error('Error querying or adding document: ', error);
      }

    })
    this.subs.add(subs4)
  }

  onMobile(): boolean {
    return window.innerWidth <= 700;
  }


}

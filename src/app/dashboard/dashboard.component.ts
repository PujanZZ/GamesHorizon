import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../shared/services/auth.service';
import { Subscription, combineLatest, map } from 'rxjs';
import { LogUserService } from '../shared/services/log-user.service';
import { ReviewData } from '../shared/services/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  userName: string| null | undefined;
  subs: Subscription;
  uuid: string | null | undefined;
  hoveredIndex = 0;
  isLoading: boolean = false;

  docData: ReviewData[] = []
  formattedDate!: string;

  formGroup = new FormGroup({
    name      : new FormControl(null,[Validators.required])
  })

  
  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private logService: LogUserService,
    private cd: ChangeDetectorRef,
  ) {
    this.subs = new Subscription;
  }

  get submitDisabled() {
    return this.formGroup.invalid || !this.formGroup.dirty
  }


  ngOnInit() {

  /////////////////////
  /// SUBSCRIPION//////
  ////////////////////

    const subs1 = this.afAuth.user.pipe(
      map(u => u?.displayName)
    )
  
    const subs2 = this.afAuth.user.pipe(
      map(u => u?.uid)
    );
  
    const combinedSubs = combineLatest([subs1, subs2]).subscribe(([name, uuid]) => {

      
      this.userName = name;
      this.uuid = uuid;
  
      this.logService.getDocumentOfUser(uuid).subscribe((doc)=> {
        const data = doc.map((a: ReviewData) => a)
    
        this.docData = data;
        this.isLoading = true;
      })
    });

    this.subs.add(combinedSubs)
  
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  ////////////////
  // Hooks //////
  ///////////////

  

  handleUsernameUpdate(userName : string) {
    this.logService.handleUpdateUserName(userName);
  }

  onDocDelete(slug: string | null) {
    this.logService.deleteDocument(this.uuid, slug);
    // Remove the deleted document from the docData array
    this.docData = this.docData.filter(doc => doc.game_name !== slug);
    // Trigger change detection to update the UI
    this.cd.detectChanges();
  }
  
  

  ////////////////
  //// extra /////
  ////////////////

  onMobile(): boolean {
    return window.innerWidth <= 700;
  }

}



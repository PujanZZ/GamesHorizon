export interface User {
    id: string;
    displayName: string;
    email: string;
 }

 export interface Ratings {
    ratings: {
        title: string,
        percent: number
      }[];
 }

 export interface ReviewData {
      uuid_user: string | undefined,
      id: string,
      user_name: string | null | undefined,
      game_name: string | null,
      review_text: string | null,
      created_at: string,
      game_id?: number,
      image: {
          img1: string,
          img2: string,
      }
 }

 export type Full<T> ={
      [P in keyof T]-?:T[P];
 }

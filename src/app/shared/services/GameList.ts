export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: {
    id: number;
    title: string;
    count: number;
    percent: number;
  }[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
  };
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  esrb_rating: {
    id: number;
    name: string;
    slug: string;
  };
  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
    released_at: string;
    requirements: {
      minimum: string;
      recommended: string;
    };
  }[];
  genres: {
    id: number;
    name: string;
    slug: string;
  }[];
  stores: {
    id: number;
    store: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
  clip: {
    clip: string;
    clips: {
      320: string;
      640: string;
      full: string;
    };
    video: string;
    preview: string;
  };
  tags: {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
  }[];
  short_screenshots: {
    id: number;
    image: string;
  }[];
}

export interface GameDetails {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: MetacriticPlatform[];
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  reactions: { [key: string]: number };
  added: number;
  added_by_status: AddedByStatus;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number | null;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  user_game: null | unknown;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
      image: string | null;
      year_end: number | null;
      year_start: number | null;
      games_count: number;
      image_background: string;
    };
    released_at: string;
    requirements: {
      minimum?: string;
      recommended?: string;
    };
  }[];
  parent_platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    }
  }[];
  stores: Store[];
  developers: Developer[];
  genres: Genre[];
  tags: Tag[];
  publishers: Publisher[];
  esrb_rating: EsrbRating | null;
  clip: string | null;
  description_raw: string;
}

export interface MetacriticPlatform {
  metascore: number;
  url: string;
  platform: Platform;
}

export interface Platform{
  name: string,
  platform: number,
  slug: string,
}

export interface EsrbRating {
  id: number,
  name: string,
  slug: string,
}

export interface Store {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count?: number;
  image_background?: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface AddedByStatus {
  yet: number,
  owned: number,
  beaten: number,
  toplay: number,
  dropped: number,
  playing: number,

}

export interface Rating {
  id: number,
  title: string,
  count: number,
  percent: number,
}
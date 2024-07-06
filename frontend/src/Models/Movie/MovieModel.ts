import { ENTITY_STATUS } from "../ENUM/ENTITY_STATUS";

export interface Movie {
    Id: number;
    PrimaryImage?: Uint8Array;
    Name?: string;
    Description?: string;
    Trailer?: string;
    Director?: string;
    Rating?: number;
    Premiere?: Date;
    Duration?: string;
    CreatedAt?: Date;
    Status?: ENTITY_STATUS;
    MovieCasts: MovieCast[];
    MovieCategories: MovieCategory[];
    MovieGenres: MovieGenre[];
    MovieLikes: MovieLike[];
    Reviews: Review[];
    Watchlists: Watchlist[];
}

export interface MovieCast {
    // Define las propiedades de MovieCast
}

export interface MovieCategory {
    // Define las propiedades de MovieCategory
}

export interface MovieGenre {
    // Define las propiedades de MovieGenre
}

export interface MovieLike {
    // Define las propiedades de MovieLike
}

export interface Review {
    // Define las propiedades de Review
}

export interface Watchlist {
    // Define las propiedades de Watchlist
}

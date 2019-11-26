export class Movie {
    id: number;
    image: string;
    title: string;
    releaseDate: string;
    overview: string;
    score: number;
    genre: Array<number>;
        
    constructor(id:number, image:string, title:string, releaseDate:string, overview:string, score:number, genre:Array<number>){
        this.id = id;
        this.image = image;
        this.title = title;
        this.releaseDate = releaseDate;
        this.overview = overview;
        this.score = score;
        this.genre = genre;
    }
}

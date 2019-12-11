export class Show {
    id: number;
    image: string;
    score: number;
    title: string;
    overview: string;
    date: string;
    genres: Array<number>;

    constructor(id:number, image:string, score:number, title:string, overview:string, date:string, genres:Array<number>){
        this.id = id;
        this.image = 'https://image.tmdb.org/t/p/original' + image;
        this.score = score;
        this.title = title;
        this.overview = overview;
        this.date = date;
        this.genres = genres;
    }
}

export class InTheater {
    id: number;
    title: string;
    backdrop: string;
    releaseDate: string;
    topBilled: string[];

    constructor(id:number, title:string, backdrop:string, releaseDate:string){
        this.id = id;
        this.title = title;
        this.backdrop = 'https://image.tmdb.org/t/p/original' + backdrop;
        this.releaseDate = releaseDate;
    }
    
}


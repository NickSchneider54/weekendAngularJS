export class CastMember {
    id: number;
    image: string;
    name: string;
    character: string;

    constructor(id:number, image:string, name:string, character:string){
        this.id = id;
        this.image = "https://image.tmdb.org/t/p/original" + image;
        this.name = name;
        this.character = character;
    }
}

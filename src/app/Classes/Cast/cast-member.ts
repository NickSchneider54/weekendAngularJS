export class CastMember {
    image: string;
    name: string;
    character: string;

    constructor(image:string, name:string, character:string){
        this.image = "https://image.tmdb.org/t/p/original" + image;
        this.name = name;
        this.character = character;
    }
}

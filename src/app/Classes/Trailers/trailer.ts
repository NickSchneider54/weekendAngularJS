import { SafeResourceUrl } from '@angular/platform-browser';

export class Trailer {
    key: SafeResourceUrl;
    name: string;

    constructor(key:SafeResourceUrl, name:string){
        this.key = key;
        this.name = name;
    }
}

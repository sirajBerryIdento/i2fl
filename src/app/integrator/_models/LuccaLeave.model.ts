export class LuccaLeave {
    id: number | undefined;
    name: string | undefined;
    url: string | undefined;
    
    constructor(id: number, name: string, url: string) {
        this.id = id;
        this.name = name;
        this.url = url;
    }
}

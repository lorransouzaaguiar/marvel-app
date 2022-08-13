export class Comic {
    
    //@ts-ignore
    #marveLogo: string = process.env.marvelLogo

    constructor (readonly name: string, readonly url: string, private _urlImage?: string) {
       
    }
    
    static toDomain(data: any) { 
        return new Comic(data.name, data.resourceURI) 
    }

    public isValid() {
        if(this._urlImage !== undefined && this._urlImage.includes('image_not_available')) {
                return false
        }
        return true
    }

    get urlImage(): string | undefined{
        return this._urlImage
    }
}
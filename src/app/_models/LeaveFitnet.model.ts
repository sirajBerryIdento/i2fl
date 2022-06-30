export class FitnetLeave {
    email: String | undefined;
    typeId: number | undefined;
    beginDate: String | undefined;
    endDate: String | undefined;
    startMidday: Boolean | undefined;
    endMidday: Boolean | undefined;
    
    constructor(email: String, typeId: number, beginDate: String, endDate: String, startMidday: boolean, endMidday: boolean) {
        this.email = email;
        this.beginDate=beginDate;
        this.endDate = endDate;
        this.typeId = typeId;
        
        this.startMidday = startMidday;
        this.endMidday = endMidday;
    }
    

    toString(){
        console.log("email: "+this.email,"beginDate: "+this.beginDate,"endDate: "+this.endDate,"typeId: "+this.typeId)
    }
}
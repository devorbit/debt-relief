export class Criteria {
    pin: number=0;
    reasonCd: string='';
    filePath: string ='';
    needDetails:string = '';

    constructor(pin: number, reasonCd: string, filePath: string, needDetails: string) {
        this.pin = pin;
        this.reasonCd = reasonCd;
        this.filePath = filePath;
        this.needDetails = needDetails;
    }

}
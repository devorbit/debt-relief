export class Criteria {
    pin: string='';
    reasonCd: string='';
    filePath: string ='';
    needDetails:string = '';

    constructor(pin: string, reasonCd: string, filePath: string, needDetails: string) {
        this.pin = pin;
        this.reasonCd = reasonCd;
        this.filePath = filePath;
        this.needDetails = needDetails;
    }

}
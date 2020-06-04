export class Criteria {
    pin: number=0;
    reasonCd: string='';
    needDetails:string = '';

    constructor(pin: number, reasonCd: string, needDetails: string) {
        this.pin = pin;
        this.reasonCd = reasonCd;
        this.needDetails = needDetails;
    }

}
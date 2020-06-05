export class DebtRelief {
    pin: number=0;
    accountNB: number=0;
    subscriberId:String ='';
    acctTypeCD:String ='';
    debtReliefOption:string = '';
    debtReliefValue: number = 0.0;
    debtReliefStatusCd: string='';
    debtReliefAppliedDt: string ='';

    constructor(pin: number, accountNB: number, subscriberId: String,acctTypeCD :String, debtReliefOption: string,
                debtReliefValue: number, debtReliefStatusCd: string, debtReliefAppliedDt:string) {

        this.pin = pin;
        this.accountNB = accountNB;
        this.subscriberId = subscriberId;
        this.acctTypeCD = acctTypeCD;
        this.debtReliefOption = debtReliefOption;
        this.debtReliefValue = debtReliefValue;
        this.debtReliefStatusCd = debtReliefStatusCd;
        this.debtReliefAppliedDt = debtReliefAppliedDt;
    }

}




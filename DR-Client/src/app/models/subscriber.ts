export class Subscriber {
    subscriberId: string='';
    creditScoreFrom: number=0;
    creditScoreTo:number =0;
    debtReliefOption:string = '';
    debtReliefValue: number = 0.0;
    loanType: string='';
    constructor(subscriberId: string, creditScoreFrom: number, creditScoreTo: number, debtReliefOption: string
        ,         debtReliefValue: number, loanType: string) {
        // this.id = id;
        this.subscriberId = subscriberId;
        this.creditScoreFrom = creditScoreFrom;
        this.creditScoreTo = creditScoreTo;
        this.debtReliefOption = debtReliefOption;
        this.debtReliefValue = debtReliefValue;
        this.loanType = loanType;
    }

}




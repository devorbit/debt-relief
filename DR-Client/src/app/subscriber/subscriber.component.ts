/**
 * Created by c17533a on 6/3/20
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {SubscriberService} from "../services/subscriber.service";
import {Subscriber} from "../models/subscriber";
import {HttpClient} from "@angular/common/http";
import {SubscriberList} from "../models/subscriber-list"

@Component({
    selector: 'subscriber',
    templateUrl: './subscriber.component.html',
    styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

    formGroup: FormGroup;
    subscriber: Subscriber = new Subscriber('',0,0,'',0,'');
    post: any='';

    subscriberList: SubscriberList;

    subscriberIdValue: string;

    constructor(private formBuilder: FormBuilder, private subscriberService: SubscriberService) {
        this.formGroup = this.formBuilder.group({
            'subscriberId': [null, Validators.required],
            'creditScoreFrom': [null, [Validators.required, Validators.max(849)]],
            'creditScoreTo': [null, [Validators.required, Validators.max(850)]],
            'debtReliefOption': [null, Validators.required ],
            'debtReliefValue': [null, Validators.required ],
            'loanType': [null, Validators.required ]
        });

        this.subscriberService.getSubscriberList().subscribe((res:any)=> {
            this.subscriberList = res;
            console.log(this.subscriberList);
        });
    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.post='ok';
        this.subscriber = this.formGroup.value;
        console.log('Submitting' + this.subscriber )
        this.subscriberService.checkSubscriber(this.subscriber.subscriberId,this.subscriber.loanType,this.subscriber.creditScoreFrom,this.subscriber.creditScoreTo,this.subscriber.debtReliefOption).subscribe(
            succesData => {
                    console.log(succesData);
                    this.subscriberService.submitSubscriber(this.subscriber);
                    alert("Subscriber Details updated Successfully!")
                    },
                err => {
                    console.error(err);
                    alert("Subscriber Details are already there!")
                } );
    }

}

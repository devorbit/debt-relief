/**
 * Created by c17533a on 6/3/20
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'subscriber-details',
    template: `
<div class="form-container" *ngIf="!post" novalidate> 
  <form [formGroup]="formGroup" (ngSubmit)="onSubmit(formGroup.value)" class="form">
  
  <div style="padding-bottom: 1em">
  <label style="font-size: x-large"><strong>Subscriber Details: </strong></label>
</div>
  

    <mat-form-field class="form-element">
      <input matInput placeholder="SubscriberID" formControlName="subscriberId">
      <mat-error *ngIf="!formGroup.controls['subscriberId'].valid && formGroup.controls['subscriberId'].touched">
        Enter your Subscriber ID
      </mat-error>
    </mat-form-field>
    
    <p>Credit Score Range: </p>

    <mat-form-field class="form-element">
      <input matInput placeholder="From" formControlName="creditFrom">
      <mat-error *ngIf="!formGroup.controls['creditFrom'].valid && formGroup.controls['creditFrom'].touched">
        Value is Required
      </mat-error>
    </mat-form-field>

    <mat-form-field class="form-element">
      <input matInput placeholder="To" formControlName="creditTo">
      <mat-error *ngIf="!formGroup.controls['creditTo'].valid && formGroup.controls['creditTo'].touched">
        Value is Required
      </mat-error>
    </mat-form-field>

    <mat-form-field class="form-element">
    <mat-select placeholder="Debt Relief Option" formControlName="debtReliefOption">
      <mat-option value="Deferred Payments">Deferred Payments</mat-option>
      <mat-option value="Refinance with longer repayment terms">Refinance with longer repayment terms</mat-option>
      <mat-option value="Reduce interest rates">Reduce interest rates</mat-option>
      <mat-option value="Reduce payment amt">Reduce payment amt</mat-option>
      <mat-option value="Waived late fees">Waived late fees</mat-option>
    </mat-select>
    <mat-error *ngIf="!formGroup.controls['debtReliefOption'].valid && formGroup.controls['debtReliefOption'].touched">
        Select a Value
      </mat-error>
    </mat-form-field>
    
    <mat-form-field class="form-element">
      <input matInput placeholder="Debt Relief Value" formControlName="debtReliefValue">
      <mat-error *ngIf="!formGroup.controls['debtReliefValue'].valid && formGroup.controls['debtReliefValue'].touched">
        Value is Required
      </mat-error>
    </mat-form-field>
    
    <mat-form-field class="form-element">
    <mat-select placeholder="Loan Type" formControlName="loanType">
      <mat-option value="AUTO LOAN">AUTO LOAN</mat-option>
      <mat-option value="AUTO LEASE">AUTO LEASE</mat-option>
      <mat-option value="CREDIT CARD">CREDIT CARD</mat-option>
      <mat-option value="CONVENTIONAL REAL ESTATE MORTGAGE">CONVENTIONAL REAL ESTATE MORTGAGE</mat-option>
      <mat-option value="REV CHARGE ACCOUNT">REV CHARGE ACCOUNT</mat-option>
      <mat-option value="STUDENT LOAN">STUDENT LOAN</mat-option>
      <mat-option value="UTILITY COMPANY">UTILITY COMPANY</mat-option>
      <mat-option value="CELLULAR PHONE">CELLULAR PHONE</mat-option>
    </mat-select>
    <mat-error *ngIf="!formGroup.controls['loanType'].valid && formGroup.controls['loanType'].touched">
        Select a Value
        </mat-error>
    </mat-form-field>

    <div class="form-element">
      <button mat-raised-button color="primary" type="submit" class="button" [disabled]="!formGroup.valid">Submit Form</button>
    </div>

  </form>
</div>
   <!--<div class="form-container">
   <label style="padding-bottom: 20px"><strong>Subscriber Details: </strong></label>
  <mat-form-field>
    <input matInput placeholder="Subscriber Id">
  </mat-form-field>

  <mat-form-field>
    <input matInput placeholder="Subscriber Id">
  </mat-form-field>
  
  <mat-form-field>
    <input matInput placeholder="Subscriber Id">
  </mat-form-field>
  
  &lt;!&ndash;<mat-slider step="4" tickInterval="3"></mat-slider>
  <mat-slider
  thumbLabel
  [displayWith]="formatLabel"
  tickInterval="1000"
  min="0"
  step="1" tickInterval="3"
  max="800"></mat-slider>&ndash;&gt;

  <mat-form-field>
    <mat-select placeholder="Select">
      <mat-option value="option">Option</mat-option>
    </mat-select>
  </mat-form-field>
</div>-->
`,
})
export class SubscriberDetailsComponent implements OnInit {

    formGroup: FormGroup;
    post: any = '';

    constructor(private formBuilder: FormBuilder) {
        this.formGroup = this.formBuilder.group({
            'subscriberId': [null, Validators.required],
            'creditFrom': [null, Validators.required],
            'creditTo': [null, Validators.required],
            'debtReliefOption': [null, Validators.required ],
            'debtReliefValue': [null, Validators.required ],
            'loanType': [null, Validators.required ]
        });
    }

    ngOnInit(): void {
    }

    onSubmit(post) {
        this.post = post;
    }

}
 
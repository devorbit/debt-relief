import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CriteriaService } from "../services/criteria.service";
import { Criteria } from "../models/criteria";
import { NgxSpinnerService } from 'ngx-spinner';
import { user_profile } from '../user.profile';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import {DebtReliefOption} from "../models/debt-relief-option";

@Component({
  selector: 'criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {
  formGroup: FormGroup;
  // criteria: Criteria = new Criteria(0, '', '', '');
  // post: any = '';
  reasonDD;
  needDD;
  criteriaPresent = false;
  uploader: FileUploader;
  first = true;
  tradeData;

  displayedColumns: string[] = ['accountNB', 'acctSTATUSCD', 'acctTypeCD', 'acctBalanceAm', 'acctPaymentAmount', 'subscriberName', 'enhancedSpclCmntCD', 'termsFreq', 'terms', 'debtReliefOption', 'debtReliefValue', 'apply'];
  debtReliefOptionList: DebtReliefOption;


  constructor(private formBuilder: FormBuilder, private criteriaService: CriteriaService, private spinner: NgxSpinnerService) {
    this.formGroup = this.formBuilder.group({
      'reasonCd': [null, Validators.required],
      'needDetails': [null, Validators.required]
    });
    this.uploader = new FileUploader({
      url: environment.criteriaAPI.url,
      itemAlias: 'file'
    });
    this.uploader.response.subscribe(res => {
      res = JSON.parse(res);
      if (res.success) {
        this.spinner.hide();
        this.uploader.queue = [];
      } else {
        this.uploader.queue = [];
        this.spinner.hide();
      }
    });

    /*this.criteriaService.getReliefValue(subscriberId: String, accntTypeCd: String, score: String).subscribe((res:any)=> {
      this.debtReliefOptionList = res;
    });*/

  }

  ngOnInit(): void {
    this.spinner.show();
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.uploader.queue = [];
      this.uploader.queue.push(file);
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      // this.toastr.success('File successfully uploaded!');
    };
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('pin', user_profile.pin);
      form.append('reasonCd', this.reasonDD);
      form.append('needDetails', this.needDD);
    };
    this.criteriaService.checkCriteria(user_profile.pin).subscribe(
      succesData => {
        if (succesData && succesData[0].length > 0 && succesData[0][0].length > 0) { // Criteria Present
          succesData = succesData[0][0];
          this.criteriaPresent = true;
          this.reasonDD = succesData['reasonCd'];
          this.needDD = succesData['needDetails'];
          this.spinner.hide();
        } else {
          // this.nextClicked();
          this.spinner.hide();
        }
      },
      err => {
        console.error(err);
        this.spinner.hide();
      });
  }

  onSubmit() {
    this.spinner.show();
    this.uploader.uploadAll();
    /*  this.post='ok';
     this.criteria = this.formGroup.value;
     console.log('Submitting' + this.criteria )
     this.criteriaService.checkCriteria(this.criteria.pin).subscribe(
         succesData => {
           console.log(succesData);
           this.criteriaService.submitCriteria(this.criteria);
           alert("Criteria Details updated Successfully!")
         },
         err => {
           console.error(err);
           alert("Criteria Details are already there!")
         } ); */
  }

  nextClicked() {
    this.spinner.show();
    const criteria = new Criteria(Number(user_profile.pin), this.reasonDD, this.needDD);
    this.criteriaService.submitCriteria(criteria).subscribe(
      criteriaData => {
        console.log('Criteria Data', criteriaData);
        this.criteriaService.getTrade(user_profile.pin).subscribe(
          tradeData => {
            this.first = false;
            // let tradeData = [[{ "_id": { "$oid": "5ed7ac6ee2ca713a0b1265fd" }, "pin": { "$long": 1234 }, "accountNB": { "$long": 1234567 }, "acctSTATUSCD": "11", "acctOpenDT": "02-02-2001", "acctTypeCD": "01", "acctBalanceAm": { "$long": 5000 }, "acctPaymentAmount": { "$long": 2000 }, "subscriberId": "0001", "subscriberName": "Test Bank", "enhancedSpclCmntCD": "00", "termsFreq": "D", "terms": 20 }, { "_id": { "$oid": "5ed7ac6ee2ca713a0b1265fd" }, "pin": { "$long": 1234 }, "accountNB": { "$long": 1234567 }, "acctSTATUSCD": "11", "acctOpenDT": "02-02-2001", "acctTypeCD": "01", "acctBalanceAm": { "$long": 5000 }, "acctPaymentAmount": { "$long": 2000 }, "subscriberId": "0001", "subscriberName": "Test Bank", "enhancedSpclCmntCD": "00", "termsFreq": "D", "terms": 20 }]];
            let tempTradeData = tradeData[0];
            console.log('Trade Data', tradeData);
            console.log('Temp Trade Data', tempTradeData);
            for (const item of tempTradeData) {
              this.criteriaService.getReliefValue(item.subscriberId, item.acctTypeCD, user_profile.score).subscribe(

                      (reliefData :any) => {
                  this.debtReliefOptionList = reliefData;
                  // let reliefData = [[{ "_id": { "$oid": "5ed71fe38221ebeace230c6d" }, "subscriberId": "12345", "creditScoreFrom": 300, "creditScoreTo": 700, "debtReliefOption": "DP", "debtReliefValue": 90, "loanType": "01" }]];
                  let tempReliefData = reliefData[0][0];
                  console.log('Relief Data', tempReliefData);
                  item['debtReliefOption'] = tempReliefData['debtReliefOption'];
                  item['debtReliefValue'] = tempReliefData['debtReliefValue'];
                  console.log('Temp Trade Data', tempTradeData);
                  this.tradeData = tempTradeData;
                }, err => {
                  console.log('Error', err);
                  this.spinner.hide();
                }
              );
            }
            this.tradeData = tempTradeData;
            this.spinner.hide();
          }, err => {
            console.log('Error ', err);
            this.spinner.hide();
          }
        );
      }, err => {
        console.log('Error', err);
        this.spinner.hide();
      }
    );
  }

  applyClicked(rowJson) {
    console.log('Row JSON', rowJson);
    //*** TO DO ***/
  }

}

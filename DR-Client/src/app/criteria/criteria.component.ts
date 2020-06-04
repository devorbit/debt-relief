import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CriteriaService } from "../services/criteria.service";
import { Criteria } from "../models/criteria";
import { NgxSpinnerService } from 'ngx-spinner';
import { user_profile } from '../user.profile';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';

@Component({
  selector: 'criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {
  formGroup: FormGroup;
  criteria: Criteria = new Criteria(0, '', '', '');
  // post: any = '';
  reasonDD;
  needDD;
  criteriaPresent = false;
  uploader: FileUploader;
  first = true;

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
          this.nextClicked();
          // this.spinner.hide();
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
    this.criteriaService.getTrade(user_profile.pin).subscribe(
      tradeData => {
        this.first = false;
      }, err => {
        console.log('Error ', err);
        this.spinner.hide();
      }
    );
  }

}

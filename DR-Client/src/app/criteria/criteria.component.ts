
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {CriteriaService} from "../services/criteria.service";
import {Criteria} from "../models/criteria";

@Component({
  selector: 'criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {
  formGroup: FormGroup;
  criteria: Criteria = new Criteria(0,'','','');
  post: any='';

  constructor(private formBuilder: FormBuilder, private criteriaService: CriteriaService) {
    this.formGroup = this.formBuilder.group({
      'pin': [null, Validators.required],
      'reasonCd': [null, Validators.required],
      'filePath': [null, Validators.required],
      'needDetails': [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.post='ok';
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
        } );
  }

}

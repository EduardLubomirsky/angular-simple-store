import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GoodService } from 'src/app/shared/services';
import { Good } from 'src/app/shared/models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-good',
  templateUrl: './edit-good.component.html',
  styleUrls: ['./edit-good.component.scss']
})
export class EditGoodComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private goodService: GoodService,
    private http: HttpClient) {

  }

  public form: FormGroup;
  public goodId: string;
  public currentGood: Good;

  ngOnInit() {
    this.goodId = this.route.snapshot.paramMap.get("id")
    //this.currentGood = this.goodService.getGoodById(this.goodId);
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', this.validatePasswordLength)
    });
  }
  public onSubmit() {
    this.form;
    console.log(this.form);
    debugger;
  }
  public validatePasswordLength(control: FormControl) {
    if (control.value.length < 4) {
      return {
        'passwordValid': true
      }
    }
    return null;
  }
  public setData() {
    let obj = {
      'data': 'testatatatatatatata',
      'test': 'testtest'
    }
    this.http.put('http://localhost:3000/currentUser', obj)
      .subscribe((response) => {
        debugger;
      });

    this.getData();
  }
  public getData() {
    let obj = {
      'data': 'testatatatatatatata',
      'test': 'testtest'
    }
    this.http.get('http://localhost:3000/currentUser')
      .subscribe((response) => {
        debugger;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-good',
  templateUrl: './edit-good.component.html',
  styleUrls: ['./edit-good.component.scss']
})
export class EditGoodComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  public form: FormGroup;
  public userId: string;
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("id")
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required ]),
      password: new FormControl('', this.validatePasswordLength)
    });  
  }
  public onSubmit() {
    this.form;
    console.log(this.form);
    debugger;
  }
  public validatePasswordLength(control: FormControl) {
    if(control.value.length < 4) {
      return {
        'passvordValid': true
      }
    }
    return null;
  } 
}

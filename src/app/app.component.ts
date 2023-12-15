import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames: string[]=['Archana','Krishna'];
  values:string[]=[
    'option1',
    'option2',
    'option3'
  ];
  options:{one:string,two:string}[]=[
    { 'one':'option1','two':'Option1' },
    { 'one':'option2','two':'Option2' },
    { 'one':'option3','two':'Option3' }
  ]

  ngOnInit(): void {
    this.signupForm= new FormGroup({
      'userData':new FormGroup({
        'username':new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email':new FormControl(null, [Validators.required,Validators.email])
      }),
      'gender':new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  onSubmit(){
    console.log(this.signupForm.value.gender);
  }

  onAddHobby(){
    const control= new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]:boolean}{
    // Syntax for having a key-value pair is as follows: {[s: string]:boolean}
    // Here we are saying we want a key of type string and a boolean value
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden':true};
    }
    return null;
  }
}
/*
  Instead of using this: *ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index"
  Use this: *ngFor="let hobbyControl of controls; let i = index"
*/

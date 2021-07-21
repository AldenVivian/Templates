import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
   }

  schoolForm: any;

  uid:any;
  uschname:any;
  users:any[] = [];
  userid:any;
  

  save:any;

  ngOnInit(): void {
    this.createForm();
    this.save = false;
    console.log(this.save);
   
  }
  

  createForm() {
    this.schoolForm = this.formBuilder.group({
        uid: [''],
        uschname: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  addUser() {
    const idgen = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    this.uid =  idgen;
    this.uschname = this.schoolForm.controls['uschname'].value;
    
    if (this.schoolForm.invalid) 
    {
      return false;
    } 
    else 
    {
      this.users.push({
        uid: this.uid,
        uschname: this.uschname,
      });
      console.log(this.users);
      this.schoolForm.reset();
      return true; // extra
    }
  }

  deleteUser(id:any) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid === id) {
        console.log(this.users[i].uschname);
        this.users.splice(i, 1);
      }
    }
  }

  editUser(id:any) {
    this.save = true;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid === id) {
        console.log(this.users[i].uid);
        this.userid = this.users[i].uid;
        this.schoolForm.patchValue({
          uid: this.users[i].uid,
          uschname: this.users[i].uschname
        });
      }
    }
  }

  saveUser(id:any) {
    this.save = false;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid === id) {
          console.log(this.users[i].uid);
          this.users[i].uid = this.schoolForm.controls['uid'].value;
          this.users[i].uschname = this.schoolForm.controls['uschname'].value;
      }
    }
    this.schoolForm.reset();
  }

}

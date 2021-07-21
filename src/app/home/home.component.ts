import { Component, OnInit } from '@angular/core';

import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  userForm: any;
  idgen: any;
  users: any[] = [];
  uid: any;
  uname: any;
  udeptnum: any;
  uemail: any;
  umobile: any;
  upass: any;
  save: any;
  userid: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.save = false;
    console.log(this.save);
  }

  createForm() {
    this.userForm = this.formBuilder.group({
        uid: [''],
        uname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        udeptnum: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]],
        uemail: ['', [Validators.required, Validators.maxLength(20)]],
        umobile: ['', [Validators.required, Validators.minLength(10)]],
        upass: ['', [Validators.required, Validators.minLength(8)]], 
    });
  }

  addUser() {
    const idgen = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    this.uid =  idgen;
    this.uname = this.userForm.controls['uname'].value;
    this.udeptnum = this.userForm.controls['udeptnum'].value;
    this.uemail = this.userForm.controls['uemail'].value;
    this.umobile = this.userForm.controls['umobile'].value;
    this.upass = this.userForm.controls['upass'].value;

    if (this.userForm.invalid) {
      return false;
    } else {
      this.users.push({
        uid: this.uid,
        uname: this.uname,
        udeptnum: this.udeptnum,
        uemail: this.uemail,
        umobile: this.umobile,
        upass: this.upass
      });
      console.log(this.users);
      this.userForm.reset();
      return true; //extra
    }
  }

  deleteUser(id:any) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid === id) {
        console.log(this.users[i].uname);
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
        this.userForm.patchValue({
          uid: this.users[i].uid,
          uname: this.users[i].uname,
          udeptnum: this.users[i].udeptnum,
          uemail: this.users[i].uemail,
          umobile: this.users[i].umobile,
          upass: this.users[i].upass
        });
      }
    }
  }

  saveUser(id:any) {
    this.save = false;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid === id) {
          console.log(this.users[i].uid);
          this.users[i].uid = this.userForm.controls['uid'].value;
          this.users[i].uname = this.userForm.controls['uname'].value;
          this.users[i].udeptnum = this.userForm.controls['udeptnum'].value;
          this.users[i].uemail = this.userForm.controls['uemail'].value;
          this.users[i].umobile = this.userForm.controls['umobile'].value;
          this.users[i].upass = this.userForm.controls['upass'].value;
      }
    }
    this.userForm.reset();
  }

}

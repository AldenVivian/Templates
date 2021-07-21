import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {




  schoolForm: any;
  idgen: any;
  users: any[] = [];
  uid: any;
  uschname: any;
  progname: any;
  values : any;
  save: any;
  userid: any;
  schoolname:any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.save = false;
    console.log(this.save);
  }

  createForm() {
    this.schoolForm = this.formBuilder.group({
        uid: [''],
        uschname: ['', [Validators.required, Validators.minLength(2)]],
        progname: ['', [Validators.required, Validators.minLength(2)]],
        schoolname: ['', [Validators.required, Validators.minLength(2)]] 
        
    });
  }
  addUser() {
    const idgen = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    this.uid =  idgen;
    this.uschname = this.schoolForm.controls['uschname'].value;
    this.progname = this.schoolForm.controls['progname'].value;
    this.schoolname = this.schoolForm.controls['schoolname'].value;
    if (this.schoolForm.invalid) {
      return false;
    } else {
      this.users.push({
        uid: this.uid,
        uschname: this.uschname,
        progname:this.progname,
        schoolname:this.schoolname
      });
      console.log(this.users);
      this.schoolForm.reset();
      return true;//extra
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
          uschname: this.users[i].uschname,
          progname:this.users[i].progname,
          schoolname:this.users[i].schoolname
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
          this.users[i].progname = this.schoolForm.controls['progname'].value;
          this.users[i].schoolname = this.schoolForm.controls['schoolname'].value;
      }
    }
    this.schoolForm.reset();
  }

}

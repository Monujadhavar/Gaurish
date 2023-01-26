import { HttpClient } from '@angular/common/http';

import { Component, Inject, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';


@Component({

  selector: 'app-display',

  templateUrl: './display.component.html',

  styleUrls: ['./display.component.css']

})

export class DisplayComponent implements OnInit {
  temp: any = [];
  length:number=0;
  mid:number = 0;
  meGroup = new FormGroup({
  id: new FormControl(''),

    membername: new FormControl("", Validators.required),

    bloodGroup: new FormControl("", Validators.required),

    dobDate: new FormControl("", Validators.required),

    address: new FormControl("", Validators.required),

    height: new FormControl("", Validators.required),

    weight: new FormControl("", Validators.required),

    mobilePhone: new FormControl("", Validators.required),

    age: new FormControl("", Validators.required),

    gender: new FormControl("", Validators.required),

    sportType: new FormControl("", Validators.required)

  });

  router: any;



  constructor(@Inject(HttpClient) private client, @Inject(Router) private rt) { }

  memberList;

  bloodGroups:string[]=["A+","B+","AB+","O+","A-","B-","AB-","O-"]
  gender: string[]=["Male","Female","Other"]
  ngOnInit(): void {
    this.getMembers();


  }
  // searchMember(): void {

  //   var membername = this.meGroup.get('membername').value;
  //   if (id.length !== 36) {
  //     this.client.get("https://localhost:7179/api/Member/").subscribe(

  //       (res) => {
  //         this.getMembers();
  //         this.temp = res.filter((item) => {
  //           return id.toLowerCase() === item.membername.toLowerCase();
  //         })
  //         this.memberList = this.temp;

  //       },

  //       (err) => {
  //         window.alert(JSON.stringify(err));
  //       }
  //     );
  //   }
  //   else {
  //     this.client.get("https://localhost:7179/api/Member/" + id).subscribe(

  //       (res) => {
  //         this.memberList = [res];
  //       },

  //       (err) => {
  //         window.alert(JSON.stringify(err));
  //       }
  //     );
  //   }


  // }
  saveMember():void {

    console.log(this.meGroup.value);

    this.client.put("https://localhost:7179/api/Member/" + this.mid,this.meGroup.value).subscribe(

      (res)=>{

          alert('Member Successfully Updated')

          this.meGroup.reset();

          this.rt.navigateByUrl("display");

      },

      (err)=>{

        alert(JSON.stringify(err));

      }

    );

  }


  searchMember():void {
    var meMembername = this.meGroup.get('membername').value;
    this.client.get("https://localhost:7179/api/Member/" + meMembername).subscribe(
      (res) => {
                this.memberList = [res];
                this.length=this.countLength();
              },

              (err) => {
                window.alert(JSON.stringify(err));
              }




    );
  }

  deleteMember(id: any): void {

    this.client.get("https://localhost:7179/api/Member/" + id).subscribe(

      (res) => {

        this.meGroup.patchValue(res);

      },

      (err) => {

        // window.alert(JSON.stringify(err));

      }

    );
    this.client.delete("https://localhost:7179/api/Member/" + id).subscribe(

      (res) => {

        alert("Member Deleted");

        this.meGroup.reset();

        this.getMembers();


      },

      (err) => {

        // window.alert(JSON.stringify(err));

      }

    );
    this.router.navigate("");


    this.client.get("https://localhost:7179/api/Member/").subscribe(

      (res) => {

        this.memberList = res as [];

        this.length=this.countLength();


      },



      (err) => {
        window.alert(JSON.stringify(err));
      }
      );

  }

  countLength(){
    return this.memberList.length;
  }

  updateMember(id: any): void {

    // var id = this.meGroup.get('id').value;
     this.mid = id;
     this.client.get("https://localhost:7179/api/Member/" + this.mid).subscribe(

      (res) => {
        console.log(res);

        this.meGroup.patchValue(res);

      },

      (err) => {

        window.alert(JSON.stringify(err));

      }


    );

    // var meId = this.meGroup.get('id').value;

    // this.client.put("https://localhost:7179/api/Member/" + id, this.meGroup.value).subscribe(
    //   (res) => {

    //     alert("Member Updated");
    //     this.memberList = this.getMembers();
    //     this.meGroup.reset();

    //   },


    //   (err) => {

    //      window.alert(JSON.stringify(err));

    //   }

    // );

    // this.router.navigate("./display");
    this.router.navigate(['display'])

  }

  getMembers(){

    this.client.get("https://localhost:7179/api/Member/").subscribe(

      (res) => {

        this.memberList = res as [];
        console.log(res);


        this.length=this.countLength();


      },



      (err) => {
        // window.alert(JSON.stringify(err));
      }
      );
  }
}

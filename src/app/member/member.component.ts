import { HttpClient } from '@angular/common/http';

import { Component, Inject, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';



@Component({

  selector: 'app-member',

  templateUrl: './member.component.html',

  styleUrls: ['./member.component.css']

})

export class MemberComponent implements OnInit {




  meGroup = new FormGroup({

   // id : new FormControl(),

     membername: new FormControl("",Validators.required),

    bloodGroup : new FormControl("",Validators.required),

    dobDate : new FormControl("",Validators.required),

    address : new FormControl("",Validators.required),

   height : new FormControl("",Validators.required),

 weight : new FormControl("",Validators.required),

 mobilePhone : new FormControl("",Validators.required),

 age : new FormControl("",Validators.required),

 gender : new FormControl("",Validators.required),

 sportType : new FormControl("",Validators.required),

// actions : new FormControl("",Validators.required)




});




  constructor(@Inject(HttpClient) private client,@Inject(Router) private rt) { }



  memberList;
  bloodGroups:string[]=["A+","B+","AB+","O+","A-","B-","AB-","O-"]
  Gender: string[]=["Male","Female","Other"]

  ngOnInit(): void {

        this.client.get("https://localhost:7179/api/Member/").subscribe(

      (res)=>{

        // window.alert(JSON.stringify(res));

        this.newMethod().memberList=res;



      },

      (err)=>{

          window.alert(JSON.stringify(err))

      }

    );

}

  private newMethod() {
    return this;
  }

saveMember():void {

  console.log(this.meGroup.value);

  this.client.post("https://localhost:7179/api/Member/",this.meGroup.value).subscribe(

    (res)=>{

        alert('Member Successfully Added')

        this.meGroup.reset();

        this.rt.navigateByUrl("display");

    },

    (err)=>{

      alert(JSON.stringify(err));

    }

  );

}

// searchMember():void {

//   var meId = this.meGroup.get('id').value;

//   this.client.get("https://localhost:7169/api/Academy/" + meId).subscribe(

//     (res)=>{

//         this.meGroup.patchValue(res);

//     },

//     (err)=>{

//         window.alert(JSON.stringify(err));

//     }

//   );

// }



// deleteMember():void {

//   var meId = this.meGroup.get('id').value;

//   this.client.delete("https://localhost:7169/api/Academy/" + meId).subscribe(

//     (res)=>{

//         alert("Member Deleted");

//         this.meGroup.reset();

//     },

//     (err)=>{

//         window.alert(JSON.stringify(err));

//     }

//   );

// }



// updateMember():void {

//   var meId = this.meGroup.get('id').value;

//   this.client.put("https://localhost:7169/api/Academy/" + meId, this.meGroup.value).subscribe(

//     (res)=>{

//         alert("Member Updated");

//         this.meGroup.reset();

//     },

//     (err)=>{

//         window.alert(JSON.stringify(err));

//     }

//   );

// }

}




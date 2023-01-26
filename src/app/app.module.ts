import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { MemberComponent } from './member/member.component';

//import { ShowmemberComponent } from './showmember/showmember.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ParentComponent } from './parent/parent.component';

import { DisplayComponent } from './display/display.component';

import { EditComponent } from './edit/edit.component';



//import { UpdatememberComponent } from './updatemember/updatemember.component';



@NgModule({

  declarations: [

    AppComponent,

    MemberComponent,



    ParentComponent,

         DisplayComponent,

         EditComponent,





  ],



  imports: [

    BrowserModule,

    HttpClientModule,

    AppRoutingModule,

    FormsModule,

    ReactiveFormsModule

  ],

  providers: [],

  bootstrap: [AppComponent]

})

export class AppModule { }

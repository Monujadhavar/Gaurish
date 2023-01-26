import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { DisplayComponent } from './display/display.component';

import { EditComponent } from './edit/edit.component';

import { MemberComponent } from './member/member.component';






var routes: Routes = [

  {path:"display", component: DisplayComponent},

  {path:"member", component: MemberComponent},

  {path:"edit", component: EditComponent},





]



@NgModule({

  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]

})

export class AppRoutingModule { }



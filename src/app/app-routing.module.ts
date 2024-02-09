import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import {NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SurfeBooksComponent } from './surfe-books/surfe-books.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PreviewComponent } from './preview/preview.component';
import { LogoutComponent } from './logout/logout.component';
import { ActiveSubscriptionsListComponent } from './active-subscriptions-list/active-subscriptions-list.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"logout", component:LogoutComponent},
  {path:'container',component:ContainerComponent,
  children:[

    { path: 'dashboard',component: DashboardComponent,canActivate: [AuthGuard] },
 {  path: 'surfebooks', component: SurfeBooksComponent,canActivate: [AuthGuard] },
    { path: 'takequiz',component: TakeQuizComponent,canActivate: [AuthGuard] },
    {path:'subscribe/:id',component:SubscriptionComponent,canActivate: [AuthGuard]},
    {path:'preview/:id',component:PreviewComponent,canActivate: [AuthGuard]},
    {path:'subs', component:ActiveSubscriptionsListComponent,canActivate: [AuthGuard]},
  
  ]
},
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

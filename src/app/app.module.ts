import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SurfeBooksComponent } from './surfe-books/surfe-books.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { ContainerComponent } from './container/container.component';
import { CardsComponent } from './cards/cards.component';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PreviewComponent } from './preview/preview.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { ActiveSubscriptionsListComponent } from './active-subscriptions-list/active-subscriptions-list.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    SurfeBooksComponent,
    TakeQuizComponent,
    ContainerComponent,
    CardsComponent,
    SubscriptionComponent,
    PreviewComponent,
    LogoutComponent,
    ActiveSubscriptionsListComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartModule,
    CardModule,
    TableModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

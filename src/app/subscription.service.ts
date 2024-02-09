import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IBody{
   id:string;
   userId:number;
   bookId:number;
   isActiveSubscription:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  url="http://localhost:3000";
 private http:HttpClient= inject(HttpClient);
 user:any;
 private points!:any[];

 
  constructor() { 
  this.user= sessionStorage.getItem("user");
  this.user= JSON.parse(this.user);
  }

subscribe(body:IBody) : Observable<any>{

 this.http.get(`${this.url}/points?userId=${this.user.userId}`).subscribe((data:any)=>{
this.points=data;
console.log(this.points);
if (this.points.length===0) {
  console.log("IN IF");
  this.http.post("http://localhost:3000/points",{points:200,userId:body.userId}).subscribe();
 }else{
  console.log("IN ELSE");
   const value=this.points[0].points+200;
  this.http.put(`http://localhost:3000/points/${this.points[0].id}`,{points:value,userId:body.userId}).subscribe();
 }
 });

 return this.http.post("http://localhost:3000/subscription",body);
}

activeSubscriptions():Observable<any>{
  return this.http.get(`http://localhost:3000/subscription?userId=${this.user.userId}&isActiveSubscription=true`);
}
bookSubscriptions():Observable<any>{
  return this.http.get(`http://localhost:3000/subscription?userId=${this.user.userId}`);
}
totalPoints():Observable<any>{
return this.http.get(`http://localhost:3000/points?userId=${this.user.userId}`);
}
}

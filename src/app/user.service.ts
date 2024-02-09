import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient)
  constructor() { }

  signIn(user: any): Observable<any> {
    const { email, password } = user;
    return this.http.get(`http://localhost:3000/profiles?email=${email}&password=${password}`).pipe(
      map((exuser: any) => {
        if (!(Object.keys(exuser).length === 0)) {
          return exuser;
        } else {
          throw new Error('User not found or invalid credentials');
        }
      })
    );
  }
  isLoggedIn(): boolean {
    const userString = localStorage.getItem('user');
  
    if (userString !== null) {
      const user = JSON.parse(userString) as any;
      return !!user;
    }
  
    return false; // or handle the case when userString is null
  }
  
}

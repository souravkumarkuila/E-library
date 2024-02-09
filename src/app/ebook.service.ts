import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';

interface Book {
  category: string;
 
}

@Injectable({
  providedIn: 'root'
})
export class EbookService {
  private http= inject(HttpClient)
  getEbooks: any;
  constructor() { }
  private subUrl='http://localhost:3000/subscription';
  private profilesUrl = 'http://localhost:3000/profiles';
  private pointsUrl = 'http://localhost:3000/points';
  private booksUrl='http://localhost:3000/ebooks';
  allebooks():Observable<any>{
   return this.http.get("http://localhost:3000/ebooks")
  }

  getBookDetails(bookId:any):Observable<any>{
    return this.http.get(`http://localhost:3000/ebooks?bookId=${bookId}`);
  }
  
  private fetchNameByUserId(userId: number): Observable<string> {
    return this.http.get<any>(`${this.profilesUrl}?userId=${userId}`).pipe(map(profile => profile[0].name));
  }

  getAllUserPointsWithNames(): Observable<any[]> {
    return forkJoin([
      this.http.get<any[]>(this.profilesUrl),
      this.http.get<any[]>(this.pointsUrl)
    ]).pipe(
      mergeMap(([profilesData, pointsData]) =>
        forkJoin(
          pointsData.map(point =>
            this.fetchNameByUserId(point.userId).pipe(
              map(name => ({
                userId: point.userId,
                name: name,
                points: point.points
              }))
            )
          )
        ).pipe( map(results => results.sort((a, b) => b.points - a.points))
      )
    )
    );
  }

  trendChart(): Observable<any> {
    return forkJoin([
      this.http.get<any[]>(this.subUrl),
      this.http.get<Book[]>(this.booksUrl) // Assuming 'this.booksUrl' returns an array of Book objects
    ]).pipe(
      mergeMap(([subData, ebookData]) =>
        forkJoin(
          subData.map(sub =>
            this.getBookDetails(sub.bookId).pipe(
              map(bookArray => bookArray[0] as Book), // Cast to Book type
              map(book => ({
                category: book.category
              }))
            )
          )
        )
      ),
      map((categories: any[]) => {
        const categoryCounts: { [category: string]: number } = {}; // Define type
  
        // Count categories
        categories.forEach(category => {
          const categoryName = category.category;
          if (!categoryCounts[categoryName]) {
            categoryCounts[categoryName] = 1;
          } else {
            categoryCounts[categoryName]++;
          }
        });
  
        return categoryCounts;
      })
    );
  }
  
  getQuestions(bookId:any){
    return this.http.get(`http://localhost:3000/questions?bookId=${bookId}`)
  }
}


import { Component, OnInit } from '@angular/core';
import { EbookService } from '../ebook.service';

interface Book {
  title: string;
  category: string;
  Author: string;
  img: string;
  bookId: number;
}

@Component({
  selector: 'app-surfe-books',
  templateUrl: './surfe-books.component.html',
  styleUrls: ['./surfe-books.component.css']
})
export class SurfeBooksComponent implements OnInit {

  searchName: string = '';
  searchCategory: string = '';
  searchAuthor: string = '';
  filteredBooks: Book[] = []; 
  books: Book[] = [];

  constructor(private ebookService: EbookService) {}

  performSearch() {
    console.log("Performing search");
    const nameRegex = new RegExp(this.searchName, 'i'); 
    const categoryRegex = new RegExp(this.searchCategory, 'i');
    const authorRegex = new RegExp(this.searchAuthor, 'i');

    this.filteredBooks = this.books.filter(book =>
      (this.searchName === '' || nameRegex.test(book.title)) &&
      (this.searchCategory === '' || categoryRegex.test(book.category)) &&
      (this.searchAuthor === '' || authorRegex.test(book.Author))
    );
  }

  ngOnInit(): void {
    this.ebookService.allebooks().subscribe(data => {
      this.books = data;
      this.performSearch(); // Initial search when data is loaded
    });
  }





  
}


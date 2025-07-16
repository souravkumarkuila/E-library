
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { EbookService } from '../ebook.service';
import { SubscriptionService } from '../subscription.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
  sub = false;
  questions: any[] = [];
  quizStarted = false;
  currentQuestionIndex = 0;
  selectedOptionIndex: number | null = null;
  score = 0;
  quizCompleted = false;
  books: any;
  dynamicTitle: string | undefined;
  book:any;
  constructor(
    private cdr: ChangeDetectorRef,
    private bookService: EbookService,
    private subService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.subService.activeSubscriptions().subscribe(subs => {
      const observables = subs.map((iterator: any) =>
        this.bookService.getBookDetails(iterator.bookId)
      );

      const subscription: Subscription = forkJoin(observables).subscribe((booksArray: any) => {
        this.books = booksArray.flat();
      });
    });

 

  }
// take quiz 
  takeQuiz(bookId: any) {
    this.quizCompleted=false
    this.book= this.books.find((book:any)=>book.bookId===bookId).title
    this.bookService.getQuestions(bookId).subscribe((data: any) => {
      this.questions = data;
      this.sub = true;
      this.currentQuestionIndex = 0;
      this.selectedOptionIndex = null;
      this.score = 0;
    });

    this.cdr.detectChanges();
  }
// next question
  nextQuestion() {
    if (this.selectedOptionIndex !== null) {
      const currentQuestion = this.questions[this.currentQuestionIndex];

      if (this.selectedOptionIndex === currentQuestion.answer) {
        this.score++;
      }

      this.currentQuestionIndex++;
      this.selectedOptionIndex = null;

      if (this.currentQuestionIndex >= this.questions.length) {
        this.quizCompleted = true;
      }
    }
  }
  
  isEvenRow(index: number): boolean {
    return index % 2 === 0;
  }

  updateTitle(newTitle: string) {
    this.dynamicTitle = newTitle;
  }
}

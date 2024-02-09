import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EbookService } from '../ebook.service';
import { IBody, SubscriptionService } from '../subscription.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subscriptionService = inject(SubscriptionService);
  route = inject(ActivatedRoute);
  eBookService = inject(EbookService);
  bookId!: number;
  isSubscribed!: boolean;
  bookDetails: any;
  sub = false;
  item = sessionStorage.getItem("user");
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bookId = Number(params.get('id'));
      this.eBookService.getBookDetails(this.bookId).subscribe(data => {
        this.bookDetails = data[0];
      })
    });
 }

  async save() {
    let user: any;

    if (this.item !== null) {
      user = JSON.parse(this.item);
    }

    // Subscribe to the activeSubscriptions() observable
    this.subscriptionService.activeSubscriptions().subscribe(data => {
      console.log("active sub", data);
      if (data.length !== 0) {
        for (let book of data) {
          if (book.bookId === this.bookId) {
            this.isSubscribed = true;
            alert("Already subscribed");
            return;
          }
        }

      }

      // If not subscribed, proceed to subscription logic
      const body: IBody = { bookId: this.bookId, userId: user.userId, isActiveSubscription: true, id: uuidv4() };
      console.log(body);
      this.subscriptionService.subscribe(body).subscribe(data => {
        console.log(data);
        window.print();
      }, error => {
        console.log(error);
      });
    });
  }
}





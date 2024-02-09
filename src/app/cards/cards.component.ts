import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, OnDestroy {
  activeSubscriptions!: number;
  bookSubscriptions!: number;
  totalPoint!: number;
  subService = inject(SubscriptionService);
  

  // Define subscriptions for your API calls
  private activeSubscriptionsSubscription: Subscription | undefined;
  private bookSubscriptionsSubscription: Subscription | undefined;
  private totalPointsSubscription: Subscription | undefined;
  
  constructor() {}
  
  ngOnInit(): void {

    // Subscribe and store the activeSubscriptionsSubscription
    this.activeSubscriptionsSubscription = this.subService.activeSubscriptions().subscribe(data => {
      this.activeSubscriptions = data.length;
    });

    // Subscribe and store the bookSubscriptionsSubscription
    this.bookSubscriptionsSubscription = this.subService.bookSubscriptions().subscribe(data => {
      console.log("sourav", data);
      this.bookSubscriptions = data.length;
    });

    // Subscribe and store the totalPointsSubscription
    this.totalPointsSubscription = this.subService.totalPoints().subscribe(data => {
      console.log("chetan", data);
      this.totalPoint = data[0].points;
    });
  }

  ngOnDestroy() {
    // Unsubscribe from subscriptions in ngOnDestroy
    if (this.activeSubscriptionsSubscription) {
      this.activeSubscriptionsSubscription.unsubscribe();
    }
    if (this.bookSubscriptionsSubscription) {
      this.bookSubscriptionsSubscription.unsubscribe();
    }
    if (this.totalPointsSubscription) {
      this.totalPointsSubscription.unsubscribe();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription.service';

@Component({
  selector: 'app-active-subscriptions-list',
  templateUrl: './active-subscriptions-list.component.html',
  styleUrls: ['./active-subscriptions-list.component.css']
})
export class ActiveSubscriptionsListComponent implements OnInit {
  sub = false;
  activeSubs: any[] = [];
  displayStyle = "none";

  constructor(private subService: SubscriptionService) { }

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  toggleSub() {
    this.sub = !this.sub;
  }

  ngOnInit(): void {
    this.subService.activeSubscriptions().subscribe(data => {
      this.activeSubs = data;
      console.log(this.activeSubs);
    })
  }
}

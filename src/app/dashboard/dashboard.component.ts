import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { EbookService } from '../ebook.service';
import { SubscriptionService } from '../subscription.service';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  subService = inject(SubscriptionService);
  eBookService = inject(EbookService);
  data: any;
  options: any;
  result: any;
  trendData: any = {};

  cards = [
    { title: 'Total Points', content: 'Points scored by subscriptions' },
    { title: 'Books Subscribed', content: 'Number of books read.' },
    { title: 'Active Subscriptions', content: 'Number of books currently reading.' },
  ];

  users!: any;

  // Define subscriptions for your API calls
  private userPointsSubscription: Subscription | undefined;
  private trendChartSubscription: Subscription | undefined;

  ngOnInit() {
    this.graph();

    setTimeout(() => {
      // Subscribe and store the userPointsSubscription
      this.userPointsSubscription = this.eBookService.getAllUserPointsWithNames().subscribe(data => {
        this.users = data;
        console.log(data);
      });
    }, 500);
  }

  ngOnDestroy() {
    // Unsubscribe from subscriptions in ngOnDestroy
    if (this.userPointsSubscription) {
      this.userPointsSubscription.unsubscribe();
    }
    if (this.trendChartSubscription) {
      this.trendChartSubscription.unsubscribe();
    }
  }

  graph() {
    setTimeout(() => {
      // Subscribe and store the trendChartSubscription
      this.trendChartSubscription = this.eBookService.trendChart().subscribe(data => {
        this.trendData = data;

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
          labels: Object.keys(this.trendData),
          datasets: [
            {
              data: Object.values(this.trendData),
              backgroundColor: [
                documentStyle.getPropertyValue('--red-500'),
                documentStyle.getPropertyValue('--blue-500'),
                documentStyle.getPropertyValue('--yellow-500'),
                documentStyle.getPropertyValue('--green-500')
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue('--red-500'),
                documentStyle.getPropertyValue('--blue-400'),
                documentStyle.getPropertyValue('--yellow-400'),
                documentStyle.getPropertyValue('--green-400')
              ]
            }
          ]
        };

        this.options = {
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                color: textColor
              }
            },
            // tooltip: false
          }
        };
      });
    }, 1000);
  }
}

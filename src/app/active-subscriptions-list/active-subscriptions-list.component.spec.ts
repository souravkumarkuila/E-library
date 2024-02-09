import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSubscriptionsListComponent } from './active-subscriptions-list.component';

describe('ActiveSubscriptionsListComponent', () => {
  let component: ActiveSubscriptionsListComponent;
  let fixture: ComponentFixture<ActiveSubscriptionsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveSubscriptionsListComponent]
    });
    fixture = TestBed.createComponent(ActiveSubscriptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

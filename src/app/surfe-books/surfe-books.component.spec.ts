import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfeBooksComponent } from './surfe-books.component';

describe('SurfeBooksComponent', () => {
  let component: SurfeBooksComponent;
  let fixture: ComponentFixture<SurfeBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurfeBooksComponent]
    });
    fixture = TestBed.createComponent(SurfeBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

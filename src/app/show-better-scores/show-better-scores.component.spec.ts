import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBetterScoresComponent } from './show-better-scores.component';

describe('ShowBetterScoresComponent', () => {
  let component: ShowBetterScoresComponent;
  let fixture: ComponentFixture<ShowBetterScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBetterScoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowBetterScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

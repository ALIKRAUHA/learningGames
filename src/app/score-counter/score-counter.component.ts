import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../shared/score.service';

@Component({
  selector: 'app-score-counter',
  standalone: true,
  imports: [],
  templateUrl: './score-counter.component.html',
  styleUrl: './score-counter.component.css'
})
export class ScoreCounterComponent implements OnInit {
  score = 0;

  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.scoreService.scoreModification.subscribe((value) => {
      this.score = value;
    })
  }


}

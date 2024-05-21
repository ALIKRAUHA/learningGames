import { Component, Input, OnInit } from '@angular/core';
import { Score } from '../shared/models';
import { CommonModule } from '@angular/common';
import {MatSortModule} from '@angular/material/sort'; 

@Component({
  selector: 'app-show-better-scores',
  standalone: true,
  imports: [CommonModule, MatSortModule],
  templateUrl: './show-better-scores.component.html',
  styleUrl: './show-better-scores.component.css'
})
export class ShowBetterScoresComponent implements OnInit {
  @Input() type: string|undefined;
  betterScores: Score[] = [];

  ngOnInit(): void {
    if (this.type) {
      const scoresAsString = localStorage.getItem(this.type);
      if (scoresAsString) {
        this.betterScores = JSON.parse(scoresAsString);
      }
      this.betterScores.sort((score1: Score, score2: Score) => {
        return score1.time - score2.time;
      })
    }
  }

  sortData(event: any) {
    console.log(event)
  }

}

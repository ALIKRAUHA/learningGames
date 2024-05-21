import { Component, Input, OnInit } from '@angular/core';
import { Score } from '../shared/models';
import { CommonModule } from '@angular/common';
import {MatSortModule} from '@angular/material/sort'; 
import { ActivatedRoute } from '@angular/router';;
import {MatCardModule} from '@angular/material/card';
import { ScoreCardComponent } from '../score-card/score-card.component';

@Component({
  selector: 'app-show-better-scores',
  standalone: true,
  imports: [CommonModule, MatSortModule, MatCardModule, ScoreCardComponent],
  templateUrl: './show-better-scores.component.html',
  styleUrl: './show-better-scores.component.css'
})
export class ShowBetterScoresComponent implements OnInit {
  @Input() type: string|undefined;
  betterScores: Score[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.type) {
      this.load(this.type);
    } else {
      let type = undefined;
      this.route.params.forEach((value: any) => {
        type = value.type;
      })
      if (type) {
        this.load(type);
      }
    }
  }

  load(type: string) {
    const scoresAsString = localStorage.getItem(type);
    if (scoresAsString) {
      this.betterScores = JSON.parse(scoresAsString);
    }
    this.betterScores.sort((score1: Score, score2: Score) => {
      return score2.score - score1.score;
    })
  }

  sortData(event: any) {
    console.log(event)
    const active = event.active as string;
    if (active != 'date') {
      if (event.direction == "asc") {
        (this.betterScores as any).sort((a: any, b: any) => {
          return a[active] - b[active];
        })
      } else {
        (this.betterScores as any).sort((a: any, b: any) => {
          return b[active] - a[active];
        })
      }
    } else {
      if (event.direction == "asc") {
        (this.betterScores as any).sort((a: any, b: any) => {
          return new Date(a[active]).getTime() - new Date(b[active]).getTime();
        })
      } else {
        (this.betterScores as any).sort((a: any, b: any) => {
          return new Date(b[active]).getTime() - new Date(a[active]).getTime();
        })
      }
    }
  }
}

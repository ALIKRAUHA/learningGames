import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './score-card.component.html',
  styleUrl: './score-card.component.css'
})
export class ScoreCardComponent {
  @Input() public img: any;
  @Input() public score: any;
}

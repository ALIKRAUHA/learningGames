import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  scoreModification = new BehaviorSubject<number>(0);

  constructor() { }

  add(number: number) {
    this.scoreModification.next(this.scoreModification.value + number);
  }

  substract(number: number) {
    this.scoreModification.next(this.scoreModification.value - number);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  scoreModification = new BehaviorSubject<number>(0);

  constructor() { }

  ponderateByTime(time: number, timeForOne: number, numberOfCalculs: number) {
    this.scoreModification.next(Math.round(this.scoreModification.value * ((numberOfCalculs * 2)/(time/1000))))
  }

  add(number: number) {
    this.scoreModification.next(this.scoreModification.value + number);
  }

  substract(number: number) {
    this.scoreModification.next(this.scoreModification.value - number);
  }
}

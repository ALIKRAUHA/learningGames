import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { Calcul, MultiplicationOperator, Score } from '../shared/models';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ShowBetterScoresComponent } from '../show-better-scores/show-better-scores.component';

@Component({
  selector: 'app-multiplication-table',
  standalone: true,
  imports: [ShowBetterScoresComponent, MatCheckboxModule, CommonModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './multiplication-table.component.html',
  styleUrl: './multiplication-table.component.css'
})
export class MultiplicationTableComponent {
  @ViewChild('result') result: any; 
  initialized = false;
  showScore = false;
  tables = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  calculs: Calcul[] = [];
  selectedTables: number[] = [];
  alreadyPassed: Calcul[] = []
  errors: Calcul[] = [];
  allComplete = false;
  actualCalculIndex = -1;
  last = -1;
  beginTime: Date = new Date();
  score: Score|undefined;

  setAll(checked: boolean) {
    if (checked == true) {
      this.selectedTables = this.tables;
      this.allComplete = true;
    }
    else {
      this.allComplete = false;
      this.selectedTables = [];
    }
  }

  updateAllComplete(table: number) {
    if (this.selectedTables.includes(table)) {
      this.selectedTables = this.selectedTables.splice(this.selectedTables.indexOf(table), 1);
    } else {
      this.selectedTables.push(table);
    }
    if (this.selectedTables.length == this.tables.length) {
      this.allComplete = true;
    } else {
      this.allComplete = false;
    }
  }

  someComplete() {
    return this.selectedTables.length > 0;
  }

  initializeCalculs() {
    this.selectedTables.forEach((value) => {
      for(let i =0; i!== 11; i ++) {
        this.calculs.push(new Calcul(value, i, new MultiplicationOperator()))
      }
    });
  }

  launchNextCalcul() {
    this.actualCalculIndex = this.getRandomInt(this.calculs.length);
  }

  launch() {
    this.initializeCalculs();
    this.initialized = true;
    this.showScore = false;
    this.beginTime = new Date();
    this.alreadyPassed= []
    this.errors = [];
    this.launchNextCalcul();
  }

  validate(value: string) {
    if (this.calculs[this.actualCalculIndex].calculatedResponse?.toString() == value) {
      this.alreadyPassed.push(this.calculs[this.actualCalculIndex]);
      this.calculs.splice(this.actualCalculIndex, 1);
      this.last = 1;
    } else {
      const toAddError = new Calcul(this.calculs[this.actualCalculIndex].number1, this.calculs[this.actualCalculIndex].number2, this.calculs[this.actualCalculIndex].operator);
      toAddError.givenResponse = Number.parseInt(value);
      this.errors.push(toAddError);
      this.last = 2;
    }
    setTimeout(() => {
      this.last = -1;
    }, 3000)
    this.result.nativeElement.value = ''
    if (this.calculs.length > 0) {
      this.launchNextCalcul();
    } else {
      this.showScore = true;
      this.score = new Score("multiplication-tables", this.calculs, this.errors, new Date().getTime() -this.beginTime.getTime());
      console.log('todo show score')
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}

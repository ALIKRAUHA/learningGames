export class Calcul {
  constructor(public number1: number, public number2: number, public operator: Operator) {
    this.calculatedResponse = this.operator.execute(number1, number2);
  }  
  calculatedResponse?: number;
  givenResponse?: number;

  toString() {
    return this.number1 + " " + this.operator.operatorLabel + " " + this.number2 + " = "
  }
}

export interface Operator {
  operatorLabel: string;
  execute(number1: number, number2: number): number;
}

export class MultiplicationOperator implements Operator {
  operatorLabel: string;
  constructor() {
    this.operatorLabel = "x";
  }
  execute(number1: number, number2: number): number {
    return number1 * number2;
  }
}

export class Score {
  public timeWithoutError: number;
  public date: Date;
  public malus: number;
  public tables: number[] = [];
  constructor(public type: string, public calculs: Calcul[], public errors: Calcul[], public time: number, public score: number) {
    this.time = time / 1000;
    this.date = new Date();
    this.timeWithoutError = this.time;
    this.malus = 15 * this.errors.length;
    this.time += this.malus;
    let itemString = localStorage.getItem(type);
    let item = [];
    if (!itemString) {
      item = [];
    } else {
      item = JSON.parse(itemString);
    }
    this.calculs.forEach((calcul) => {
      if (!this.tables.includes(calcul.number1)) {
        this.tables.push(calcul.number1);
      }
    });
    item.push(this);
    localStorage.setItem(type, JSON.stringify(item));
  }
}
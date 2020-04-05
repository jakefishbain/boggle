import { Component, OnInit } from '@angular/core';
import { four_by_four, five_by_five } from './boards.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  rows: any = []
  dice: any = four_by_four
  mode: number = 4;

  time_entered: number = 180;

  timeleft: number;
  gameActive: boolean = false;
  interval;

  constructor() {}

  ngOnInit() {
    this.timeleft = this.time_entered
    this.createBoard()
  }

  toggleBoard = (el: HTMLElement) => {
    this.gameActive = !this.gameActive
    if(this.gameActive && this.timeleft > 0) {
      this.downloadTimer()
    } else {
      clearInterval(this.interval);
    }
    el.scrollIntoView(true);
  }

  changeMode = (mode) => {
    this.mode = mode
    this.dice = mode === 4 ? four_by_four : five_by_five
    this.createBoard()
  }

  createBoard = () => {
    let usedDice = []
    let remainingDice = this.dice
    this.rows = []

    let selectedDice = []
    clearInterval(this.interval)
    this.gameActive = false
    this.timeleft = this.time_entered

    for(let i=0; i < this.mode; i++){
      for(let i=0; i < this.mode; i++){
        let shuffler = Math.floor(Math.random() * remainingDice.length);
        let currentDice = remainingDice[shuffler]
        selectedDice.push(currentDice)
        usedDice.push(currentDice)
        remainingDice = this.filter(remainingDice, usedDice)
      }

      this.rows.push(this.createRow(selectedDice))
      selectedDice = []
    }
    return this.rows
  }

  private createRow = (selectedDice) => {
    let row = []

    selectedDice.forEach(
      (x) => {
        let shuffler = Math.floor(Math.random() * x.length);
        row.push(x[shuffler])
      }
    )
    return row
  }

  private arraysEqual = (a1,a2) => JSON.stringify(a1) == JSON.stringify(a2);

  private filter = (a,b) => a.filter(
    x => !b.find((y) =>  this.arraysEqual(x,y))
  );


  downloadTimer = () => {
    this.interval = setInterval(() => {
      this.timeleft--;
      if(this.timeleft <= 0) {
        clearInterval(this.interval)
        this.gameActive = false
        setTimeout(() => alert('Time\'s Up! ⏱'), 10)
      }
    }, 1000);
  }
}

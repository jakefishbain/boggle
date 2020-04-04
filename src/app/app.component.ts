import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  rows: any = []
  dice: any = [
    ['A','A','C','I','O','T'],
    ['A','B','I','L','T','Y'],
    ['A','B','J','M','O','Q'],
    ['A','C','D','E','M','P'],
    ['A','C','E','L','R','S'],
    ['A','D','E','N','V','Z'],
    ['A','H','M','O','R','S'],
    ['B','I','F','O','R','X'],
    ['D','E','N','O','S','W'],
    ['D','K','N','O','T','U'],
    ['E','E','F','H','I','Y'],
    ['E','G','K','L','U','Y'],
    ['E','G','I','N','T','V'],
    ['E','H','I','N','P','S'],
    ['E','L','P','S','T','U'],
    ['G','I','L','R','U','W']
  ]

  TIMELEFT: number = 180;

  timeleft: number;
  gameActive: boolean = false;
  interval;

  constructor() {}

  ngOnInit() {
    this.timeleft = this.TIMELEFT
    this.createBoard()
  }

  toggleBoard = () => {
    this.gameActive = !this.gameActive
    if(this.gameActive && this.timeleft > 0) {
      this.downloadTimer()
    } else {
      clearInterval(this.interval);
    }
  }

  createBoard = () => {
    let usedDice = []
    let remainingDice = this.dice
    this.rows = []

    let selectedDice = []
    clearInterval(this.interval)
    this.gameActive = false
    this.timeleft = this.TIMELEFT

    const times = 4
    for(let i=0; i < times; i++){
      for(let i=0; i < times; i++){
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

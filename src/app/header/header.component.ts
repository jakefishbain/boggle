import { Component, OnInit, Input } from '@angular/core';
import { BoggleService } from '../boggle.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public bs: BoggleService) { }

  ngOnInit(): void {
  }

}

import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  user : FormGroup;
  constructor(){}

  ngOnInit(): void {
    this.user = new FormGroup({
      firstName : new FormControl(""),
      lastName : new FormControl(""),
    });
  }
}

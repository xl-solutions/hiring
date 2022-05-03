import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() items:any ;
  @Output() response = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  selectItem(item) {
    this.items.forEach(i => i.selected = false)
    item.selected = true
    this.response.emit(item);
  }
}

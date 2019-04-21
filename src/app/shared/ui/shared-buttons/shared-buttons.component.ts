import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shared-buttons',
  templateUrl: './shared-buttons.component.html',
  styleUrls: ['./shared-buttons.component.css']
})
export class SharedButtonsComponent implements OnInit {

  @Input() theme: string;
  @Input() include: string[];
  @Input() show: number;
  @Input() url: string;
  @Input() autoSetMeta: boolean;
  @Input() title: string; F
  @Input() description: string;
  @Input() image: string;
  @Input() tags: string;
  @Input() size: number;


  constructor() { }

  ngOnInit() {
  }

}

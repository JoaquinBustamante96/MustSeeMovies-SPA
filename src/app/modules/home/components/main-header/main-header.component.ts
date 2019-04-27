import { Component, OnInit, AfterViewInit } from '@angular/core';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  imagesData = {
    0: { title: "Chungking Express (1994)", backgroundUrl: null },
    1: { title: "Funeral Parade of Roses (1969)", backgroundUrl: null },
    2: { title: "Fallen Angels (1995)", backgroundUrl: null },
    3: { title: "Werckmeister Harmóniák (2000)", backgroundUrl: null },
    4: { title: "Pierrot Le Fou (1965)", backgroundUrl: null }
  }

  imageNames = [
    'chungking',
    'funeral',
    'fallen',
    'werckmeister',
    'pierrot',
  ];

  timer$ = timer(1000, 3000);
  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.timer$.subscribe(
      value => {
        if (value < 5) {
          const imgName = this.imageNames[value];
          this.imagesData[value].backgroundUrl = this.getBkUrl(imgName);
        } else {
          this.subscription.unsubscribe();

        }
      }
    )
  }

  getBkUrl(name: string) {
    const styles = {
      'background-image': `url(assets/images/${name}.jpg)`
    };
    return styles;
  }


}

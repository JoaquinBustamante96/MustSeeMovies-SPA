import { Component, OnInit } from '@angular/core';
import { Animations } from '@app/shared/animations';
import { Movie } from '@app/core/models';
import { AuthenticationService } from '@app/core/services';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  animations: [ Animations.fadeIn, ]
})
export class CrudComponent implements OnInit {

  value="read";
  movie: Movie;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
  }

  logout(){
    this.authenticationService.logout();
  }
  
  onEditMovie(movie: Movie){
    this.movie=movie;
    this.value="create";
  }

  isPressed(value: string): boolean{
     return this.value==value;
  }

  onClick(value:string){
    this.value=value;
  }

  onReset(){
    this.movie=null;
  }

}

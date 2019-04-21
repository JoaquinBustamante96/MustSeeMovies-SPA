import { MovieLinks } from './MovieLinks.model';
import { MinimunMovie } from './minimunMovie.model';
import { Deserializable } from './deserializable.model';

export class Movie extends MinimunMovie implements Deserializable {

     genre: string[];
     artMovement: string;
     language: string;
     runtime: string;
     color: boolean;
     sound: boolean;
     movieLinks: MovieLinks;

     deserialize(input: any): this {
          input.color = input.color.toLowerCase() == "true" ? true : false;
          input.sound = input.sound.toLowerCase() == "true" ? true : false;
          Object.assign(this, input);
          this.movieLinks = new MovieLinks().deserialize(input.movieLinks);
          return this;
     }

     getYoutubeUrl(): string {
          return `https://www.youtube.com/embed/${this.movieLinks.youtubeId}`;
     }

}

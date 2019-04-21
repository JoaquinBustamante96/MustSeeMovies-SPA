import { Deserializable } from './deserializable.model';
import { Uris } from '../uris-api';

export class MinimunMovie implements Deserializable {
    id: string;
    name: string[];
    director: string[];
    storyline: string;
    country: string;
    releaseDate: string;
    poster: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    getposterUrl(): string {
      return `${Uris.api}/file/?id=${this.poster}`;
    }

    getYear(): string {
        return this.releaseDate.substring(0,4);
    }

}
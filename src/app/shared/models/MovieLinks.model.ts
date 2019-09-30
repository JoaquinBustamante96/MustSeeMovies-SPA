import { Deserializable } from './deserializable.model';

export class MovieLinks implements Deserializable {
    youtubeId: string;
    imdb: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
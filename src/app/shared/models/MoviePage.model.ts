import { Movie } from './movies.model';
import { Deserializable } from './deserializable.model';
import { Pageable } from './pageable.model';
import { Page } from './page.model';

export class MoviePage implements Page<Movie>, Deserializable {
    empty: boolean;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
    pageable: Pageable;
    content: Array<Movie>;

    deserialize(input: any) {
        Object.assign(this, input);
        this.content = input.content.map(
            movie => {
                return new Movie().deserialize(movie);
            }
        )
        this.pageable = new Pageable().deserialize(input['pageable']);
        return this;
    }

}
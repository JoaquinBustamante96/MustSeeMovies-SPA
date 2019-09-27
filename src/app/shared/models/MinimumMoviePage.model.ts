import { Page } from './page.model';
import { MinimumMovie } from './minimumMovie.model';
import { Deserializable } from './deserializable.model';
import { Pageable } from './pageable.model';

export class MinimumMoviePage implements Page<MinimumMovie>, Deserializable {
    empty: boolean;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
    pageable: Pageable;
    content: Array<MinimumMovie>;

    deserialize(input: any) {
        Object.assign(this, input);
        this.content = input.content.map(
            movie => {
                return new MinimumMovie().deserialize(movie);
            }
        )
        this.pageable = new Pageable().deserialize(input['pageable']);
        return this;
    }

}
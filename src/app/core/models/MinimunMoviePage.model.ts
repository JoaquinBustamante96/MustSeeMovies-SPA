import { Page } from './page.model';
import { MinimunMovie } from './minimunMovie.model';
import { Deserializable } from './deserializable.model';
import { Pageable } from './pageable.model';

export class MinimunMoviePage implements Page<MinimunMovie>, Deserializable {
    empty: boolean;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
    pageable: Pageable;
    content: Array<MinimunMovie>;

    deserialize(input: any) {
        Object.assign(this, input);
        this.content = input.content.map(
            movie => {
                return new MinimunMovie().deserialize(movie);
            }
        )
        this.pageable = new Pageable().deserialize(input['pageable']);
        return this;
    }

}
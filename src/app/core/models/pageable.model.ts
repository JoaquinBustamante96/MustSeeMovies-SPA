import { Deserializable } from './deserializable.model';

export class Pageable implements Deserializable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
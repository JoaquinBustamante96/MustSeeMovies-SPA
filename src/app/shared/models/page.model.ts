import { Pageable } from './pageable.model';

export interface Page<T> {
  empty: boolean;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
  content: Array<T>;
}
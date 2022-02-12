import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import { Either } from 'fp-ts/Either';

export type Validation<T> = Either<NonEmptyArray<string>, T>;

export type Parser<T> = (value: unknown) => Validation<T>;

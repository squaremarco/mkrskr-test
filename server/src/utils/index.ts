import { anyPass, complement, isEmpty, isNil } from 'rambdax';

export const isNilOrEmpty = anyPass([isNil, isEmpty]);

export const isNotNilOrEmpty = complement(isNilOrEmpty);

export const throwsException = (errorConstructor, message?: string) => {
  throw new errorConstructor(message);
};

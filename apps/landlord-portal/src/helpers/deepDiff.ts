import { isEqual, isObject } from 'lodash';

/**
 * Recursively returns an object with only the fields that have changed between original and current.
 * Arrays are compared by value.
 */
export function getChangedFields<T extends object>(original: T, current: T): Partial<T> {
  const diff: Partial<T> = {};

  Object.keys(current).forEach((key) => {
    const origVal = (original as any)[key];
    const currVal = (current as any)[key];

    if (isObject(origVal) && isObject(currVal) && !Array.isArray(origVal) && !Array.isArray(currVal)) {
      const nestedDiff = getChangedFields(origVal, currVal);
      if (Object.keys(nestedDiff).length > 0) {
        (diff as any)[key] = nestedDiff;
      }
    } else if (!isEqual(origVal, currVal)) {
      (diff as any)[key] = currVal;
    }
  });

  return diff;
}
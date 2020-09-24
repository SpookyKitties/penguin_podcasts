export function notNullorUndefined<T>(val: T) {
  return val !== null && val !== undefined;
}

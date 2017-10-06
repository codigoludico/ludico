/** @module type */

/**
 * Devuelve true si la variable pasada es del tipo `String`
 *
 * @param {*} value
 * @return {Boolean}
 */
export function isString(value) {
  return typeof value === "string" || value instanceof String;
}

export default isString;

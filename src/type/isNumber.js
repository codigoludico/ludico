/** @module type */

/**
 * Devuelve true si la variable pasada es del tipo `Number`
 *
 * @param {*} value
 * @return {Boolean}
 */
export function isNumber(value) {
  return (typeof value === "number" || value instanceof Number) && isFinite(value);
}

export default isNumber;

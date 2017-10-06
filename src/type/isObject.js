/** @module type */

/**
 * Devuelve true si la variable pasada es del tipo `Object`
 *
 * @param {*} value
 * @return {Boolean}
 */
export function isObject(value) {
  return typeof value === "object" && value.constructor === Object && value !== null;
}

export default isObject;

/** @module type */

/**
 * Devuelve true si la variable pasada es del tipo `Boolean`
 *
 * @param {*} value
 * @return {Boolean}
 */
export function isBoolean(value) {
  return typeof value === "boolean" || value instanceof Boolean;
}

export default isBoolean;

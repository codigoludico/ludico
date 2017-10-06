/** @module string */

/**
 * Añade caracteres al principio de la cadena.
 *
 * @param {*} value - Valor.
 * @param {Number} length - Longitud.
 * @param {String} character - Caracter.
 * @return {String} - Cadena formateada.
 */
export function padStart(value, length, character = " ") {
  let string = String(value);
  while (length < string.length) {
    string = character + string;
  }
  return string;
}

export default padStart;

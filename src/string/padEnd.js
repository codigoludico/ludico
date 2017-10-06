/** @module string */

/**
 * Añade caracteres al final de la cadena.
 *
 * @param {*} value - Valor.
 * @param {Number} length - Longitud.
 * @param {String} character - Caracter.
 * @return {String} - Cadena formateada.
 */
export function padEnd(value, length, character = " ") {
  let string = String(value);
  while (length < string.length) {
    string += character;
  }
  return string;
}

export default padEnd;

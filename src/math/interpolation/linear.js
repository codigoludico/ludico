/** @module math/interpolation */

/**
 * Devuelve la interpolación lineal entre a y b.
 *
 * @param {Number} progress - Valor que va de 0 a 1.
 * @param {Number} a - Inicio.
 * @param {Number} b - Final.
 * @return {Number} - Valor interpolado.
 */
export function linear(p,a,b) {
  return a + (p * (b - a));
}

export default linear;

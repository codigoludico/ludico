import linear from "./linear";

/** @module math/interpolation */

/**
 * Devuelve la interpolación cuadrática entre a y b.
 *
 * @param {Number} progress - Valor que va de 0 a 1.
 * @param {Number} a - Inicio.
 * @param {Number} b - Control.
 * @param {Number} c - Final.
 * @return {Number} - Valor interpolado.
 */
export function quadratic(p, a, b, c) {
  const d = linear(p,a,b);
  const e = linear(p,b,c);
  return linear(p,d,e);
}

export default quadratic;

import quadratic from "./quadratic";
import linear from "./linear";

/** @module math/interpolation */

/**
 * Devuelve la interpolación cúbica entre a y b.
 *
 * @param {Number} progress - Valor que va de 0 a 1.
 * @param {Number} a - Inicio.
 * @param {Number} b - Control.
 * @param {Number} c - Control.
 * @param {Number} d - Final.
 * @return {Number} - Valor interpolado.
 */
export function cubic(p, a, b, c, d) {
  const e = quadratic(p,a,b,c);
  const f = quadratic(p,b,c,d);
  return linear(p,e,f);
}

export default cubic;

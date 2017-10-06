/** @module math */

/**
 * Rango
 */
export class Range {
  /**
   * Convierte del rango entre mín ~ max al rango 0 ~ 1.
   *
   * @param {Number} value - Valor entre min y max.
   * @param {Number} min - Valor mínimo.
   * @param {Number} max - Valor máximo.
   * @return {Number} - Valor entre 0 y 1.
   */
  static from(value, min, max) {
    return (value - min) / (max - min);
  }

  /**
   * Convierte del rango entre 0 ~ 1 al rango min ~ max.
   *
   * @param {Number} value - Valor entre 0 y 1.
   * @param {Number} min - Valor mínimo.
   * @param {Number} max - Valor máximo.
   * @return {Number} - Valor entre mínimo y máximo.
   */
  static to(value, min, max) {
    return (value * (max - min)) + min;
  }

  /**
   * Constructor
   *
   * @param {Number} min
   * @param {Number} max
   */
  constructor(min,max) {
    this.min = min;
    this.max = max;
  }

  /**
   * Devuelve un valor entre 0 y 1.
   *
   * @param {Number} value - Valor entre min y max.
   * @return {Number} - Valor entre 0 y 1.
   */
  from(value) {
    return (value - this.min) / (this.max - this.min);
  }

  /**
   * Devuelve un valor entre min y max.
   *
   * @param {Number} value - Valor entre 0 y 1.
   * @return {Number} - Valor entre min y max.
   */
  to(value) {
    return (value * (this.max - this.min)) + this.min;
  }
}

export default Range;

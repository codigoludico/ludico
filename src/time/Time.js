import padStart from "string/padStart";

/** @module time */

export class Time {
  /**
   * Devuelve el valor del tiempo en segundos.
   *
   * @param {String} value - Representación en cadena del tiempo.
   * @return {Number} - Devuelve el valor del tiempo en segundos.
   */
  static parse(value) {
    const matches = value.match(/([0-9]+):([0-9]{2}):([0-9]{2})/);
    if (matches) {
      const [,hours,minutes,seconds] = matches;
      return (parseFloat(hours) * 3600) + (parseFloat(minutes) * 60) + parseFloat(seconds);
    }
    return NaN;
  }

  /**
   * Devuelve la representación en cadena de un tiempo.
   *
   * @param {*} value - Segundos.
   * @return {String} - Representación en cadena del tiempo.
   */
  static stringify(value) {
    const seconds = Math.floor(value) % 60;
    const minutes = Math.floor(value / 60) % 60;
    const hours = Math.floor(value / 3600);
    return `${padStart(hours,2,"0")}:${padStart(minutes,2,"0")}:${padStart(seconds,2,"0")}`;
  }

  /**
   * Constructor.
   *
   * @param {Number} [start=Date.now()] - Inicio del tiempo.
   */
  constructor(start = Date.now()) {
    this.start = start;
  }

  /**
   * @readonly
   * @property {Number} - Tiempo transcurrido desde el inicio.
   */
  get value() {
    return Date.now() - this.start;
  }

  /**
   * Reinicia el tiempo transcurrido.
   *
   * @return {Time} - Este objeto.
   */
  reset() {
    this.start = Date.now();
    return this;
  }

  /**
   * Clona este tiempo.
   *
   * @return {Time} - Clon de este objeto.
   */
  clone() {
    return new Time(this.start);
  }

  /**
   * Devuelve la representación en cadena de este tiempo.
   *
   * @return {String} - Representación en cadena de este objeto.
   */
  toString() {
    return `Time(${this.start})`;
  }
}

export default Time;

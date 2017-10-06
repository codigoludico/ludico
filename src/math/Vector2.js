/** @module math */

/**
 * Vector2
 */
export class Vector2 {
  /**
   * Devuelve si el valor pasado es del tipo Vector2.
   *
   * @param {*} value -
   * @return {Boolean} - Devuelve si el valor pasado es del tipo Vector2.
   */
  static isVector2(v) {
    return v instanceof Vector2;
  }

  /**
   * Devuelve la longitud (o magnitud) cuadrada del vector formado por las
   * coordenadas pasadas como parámetro.
   *
   * @param {Number} x - Coordenada x
   * @param {Number} y - Coordenada y
   * @return {Number} - x<sup>2</sup> + y<sup>2</sup>
   */
  static lengthSquaredOf(x,y) {
    return x * x + y * y;
  }

  /**
   * Devuelve la longitud (o magnitud) del vector formado por las coordenadas
   * pasadas como parámetro.
   *
   * @param {Number} x - Coordenada x
   * @param {Number} y - Coordenada y
   * @return {Number} - Longitud &radic;x<sup>2</sup> + y<sup>2</sup>
   */
  static lengthOf(x,y) {
    return Math.sqrt(Vector2.lengthSquaredOf(x,y));
  }

  /**
   * Devuelve la dirección del vector formado por las coordenadas pasadas
   * como parámetro.
   *
   * @param {Number} x - Coordenada x
   * @param {Number} y - Coordenada y
   * @return {Number} - Dirección en radianes
   */
  static directionOf(x,y) {
    return Math.atan2(y,x);
  }

  /**
   * Constructor
   *
   * @param {Number} [x=0.0] - Coordenada x.
   * @param {Number} [y=0.0] - Coordenada y.
   */
  constructor(x = 0.0, y = 0.0) {
    this.x = x;
    this.y = y;
  }

  /**
   * @readonly
   * @property {Number} - Longitud cuadrada
   */
  get lengthSquared() {
    return Vector2.lengthSquaredOf(this.x,this.y);
  }

  /**
   * @readonly
   * @property {Number} - Longitud
   */
  get length() {
    return Vector2.lengthOf(this.x,this.y);
  }

  /**
   * @readonly
   * @property {Number} - Dirección (en radianes)
   */
  get direction() {
    return Vector2.directionOf(this.x,this.y);
  }

  /**
   * Establece nuevos valores para las coordenadas del vector.
   *
   * @param {*} x - Nueva coordenada x.
   * @param {*} y - Nueva coordenada y.
   * @return {Vector2} - Este vector.
   */
  set(x,y) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Establece a 0 el valor de las coordenadas del vector.
   *
   * @return {Vector2} - Este vector.
   */
  reset() {
    return this.set(0,0);
  }

  /**
   * Suma las coordenadas.
   *
   * @param {Number} x - Coordenada x.
   * @param {Number} y - Coordenada y.
   * @return {Vector2} - Este vector.
   */
  addc(x,y) {
    return this.set(this.x + x,this.y + y);
  }

  /**
   * Suma el vector.
   *
   * @param {Vector2} vector - Vector que se sumará.
   * @return {Vector2} - Este vector.
   */
  addv(v) {
    return this.addc(v.x,v.y);
  }

  /**
   * Suma el escalar.
   *
   * @param {Number} scalar - Escalar.
   * @return {Vector2} - Este vector.
   */
  adds(s) {
    return this.addc(s,s);
  }

  add(...args) {
    if (args.length === 2 && isNumber(args[0]) && isNumber(args[1])) {
      return this.addc(args[0],args[1]);
    } else if (args.length === 1 && isNumber(args[0])) {
      return this.adds(args[0]);
    } else if (args.length === 1 && Vector2.isVector2(args[0])) {
      return this.addv(args[0]);
    }
    throw new Error("Invalid arguments");
  }

  /**
   * Resta las coordenadas.
   *
   * @param {Number} x - Coordenada x.
   * @param {Number} y - Coordenada y.
   * @return {Vector2} - Este vector.
   */
  subtractc(x,y) {
    return this.set(this.x - x,this.y - y);
  }

  /**
   * Resta el vector.
   *
   * @param {Vector2} vector - Vector a restar.
   * @return {Vector2} - Este vector.
   */
  subtractv(v) {
    return this.subtractc(v.x, v.y);
  }

  /**
   * Resta el escalar.
   *
   * @param {Number} scalar - Escalar.
   * @return {Vector2} - Este vector.
   */
  subtracts(s) {
    return this.subtractc(s, s);
  }

  subtract(...args) {
    if (args.length === 2 && isNumber(args[0]) && isNumber(args[1])) {
      return this.subtractc(args[0], args[1]);
    } else if (args.length === 1 && isNumber(args[0])) {
      return this.subtracts(args[0]);
    } else if (args.length === 1 && Vector2.isVector2(args[0])) {
      return this.subtractv(args[0]);
    }
    throw new Error("Invalid arguments");
  }

  /**
   * Multiplica por las coordenadas.
   *
   * @param {Number} x - Coordenada x.
   * @param {Number} y - Coordenada y.
   * @return {Vector2} - Este vector.
   */
  multiplyc(x, y) {
    return this.set(this.x * x, this.y * y);
  }

  /**
   * Multiplica por el vector.
   *
   * @param {Vector2} vector - Vector por el que se multiplicará este vector.
   * @return {Vector2} - Este vector.
   */
  multiplyv(v) {
    return this.multiplyc(v.x, v.y);
  }

  /**
   * Multiplica por el escalar.
   *
   * @param {Number} scalar - Escalar.
   * @return {Vector2} - Este vector.
   */
  multiplys(s) {
    return this.multiplyc(s, s);
  }

  multiply(...args) {
    if (args.length === 2 && isNumber(args[0]) && isNumber(args[1])) {
      return this.multiplyc(args[0], args[1]);
    } else if (args.length === 1 && isNumber(args[0])) {
      return this.multiplys(args[0]);
    } else if (args.length === 1 && Vector2.isVector2(args[0])) {
      return this.multiplyv(args[0]);
    }
    throw new Error("Invalid arguments");
  }

  /**
   * Divide por las coordenadas.
   *
   * @param {Number} x - Coordenada x.
   * @param {Number} y - Coordenada y.
   * @return {Vector2} - Este vector.
   */
  dividec(x, y) {
    return this.set(this.x / x, this.y / y);
  }

  /**
   * Divide por el vector.
   *
   * @param {Vector2} vector - Vector por el que se dividirá.
   * @return {Vector2} - Este vector.
   */
  dividev(v) {
    return this.dividec(v.x, v.y);
  }

  /**
   * Divide por el escalar.
   *
   * @param {Number} scalar - Escalar.
   * @return {Vector2} - Este vector.
   */
  divides(s) {
    return this.dividec(s, s);
  }

  divide(...args) {
    if (args.length === 2 && isNumber(args[0]) && isNumber(args[1])) {
      return this.dividec(args[0], args[1]);
    } else if (args.length === 1 && isNumber(args[0])) {
      return this.divides(args[0]);
    } else if (args.length === 1 && Vector2.isVector2(args[0])) {
      return this.dividev(args[0]);
    }
    throw new Error("Invalid arguments");
  }

  /**
   * Invierte este vector.
   *
   * @return {Vector2}
   */
  invert() {
    return this.multiplys(-1);
  }

  /**
   * Normaliza este vector.
   *
   * @return {Vector2}
   */
  normalize() {
    return this.divides(this.length);
  }

  /**
   * Devuelve la distancia desde este vector hasta las coordenadas indicadas.
   *
   * @param {Number} x - Coordenada x
   * @param {Number} y - Coordenada y
   * @return {Number} - Distancia hasta las coordenadas.
   */
  distanceToc(x,y) {
    return Vector2.lengthOf(this.x - x,this.y - y);
  }

  /**
   * Devuelve la distancia desde este vector hasta el vector indicado.
   *
   * @param {Vector2} vector - Vector.
   * @return {Number} - Distancia hasta el vector.
   */
  distanceTov(v) {
    return this.distanceToc(v.x,v.y);
  }

  /**
   * Devuelve la distancia desde este vector hasta las coordenadas o el vector indicado.
   *
   * @param {*} args
   * @return {Number} - Distancia hasta el vector o las coordenadas.
   */
  distanceTo(...args) {
    if (args.length === 2 && isNumber(args[0]) && isNumber(args[1])) {
      return this.distanceToc(args[0],args[1]);
    } else if (args.length === 1 && Vector2.isVector2(args[0])) {
      return this.distanceTov(args[0]);
    }
    throw new Error("Invalid arguments");
  }

  /**
   * Copia las coordenadas de otro vector.
   *
   * @param {Vector2} vector - Vector del que se copiarán las coordenadas.
   * @return {Vector2} - Este vector.
   */
  copy(v) {
    return this.set(v.x,v.y);
  }

  /**
   * Clona este vector.
   *
   * @return {Vector2} - Clon de este vector.
   */
  clone() {
    return new Vector2(this.x,this.y);
  }

  /**
   * Devuelve la representación en cadena de este vector.
   *
   * @return {String} - Representación en cadena de este vector.
   */
  toString() {
    return `Vector2(${this.x},${this.y})`;
  }
}

export default Vector2;

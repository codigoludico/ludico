import Vector2 from "./Vector2";

/** @module math */

/**
 *
 */
export class Box2 {
  /**
   * Devuelve si el valor pasado es del tipo Box2.
   *
   * @param {*} value -
   * @return {Boolean} - Devuelve si el valor pasado es del tipo Box2.
   */
  static isBox2(v) {
    return v instanceof Box2;
  }

  /**
   * Constructor
   *
   * @param {Vector2} [leftTop=new Vector2()] - Posición superior izquierda
   * @param {Vector2} [rightBottom=new Vector2()] - Posición inferior derecha
   */
  constructor(leftTop = new Vector2(), rightBottom = new Vector2()) {
    this.leftTop = leftTop;
    this.rightBottom = rightBottom;
  }

  /**
   * @readonly
   * @property {Number} - Coordenada x
   */
  get x() {
    return this.leftTop.x;
  }

  get y() {
    return this.leftTop.y;
  }

  get width() {
    return this.rightBottom.x - this.leftTop.x;
  }

  get halfWidth() {
    return this.width * 0.5;
  }

  get height() {
    return this.rightBottom.y - this.leftTop.y;
  }

  get halfHeight() {
    return this.height * 0.5;
  }

  get left() {
    return this.leftTop.x;
  }

  get top() {
    return this.leftTop.y;
  }

  get right() {
    return this.rightBottom.x;
  }

  get bottom() {
    return this.rightBottom.y;
  }

  get centerX() {
    return this.left + this.halfWidth;
  }

  get centerY() {
    return this.top + this.halfHeight;
  }

  /**
   * Devuelve el punto central de la caja.
   *
   * @param {Vector2} [v=new Vector2()] - Vector en el que se almacenarán las coordenadas.
   * @return {Vector2} - Punto central de la caja.
   */
  getCenter(v = new Vector2()) {
    return v.set(this.centerX,this.centerY);
  }

  /**
   * Devuelve el punto central izquierdo de la caja.
   *
   * @param {Vector2} [v=new Vector2()] - Vector en el que se almacenarán las coordenadas.
   * @return {Vector2} - Punto central izquierdo de la caja.
   */
  getLeftCenter(v = new Vector2()) {
    return v.set(this.left,this.centerY);
  }

  /**
   * Devuelve el punto central derecho de la caja.
   *
   * @param {Vector2} [v=new Vector2()] - Vector en el que se almacenarán las coordenadas.
   * @return {Vector2} - Punto central derecho de la caja.
   */
  getRightCenter(v = new Vector2()) {
    return v.set(this.right,this.centerY);
  }

  /**
   * Devuelve el punto central superior de la caja.
   *
   * @param {Vector2} [v=new Vector2()] - Vector en el que se almacenarán las coordenadas.
   * @return {Vector2} - Punto central superior de la caja.
   */
  getTopCenter(v = new Vector2()) {
    return v.set(this.centerX,this.top);
  }

  /**
   * Devuelve el punto central inferior de la caja.
   *
   * @param {Vector2} [v=new Vector2()] - Vector en el que se almacenarán las coordenadas.
   * @return {Vector2} - Punto central inferior de la caja.
   */
  getBottomCenter(v = new Vector2()) {
    return v.set(this.centerX,this.bottom);
  }

  /**
   * Devuelve si las coordenadas están contenidas en la caja.
   *
   * @param {Number} x - Coordenada x.
   * @param {Number} y - Coordenada y.
   * @return {Boolean} - Devuelve true si las coordenadas están dentro de la caja.
   */
  containsc(x,y) {
    return x > this.left
        && x < this.right
        && y > this.top
        && y < this.bottom;
  }

  /**
   * Devuelve si el vector está contenido en la caja.
   *
   * @param {Vector2} vector - Vector
   * @return {Boolean} - Devuelve true si el vector está contenido dentro de la caja.
   */
  containsv(v) {
    return this.containsc(v.x,v.y);
  }

  /**
   *
   * @param {*} args
   * @return {Boolean}
   */
  contains(...args) {
    if (args.length === 2 && isNumber(args[0]) && isNumber(args[1])) {
      return this.containsc(args[0],args[1]);
    } else if (args.length === 1 && Vector2.isVector2(args[0])) {
      return this.containsv(args[0]);
    }
  }

  /**
   * Establece las coordenadas de la caja.
   *
   * @param {Number} left - Coordenada izquierda.
   * @param {Number} top - Coordenada superior.
   * @param {Number} right - Coordenada derecha.
   * @param {Number} bottom - Coordenada inferior.
   * @return {Box2} - Esta caja.
   */
  set(ltx,lty,rbx,rby) {
    this.leftTop.set(ltx,lty);
    this.rightBottom.set(rbx,rby);
    return this;
  }

  /**
   * Copia las coordenadas de otra caja en esta.
   *
   * @param {Box2} box - Caja de la que se copiarán las coordenadas.
   * @return {Box2} - Esta caja.
   */
  copy(v) {
    this.leftTop.copy(v.leftTop);
    this.rightBottom.copy(v.rightBottom);
    return this;
  }

  /**
   * Clona esta caja.
   *
   * @return {Box2} - Clon de esta caja.
   */
  clone() {
    return new Box2(this.leftTop.clone(),this.rightBottom.clone());
  }

  /**
   * Devuelve la representación en cadena de esta caja.
   *
   * @return {String} - Representación en cadena de esta caja
   */
  toString() {
    return `Box2(${this.leftTop},${this.rightBottom})`;
  }
}

export default Box2;

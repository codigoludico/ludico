import { PRESSED, RELEASED } from "./constants";

/** @module input */

/**
 * Teclado.
 */
export class Keyboard {
  constructor() {
    this.target = null;
    this.keys = new Map();
    this.callbacks = new Map();
  }

  /**
   * @readonly
   * @property {Boolean} - Indica si está corriendo o no.
   */
  get isRunning() {
    return this.target !== null;
  }

  handler = (e) => {
    this.keys.set(e.code, e.type === "keydown" ? PRESSED : RELEASED);
    if (e.type === "keyup" && this.callbacks.has(e.code)) {
      const callback = this.callbacks.get(e.code);
      return callback();
    }
  };

  /**
   * Borra el estado de las teclas.
   *
   * @return {Keyboard}
   */
  clear() {
    this.keys.clear();
    return this;
  }

  /**
   * Añade una callback asociada a una tecla.
   *
   * @param {String} code - Código de tecla que se asociará a una función.
   * @param {Function} callback - Función que asociaremos al código de tecla.
   * @return {Keyboard}
   */
  on(code, callback) {
    this.callbacks.set(code, callback);
    return this;
  }

  /**
   * Borra las callbacks asociadas a las teclas.
   *
   * @param {...String} [codes] - Códigos de tecla para los que se borrarán las callbacks
   * @return {Keyboard}
   */
  off(...codes) {
    if (codes.length === 0) {
      this.callbacks.clear();
      return this;
    }
    for (const code of codes) {
      this.callbacks.delete(code);
    }
    return this;
  }

  /**
   * Devuelve el estado de la tecla.
   *
   * @param {String} code - Código de la tecla.
   * @return {Number} - Estado de la tecla.
   */
  stateOf(code) {
    if (this.keys.has(code)) {
      return this.keys.get(code);
    }
    return RELEASED;
  }

  /**
   * Devuelve si la tecla indicada está presionada.
   *
   * @param {String} code - Código de la tecla.
   * @return {Boolean}
   */
  isPressed(code) {
    return this.stateOf(code) === PRESSED;
  }

  /**
   * Devuelve si la tecla no está presionada.
   *
   * @param {String} code - Código de la tecla.
   * @return {Boolean}
   */
  isReleased(code) {
    return this.stateOf(code) === RELEASED;
  }

  /**
   * Arranca la escucha de eventos al teclado.
   *
   * @param {Window|Document|HTMLElement} [target=window] - Elemento que escuchará los eventos de teclado.
   * @return {Boolean} - Devuelve si se ha arrancado el teclado.
   */
  start(target = window) {
    if (this.target) {
      return false;
    }
    this.target = target;
    this.target.addEventListener("keyup", this.handler);
    this.target.addEventListener("keydown", this.handler);
    return true;
  }

  /**
   * Detiene la escucha de eventos del teclado.
   *
   * @return {Boolean} - Devuelve si se ha detenido el teclado.
   */
  stop() {
    if (!this.target) {
      return false;
    }
    this.target.removeEventListener("keyup", this.handler);
    this.target.removeEventListener("keydown", this.handler);
    this.target = null;
    return true;
  }
}

export default Keyboard;

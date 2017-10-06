import { PRESSED, RELEASED } from "./constants";
import MouseButton from "./MouseButton";
import Vector2 from "math/Vector2";

/** @module input */

/**
 * Ratón.
 */
export class Mouse {
  /**
   * Devuelve el nombre del botón.
   *
   * @param {Number} button - Identificador del botón.
   * @return {String} - Código del botón
   */
  static getButtonName(button) {
    switch (button) {
      case 0: return MouseButton.LEFT;
      case 1: return MouseButton.MIDDLE;
      case 2: return MouseButton.RIGHT;
      default: return "Unknown";
    }
  }

  constructor() {
    this.target = null;
    this.buttons = new Map();
    this.callbacks = new Map();
    this.coordinates = {
      start: new Vector2(),
      end: new Vector2(),
      current: new Vector2(),
      previous: new Vector2(),
      relative: new Vector2(),
      absolute: new Vector2()
    };
  }

  /**
   * @readonly
   * @property {Boolean} - Indica si está corriendo o no.
   */
  get isRunning() {
    return this.target !== null;
  }

  handler = (e) => {
    if (e.type === "mousedown" || e.type === "mouseup") {
      const buttonName = Mouse.getButtonName(e.button);
      this.buttons.set(buttonName, e.type === "mousedown" ? PRESSED : RELEASED);
    }

    if (e.type === "mousedown") {
      this.coordinates.start.set(e.clientX,e.clientY);
      this.coordinates.end.copy(this.coordinates.start);
      this.coordinates.current.copy(this.coordinates.start);
      this.coordinates.previous.copy(this.coordinates.start);
      this.coordinates.relative.reset();
      this.coordinates.absolute.reset();
    } else if (e.type === "mouseup") {
      this.coordinates.previous.copy(this.coordinates.current);
      this.coordinates.current.set(e.clientX, e.clientY);
      this.coordinates.relative.copy(this.coordinates.current).subtract(this.coordinates.previous);
      this.coordinates.end.copy(this.coordinates.current);
      this.coordinates.absolute.copy(this.coordinates.end).subtract(this.coordinates.start);
    } else if (e.type === "mousemove") {
      this.coordinates.previous.copy(this.coordinates.current);
      this.coordinates.current.set(e.clientX,e.clientY);
      this.coordinates.relative.copy(this.coordinates.current).subtract(this.coordinates.previous);
      this.coordinates.absolute.copy(this.coordinates.current).subtract(this.coordinates.start);
    }
  };

  /**
   * Borra el estado de los botones.
   *
   * @return {Mouse}
   */
  clear() {
    this.buttons.clear();
    return this;
  }

  /**
   * Añade una callback asociada a un botón.
   *
   * @param {String} button - Código de botón que se asociará a una función.
   * @param {Function} callback - Función que asociaremos al código de botón.
   * @return {Mouse}
   */
  on(button, callback) {
    this.callbacks.set(button, callback);
    return this;
  }

  /**
   * Borra las callbacks asociadas a los botones.
   *
   * @param {...String} [codes] - Códigos de botón para los que se borrarán las callbacks
   * @return {Mouse}
   */
  off(...buttons) {
    if (buttons.length === 0) {
      this.callbacks.clear();
      return this;
    }
    for (const button of buttons) {
      this.callbacks.delete(button);
    }
    return this;
  }

  /**
   * Devuelve el estado del botón indicado.
   *
   * @param {String} button - Código del botón.
   * @return {Number} - Devuelve el estado del botón.
   */
  stateOf(button) {
    if (this.buttons.has(button)) {
      return this.buttons.get(button);
    }
    return RELEASED;
  }

  /**
   * Devuelve si el botón está presionado.
   *
   * @param {String} button - Código del botón.
   * @return {Boolean} - Devuelve true si el botón está presionado.
   */
  isPressed(button) {
    return this.stateOf(button) === PRESSED;
  }

  /**
   * Devuelve si el botón no está presionado.
   *
   * @param {String} button - Código del botón.
   * @return {Boolean} - Devuelve true si el botón está suelto.
   */
  isReleased(button) {
    return this.stateOf(button) === RELEASED;
  }

  /**
   * Arranca la escucha de eventos.
   *
   * @param {Window|Document|HTMLElement} target
   * @return {Boolean} - Devuelve true si arranca la escucha de eventos.
   */
  start(target = window) {
    if (this.target) {
      return false;
    }
    this.target = target;
    this.target.addEventListener("mouseup", this.handler);
    this.target.addEventListener("mousedown", this.handler);
    this.target.addEventListener("mousemove", this.handler);
    this.target.addEventListener("mouseenter", this.handler);
    this.target.addEventListener("mouseleave", this.handler);
    return true;
  }

  /**
   * Detiene la escucha de eventos.
   *
   * @return {Boolean} - Devuelve true si detiene la escucha de eventos.
   */
  stop() {
    if (!this.target) {
      return false;
    }
    this.target.removeEventListener("mouseup", this.handler);
    this.target.removeEventListener("mousedown", this.handler);
    this.target.removeEventListener("mousemove", this.handler);
    this.target.removeEventListener("mouseenter", this.handler);
    this.target.removeEventListener("mouseleave", this.handler);
    this.target = null;
    return true;
  }
}

export default Mouse;

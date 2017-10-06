import { PRESSED, PRESSED_THRESHOLD, RELEASED } from "./constants";

/** @module input */

/** Indica que es un botón */
export const BUTTON = "button";

/** Indica que es un eje */
export const AXIS = "axis";

/**
 * Gamepad
 */
export class Gamepad {
  /**
   * Devuelve el estado del botón o del eje del gamepad.
   *
   * @param {Gamepad} gamepad
   * @param {...String} path
   * @return {Number}
   */
  static stateOf(gamepad, ...path) {
    const [type, index] = path;
    if (type === BUTTON) {
      return gamepad.buttons[index].value;
    } else if (type === AXIS) {
      return gamepad.axes[index];
    }
    return null;
  }

  /**
   * Devuelve si el botón o el eje del gamepad están presionados.
   *
   * @param {Gamepad} gamepad
   * @param {...String} path
   * @return {Number}
   */
  static isPressed(gamepad, ...path) {
    return stateOf(gamepad, ...path) >= PRESSED_THRESHOLD;
  }

  /**
   * Devuelve si el botón o el eje del gamepad están sueltos.
   *
   * @param {Gamepad} gamepad
   * @param {...String} path
   * @return {Number}
   */
  static isReleased(gamepad, ...path) {
    return stateOf(gamepad, ...path) === RELEASED;
  }

  /**
   * Devuelve si algún botón o eje del gamepad están presionados.
   *
   * @param {Gamepad} gamepad
   * @return {Boolean}
   */
  static isAnyPressed(gamepad) {
    return isAnyAxisPressed(gamepad)
        && isAnyButtonPressed(gamepad);
  }

  /**
   * Devuelve si algún eje del gamepad están presionados.
   *
   * @param {Gamepad} gamepad
   * @return {Boolean}
   */
  static isAnyAxisPressed(gamepad) {
    // Recorremos todos los botones para saber si alguno está presionado o no.
    for (let index = 0; index < gamepad.axes.length; index++) {
      if (Math.abs(gamepad.axes[index]) >= PRESSED_THRESHOLD) {
        return true;
      }
    }
    return false;
  }

  /**
   * Devuelve si algún botón del gamepad están presionados.
   *
   * @param {Gamepad} gamepad
   * @return {Boolean}
   */
  static isAnyButtonPressed(gamepad) {
    // Recorremos todos los botones para saber si alguno está presionado o no.
    for (let index = 0; index < gamepad.buttons.length; index++) {
      if (gamepad.buttons[index].pressed) {
        return true;
      }
    }
    return false;
  }
}

export default Gamepad;

import Gamepad from "./Gamepad";

/** @module input */

/**
 * Controla los gamepads
 */
export class Gamepads {
  constructor() {
    this.isRunning = false;
    this.gamepads = {
      length: 0,
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined
    };
    this.connected = new Array();
  }

  /**
   * @readonly
   * @property {Gamepad} - Gamepad
   */
  get first() {
    return this.getGamepad(0);
  }

  /**
   * @readonly
   * @property {Gamepad} - Gamepad
   */
  get second() {
    return this.getGamepad(1);
  }

  /**
   * @readonly
   * @property {Gamepad} - Gamepad
   */
  get third() {
    return this.getGamepad(2);
  }

  /**
   * @readonly
   * @property {Gamepad} - Gamepad
   */
  get fourth() {
    return this.getGamepad(3);
  }

  handler = (e) => {
    if (e.type === "gamepadconnected") {
      // TODO: Ver qué podría hacer por esto.
    } else if (e.type === "gamepaddisconnected") {
      for (let index = this.connected.length - 1; index >= 0; index--) {
        const gamepadIndex = this.connected[index];
        if (gamepadIndex === e.gamepad.index) {
          const [removed] = this.connected.splice(index, 1);
          return removed;
        }
      }
    }
  };

  /**
   * Devuelve un gamepad.
   *
   * @param {Number} index - Índice del gamepad que vamos a obtener.
   * @return {Gamepad} - Gamepad conectado.
   */
  getGamepad(index) {
    if (index < 0 || index >= this.connected.length) {
      return null;
    }
    const gamepadIndex = this.connected[index];
    return this.gamepads[gamepadIndex];
  }

  /**
   * Actualiza los gamepads.
   *
   * @return {Gamepads}
   */
  update() {
    const gamepads = this.gamepads = navigator.getGamepads();
    // Si no hay ningún Gamepad dentro de esta lista, lo que hacemos
    // es esperar a que se presione alguno de los botones del gamepad para
    // establecerlo como seteado.
    if (this.connected.size === 0) {
      for (let gamepadIndex = 0; gamepadIndex < gamepads.length; gamepadIndex++) {
        const gamepad = gamepads[gamepadIndex];
        if (!gamepad || !gamepad.connected) {
          continue;
        }
        if (Gamepad.isAnyButtonPressed(gamepad)) {
          this.connected.push(gamepadIndex);
        }
      }
    }
    return this;
  }

  /**
   * Arranca la escucha de eventos.
   *
   * @return {Boolean}
   */
  start() {
    if (this.isRunning) {
      return false;
    }
    window.addEventListener("gamepadconnected", this.handler);
    window.addEventListener("gamepaddisconnected", this.handler);
    this.isRunning = true;
    return true;
  }

  /**
   * Detiene la escucha de eventos.
   *
   * @return {Boolean}
   */
  stop() {
    if (!this.isRunning) {
      return false;
    }
    window.removeEventListener("gamepadconnected", this.handler);
    window.removeEventListener("gamepaddisconnected", this.handler);
    this.isRunning = true;
    return true;
  }
}

export default Gamepads;

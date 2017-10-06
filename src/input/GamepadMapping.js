/** @module input */

/**
 * Guarda el mapping de un gamepad.
 *
 * @param {Gamepad} gamepad
 * @param {Map} mapping
 */
export function save(gamepad, mapping) {
  const list = [];
  for (const value of mapping) {
    list.push(value);
  }
  window.localStorage.setItem(gamepad.id, JSON.stringify(list, null, "  "));
}

/**
 * Carga el mapping de un gamepad.
 *
 * @param {Gamepad} gamepad
 * @return {Map}
 */
export function load(gamepad) {
  return new Map(JSON.parse(window.localStorage.getItem(gamepad.id)));
}

export default {
  save,
  load
}

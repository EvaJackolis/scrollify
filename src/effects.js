/**
 * A list of some default "transformations" that may be applied
 * Options are applied at initialize and are curried in via "this".
 *
 * NOTE: for all functions herein, "this" contains effect options, a
 * transformation Object, and also a reference to the element.
 */

/*global console*/
/*eslint no-invalid-this: "error"*/

import transform from './transform';


/**
 * Translate an element along the X-axis.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function translateX(progress) {
  let to = this.options.to || 0;
  let from = this.options.from || 0;
  let offset = (to - from) * progress + from;

  this.transforms.position[0] = offset;
}

/**
 * Translate an element vertically.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function translateY(progress) {
  let to = this.options.to || 0;
  let from = this.options.from || 0; // this.transforms.position[1];
  let offset = (to - from) * progress + from;

  this.transforms.position[1] = offset;
}

/**
 * Rotate an element, using radians. (note: rotates around Z-axis).
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function rotate(progress) {
  const radians = this.options.rad * progress;

  this.transforms.rotation[2] = radians;
};

/**
 * Uniformly scale an element along both axis'.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function scale(progress) {
  const to = this.options.to || 1;
  const from = this.options.from || this.transforms.scale[0];
  const scale = (to - from) * progress + from;

  this.transforms.scale[0] = scale;
  this.transforms.scale[1] = scale;
};

/**
 * Update an element's opacity.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function fade(progress) {
  const to = this.options.to || 0;
  const from = this.options.from || 1;
  const opacity = (to - from) * progress + from;

  this.element.style.opacity = opacity;
};

/**
 * Parallax an element.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 *
 * "this" contains effect options and also a reference to the element.
 */
export function parallax(progress) {
  const range = this.options.range || 0;
  const offset = progress * range;

  this.transforms.position[1] = offset;   // just vertical for now
}

/**
 * Toggle a class on or off.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function toggle(progress) {
  const opts = this.options;
  const element = this.element;
  const times = Object.keys(opts);

  times.forEach(function(time) {
    const css = opts[time];

    if (progress > time) {
      element.classList.add(css);
    } else {
      element.classList.remove(css);
    }
  });
}

/**
 * Sticky Element: sets up a sticky element which toggles position 'fixed' on / off.
 * @param {Float} progress: Current progress data of the scene, between 0 and 1.
 * @this {Object}
 * @return {void}
 */
export function stick(progress) {
  let element = this.element;
  let currentState = '_';

  if (progress <= 0) {
    setState(element, 'normal');
  } else if (progress >= 1) {
    setState(element, 'bottom');
  } else {
    setState(element, 'sticky');
  }

  function setState(element, state) {
    let BCR = element.getBoundingClientRect();

    if (currentState === state) { return; }
    if (state == 'sticky') {
      element.style.top = BCR.top + 'px';
      element.style.left = BCR.left + 'px';
      element.style.width = BCR.width + 'px';
    } else {
      element.style.top = '';
      element.style.left = '';
      element.style.width = '';
    }

    element.className = '';
    // element.classList.remove(currentState);  // TODO: why is this not working?
    element.classList.add(state);

    currentState = state;
  }
}

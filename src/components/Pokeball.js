import { Container, Text, Sprite } from 'pixi.js';
import { Elastic } from 'gsap/all';

import config from '../config';
import gsap from 'gsap';

export default class Pokeball extends Container {
  constructor() {
    super();
    this.name = 'pokeball';
    this.isOpened = false;
    this.init();
  }

  /**
   * Method that initializes the Pokeball instance.
   * Adds Pixi Text obejct. Defines the Top and Bottom sprites of the Pokeball
   *
   * @memberof Pokeball
   */
  init() {

    this.text = new Text('', {
      fontFamily: 'Arial', fontSize: 120, fill: 0xffffff, align: 'center', fontWeight: 'bold',
    });
    this.text.x = 10;
    this.text.y = 0;
    this.text.anchor.set(0.5);

    this.top = new Sprite.from('ball-top');
    this.top.x = -200;
    this.top.y = -300;

    this.bottom = new Sprite.from('ball-bottom');
    this.bottom.x = -200;
    this.bottom.y = -60;

    this.addChild(this.text);
    this.addChild(this.top);
    this.addChild(this.bottom);
  }

  /**
   * Opens the Pokeball
   *
   * @memberof Pokeball
   */
  async open() {
    this.emit(Pokeball.events.OPEN_START);
    const timeLine = new gsap.timeline();

    timeLine.to(this.top, { y: -360, duration: 0.5, ease: Elastic.easeOut.config(0.3, 0.1) }, 'openAnimation');
    timeLine.to(this.bottom, { y: 50, duration: 0.5, ease: Elastic.easeOut.config(0.3, 0.1) }, 'openAnimation');

    this.emit(Pokeball.events.OPEN_END);
    await this._shuffle();
    await this.close();
  }

  /**
   * Closes the Pokeball
   *
   * @memberof Pokeball
   */
  async close() {
    this.emit(Pokeball.events.CLOSE_START);
    const timeLine = new gsap.timeline();

    timeLine.to(this.top, { y: -300, duration: 0.5, ease: Elastic.easeOut.config(0.3, 0.1) }, 'closeAnimation');
    await timeLine.to(this.bottom, { y: -60, duration: 0.5, ease: Elastic.easeOut.config(0.3, 0.1) }, 'closeAnimation');
    this.emit(Pokeball.events.CLOSE_END);
  }

  /**
   * Random text generator.
   * Used in the _shuffle method
   *
   * @return {*} 
   * @memberof Pokeball
   */
  _setRandomText() {
    return Math.random().toString(36).substring(2, 15).toUpperCase();
  }

  /**
   * The events that atr triggered by a Pokeball instance
   *
   * @readonly
   * @static
   * @memberof Pokeball
   */
  static get events() {
    return { OPEN_END: 'open_end', OPEN_START: 'open_start', CLOSE_END: 'close_end', CLOSE_START: 'close_start' };
  }

  /**
   * Creates an animation for random data displayed in the PIXI Text
   *
   * @memberof Pokeball
   */
  async _shuffle() {
    let prev = 0;

    const dummy = { value: 0 };
    const steps = gsap.to(dummy, {
      duration: 1,
      ease: 'steps(70)',
      value: 70,
      paused: true,
      onUpdate: () => {
        if (dummy.value !== prev) this.text.text = this._setRandomText();
        prev = dummy.value;
      }
    });

    await gsap.to(steps, { duration: 3, progress: 1, ease: 'circ.out' });
    this.text.text = '';
  }
}
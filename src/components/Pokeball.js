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

  async open() {
    this.emit(Pokeball.events.OPEN_START);
    const timeLine = new gsap.timeline();

    timeLine.to(this.top, { y: -360, duration: 1, ease: Elastic.easeOut.config(1, 0.2) }, 'openAnimation');
    await timeLine.to(this.bottom, { y: 50, duration: 1, ease: Elastic.easeOut.config(1, 0.2) }, 'openAnimation');

    this.emit(Pokeball.events.OPEN_END);

    this.isOpened = true;

    await this._shuffle();
    await this.close();
  }

  async close() {
    this.emit(Pokeball.events.CLOSE_START);
    const timeLine = new gsap.timeline();

    timeLine.to(this.top, { y: -300, duration: 1, ease: Elastic.easeOut.config(1, 0.2) }, 'closeAnimation');
    await timeLine.to(this.bottom, { y: -60, duration: 1, ease: Elastic.easeOut.config(1, 0.2) }, 'closeAnimation');
    this.isOpened = false;
    this.emit(Pokeball.events.CLOSE_END);
  }

  _setRandomText() {
    return Math.random().toString(36).substring(2, 15).toUpperCase();
  }

  static get events() {
    return { OPEN_END: 'open_end', OPEN_START: 'open_start', CLOSE_END: 'close_end', CLOSE_START: 'close_start' };
  }

  async _shuffle() {
    let prev = 0;

    const dummy = { value: 0 };
    const steps = gsap.to(dummy, {
      duration: 1,
      ease: 'steps(100)',
      value: 100,
      paused: true,
      onUpdate: () => {
        if (dummy.value !== prev) this.text.text = this._setRandomText();
        prev = dummy.value;
      }
    });

    await gsap.to(steps, { duration: 5, progress: 1, ease: 'circ.out' });
    this.text.text = '';
  }
}
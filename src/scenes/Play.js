import { Sprite } from 'pixi.js';
import Scene from './Scene';
import gsap from 'gsap';
import Footer from '../components/Footer';
import Pokeball from '../components/Pokeball';
import Button from '../components/Button';

export default class Play extends Scene {
  async onCreated() {

    const footer = new Footer();
    const ball = new Pokeball();
    const button = new Button();
    button.interactive = true;
    button.buttonMode = true;

    footer.x = - window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);

    ball.addListener('open_start', () => {
      gsap.to(button, { alpha: 0, duration: 0.15 });
    });

    ball.addListener('close_start', () => {
      gsap.to(button, { alpha: 1, duration: 0.15 });
    });

    this.addChild(ball);

    button.addListener('click', () => {
      ball.open();
    });
    this.addChild(button);
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) { // eslint-disable-line no-unused-vars

  }
}

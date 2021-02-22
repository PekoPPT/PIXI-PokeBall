import { Container, Graphics, Text } from 'pixi.js';
import gsap from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';

gsap.registerPlugin(PixiPlugin);

export default class Button extends Container {
  constructor() {
    super();
    this.name = 'button';
    this.isOpened = false;
    this.init();
  }

  /**
   * Initializes the Shuffle button 
   *
   * @memberof Button
   */
  init() {
    // Add Button Graphics 
    this.button = new Graphics(0, 0, 300, 50);
    this.button.lineStyle(0, 0xFF0000, 1);
    this.button.beginFill(0xFF0000, 1);
    this.button.drawRect(0, 0, 300, 100);
    this.button.x = -120;
    this.button.y = 180;
    this.button.on('click', () => { this.emit('click'); });
    this.addChild(this.button);

    // Add text for the Graphics
    this.buttonText = new Text('THROW BALL',
      {
        font: '12px Arial',
        fill: 0xffffff,
        align: 'center',
        cacheAsBitmap: true, // for better performance
      });

    this.buttonText.x = 65;
    this.buttonText.y = 35;
    this.button.addChild(this.buttonText);
  }

  /**
   * Hides the Shuffle button
   *
   * @memberof Button
   */
  hide() {
    gsap.to(this, { pixi: { alpha: 0 }, duration: 0.01 });
  }

  /**
   * Shows the Shuffle button
   *
   * @memberof Button
   */
  show() {
    gsap.to(this, { pixi: { alpha: 1 }, duration: 0.01 });
  }
}
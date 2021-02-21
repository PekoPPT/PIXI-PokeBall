import { Container, Graphics, Text } from 'pixi.js';
import gsap from 'gsap';

export default class Button extends Container {
  constructor() {
    super();
    this.name = 'button';
    this.init();
  }

  init() {
    this.button = new Graphics(0, 0, 300, 50);
    this.button.lineStyle(0, 0xFF0000, 1);
    this.button.beginFill(0xFF0000, 1);
    this.button.drawRect(0, 0, 300, 100);
    this.button.x = -120;
    this.button.y = 180;
    this.button.on('click', () => { this.emit('click'); });
    this.addChild(this.button);

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
}
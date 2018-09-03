import Phaser from 'phaser';

export default class Engine{
  constructor(parentElement){
    this.sprites = [];
    this.direction = 'left';
    this.game = new Phaser.Game(600, 600, Phaser.CANVAS, parentElement, { create: this.create, update: this.update.bind(this) });
  }
  create(){
    // this.game.stage.backgroundColor = 0xbada55;
    this.game.stage.backgroundColor = 0xffffff;
  }
  update(){
    if(this.sprites.length > 0){
      for(var i=0;i<this.sprites.length;i++){
        const item = this.sprites[i];
        var {sprite,degree,radius,translate,direction} = item;
        degree = degree + .2*direction;
        const {x,y} = this.calculateCoordinates(degree,radius,translate);
        sprite.x = x;
        sprite.y = y;
        this.sprites[i].degree = degree;
      }
    }
  }
  clear(){
    for(var i=0;i<this.sprites.length;i++){
      const { sprite } = this.sprites[i];
      sprite.kill();
    }
    this.sprites = [];
  }
  renderChannels(layers){
    this.clear();
    this.plotActivationLayer(layers[0],.5,100);
    this.plotActivationLayer(layers[1],3,175);
    this.plotActivationLayer(layers[2],2.5,240);
  }
  toRadians (angle) {
    return angle * (Math.PI / 180);
  }
  calculateCoordinates(degree,radius,translate){
    const x = Math.cos(this.toRadians(degree))*radius+translate;
    const y = Math.sin(this.toRadians(degree))*radius+translate;
    return { x, y };
  }
  updateRotateDirection(){
    this.direction = this.direction == 'left' ? 'right' : 'left';
  }
  plotActivationLayer(data, scale, radius){
    this.updateRotateDirection();
    const offset = 360/data.length;
    for(var i=0; i<data.length; i++){
      const channelData = data[i];
      const {width} = channelData;
      var bmd = this.game.add.bitmapData(width,width);
      bmd.ctx.putImageData(channelData,0,0);
      const degree = i*offset;
      const translate = 300-(scale*width/2);
      const direction = this.direction == 'left' ? -1 : 1;
      const {x,y} = this.calculateCoordinates(degree,radius,translate);
      var sprite = this.game.add.sprite(x, y, bmd);
      sprite.scale.setTo(scale,scale);
      this.sprites.push({ sprite,degree,radius,translate,direction });
    }
  }
}

export default class Engine{
  constructor(){
    this.sprites = [];
    this.game = new Phaser.Game(600, 600, Phaser.CANVAS, 'renderArea', { create: this.create, update: this.update });
  }
  create(){
    this.game.stage.backgroundColor = 0xbada55;
  }
  update(){
  }
  renderChannels(layers){
    this.plotActivationLayer(layers[0],.5,100);
    this.plotActivationLayer(layers[1],3,175);
    this.plotActivationLayer(layers[2],2.5,240);
  }
  toRadians (angle) {
    return angle * (Math.PI / 180);
  }
  plotActivationLayer(data, scale, radius){
    const offset = 360/data.length;
    for(var i=0; i<data.length; i++){
      const channelData = data[i];
      const {width} = channelData;
      var bmd = this.game.add.bitmapData(width,width);
      bmd.ctx.putImageData(channelData,0,0);
      const degree = i*offset;
      const translate = 300-(scale*width/2)
      var x = Math.cos(this.toRadians(degree))*radius+translate;
      var y = Math.sin(this.toRadians(degree))*radius+translate;
      var sprite = this.game.add.sprite(x, y, bmd);
      sprite.scale.setTo(scale,scale);
      this.sprites.push({
        sprite:sprite,degree:degree,radius:radius,translate:translate
      });
    }
  }
}

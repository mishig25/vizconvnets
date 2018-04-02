import * as plotty from './plotty';

export default class Plot{
  constructor(canvas,width,height,data){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.plot = new plotty.plot({
        canvas: canvas,
        data: data, width: width, height: height,
        domain: [Math.min(...data), Math.max(...data)],
        colorScale: 'magma'
    });
  }
  getImageData(){
    return this.plot.getImageData();
  }
  render(x,y){
    const imageData = this.getImageData();
    console.log(imageData)
    this.ctx.putImageData(imageData, x, y);
  }
}

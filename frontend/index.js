import { getTopKClasses } from './imagenet_classes';
import Model from './model'
import Plot from './plot'

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imgData,imgData2,allData;

async function init() {
  // mobilenet = await loadMobilenet();

  var mod = new Model();
  await mod.loadModel();
  // await mod.loadMobilenet();
  console.log('here')
  //predicting on cat
  const imgElement = document.getElementById('cat');
  const preds = await mod.predict(imgElement);

  // console.log(preds)
  // const classes = await getTopKClasses(preds[preds.length-1], 10);
  // console.log(classes)
  // gettign first layer

  allData = await mod.getActivation(canvas,0,8);
}

// circle math
function toRadians (angle) {
  return angle * (Math.PI / 180);
}

// Initialize the application.
init()

setTimeout(function(){
  var game = new Phaser.Game(600, 600, Phaser.CANVAS, 'phaser', { create: create });

  function create() {
    game.stage.backgroundColor = 0xbada55;
    // console.log(allData)
    const offset = 360/allData.length;
    for(var i=0; i<allData.length; i++){
      const channelData = allData[i];
      const {width} = channelData;
      var bmd = game.add.bitmapData(112,112);
      bmd.ctx.putImageData(channelData,0,0);
      var x = Math.cos(toRadians(i*offset))*100+300;
      var y = Math.sin(toRadians(i*offset))*100+300;
      var sprite = game.add.sprite(x, y, bmd);
      sprite.scale.setTo(.5, .5);
    }
  }
}, 3000);

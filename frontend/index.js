import Model from './model'
import Engine from './engine'

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
document.getElementById('files').addEventListener('change', handleFileSelect, false);

const engine = new Engine();
const mod = new Model();

var layer1,layer2,layer3;

async function init() {
  await mod.loadModel();
  //predicting on cat
  const imgElement = document.getElementById('cat');
  const preds = await mod.predict(imgElement);

  layer1 = await mod.getActivation(canvas,0,8);
  layer2 = await mod.getActivation(canvas,2,16);
  layer3 = await mod.getActivation(canvas,3,32);
}

async function handleFileSelect(evt) {
  var f = evt.target.files[0]; // FileList object
  var reader = new FileReader();

  // Closure to capture the file information.
  reader.onload = (function(theFile) {
    return function(e) {
      document.getElementById("cat").src= e.target.result;
    };
  })(f);

  // Read in the image file as a data URL.
  reader.readAsDataURL(f);
  console.log('file loaded')

  // testing here
  await mod.loadModel();
  //predicting on cat
  const imgElement = document.getElementById('cat');
  const preds = await mod.predict(imgElement);

  layer1 = await mod.getActivation(canvas,0,8);
  layer2 = await mod.getActivation(canvas,2,16);
  layer3 = await mod.getActivation(canvas,3,32);
  engine.renderChannels([layer1,layer2,layer3])
}

// Initialize the application.
// init()
//
// setTimeout(function(){
//   engine.renderChannels([layer1,layer2,layer3])
// },3000)

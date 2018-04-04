import Model from './model'
import Engine from './engine'

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
document.getElementById('files').addEventListener('change', handleFileSelect, false);
const imgElement = document.getElementById('cat');

const engine = new Engine();
const mod = new Model();

var layer1,layer2,layer3;

async function init() {
  await mod.loadModel();
  //predicting on cat
  const preds = await mod.predict(imgElement);

  layer1 = await mod.getActivation(canvas,0,8);
  layer2 = await mod.getActivation(canvas,2,16);
  layer3 = await mod.getActivation(canvas,3,32);
}

function handleFileSelect(evt) {
  var f = evt.target.files[0]; // FileList object
  var reader = new FileReader();

  reader.onload = e => {
    imgElement.src= e.target.result;
    imgElement.onload = () => predict(imgElement);
  }
  // Read in the image file as a data URL.
  reader.readAsDataURL(f);
}

async function predict(imgElement){
  if(!mod.loaded) await mod.loadModel();
  
  const preds = await mod.predict(imgElement);

  layer1 = await mod.getActivation(canvas,0,8);
  layer2 = await mod.getActivation(canvas,1,16);
  layer3 = await mod.getActivation(canvas,2,32);
  engine.renderChannels([layer1,layer2,layer3]);

}

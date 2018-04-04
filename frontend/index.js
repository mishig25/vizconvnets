import Model from './model'
import Engine from './engine'

var canvas = document.getElementById("helperCanvas");
var ctx = canvas.getContext("2d");
document.getElementById('file').addEventListener('change', handleFileSelect, false);
const imgElement = document.getElementById('img');

let model, engine;

async function init() {
  engine = new Engine();
  model = new Model();
  await model.loadModel();
  model.warmUp();
}

function handleFileSelect(evt) {
  var reader = new FileReader();
  reader.onload = e => {
    imgElement.src= e.target.result;
    imgElement.onload = () => predict(imgElement);
  }
  // Read in the image file as a data URL.
  reader.readAsDataURL(evt.target.files[0]);
}

async function predict(imgElement){
  if(!model.loaded) await model.loadModel();

  const preds = await model.predict(imgElement);

  const layer1 = await model.getActivation(canvas,0,8);
  const layer2 = await model.getActivation(canvas,1,16);
  const layer3 = await model.getActivation(canvas,2,32);
  engine.renderChannels([layer1,layer2,layer3]);
}

init();

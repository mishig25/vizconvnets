import Model from './model';
import Engine from './engine';
import Chart from './chart';
import { IMAGE_URLS } from './utils/sampleImages';
import { getTopKClasses } from './utils/imagenet_classes';

var canvas = document.getElementById("helperCanvas");
var ctx = canvas.getContext("2d");
document.getElementById('file').addEventListener('change', fileUploaded, false);
document.getElementById('sampleImages').addEventListener('change', sampleImageChosen, false);

IMAGE_URLS.forEach((sample) => {
  var option = document.createElement('option')
  option.setAttribute("value", sample.value);
  option.innerText = sample.text;
  document.getElementById('sampleImages').appendChild(option);
})

const imgElement = document.getElementById('img');
imgElement.setAttribute('crossorigin', 'anonymous');

let model, engine, chart, chartElement;

async function init() {
  engine = new Engine();
  initChart();
  model = new Model();
  await model.loadModel();
  model.warmUp();
}

function initChart(){
  google.charts.load('current', {packages: ['corechart', 'bar']});
  google.charts.setOnLoadCallback(() => {
    chartElement = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart = new Chart(chartElement);
  });
}

function fileUploaded(evt) {
  var reader = new FileReader();
  reader.onload = e => predict(e.target.result,imgElement);
  // Read in the image file as a data URL.
  reader.readAsDataURL(evt.target.files[0]);
}

function sampleImageChosen(e) {
    predict(e.target.value,imgElement);
}

async function predict(imgPath,imgElement){
  imgElement.src= imgPath;
  imgElement.onload = async () => {
    if(!model.loaded) await model.loadModel();

    const preds = await model.predict(imgElement);
    const layer1 = await model.getActivation(canvas,0,8);
    const layer2 = await model.getActivation(canvas,1,16);
    const layer3 = await model.getActivation(canvas,2,32);
    engine.renderChannels([layer1,layer2,layer3]);

    const labels = await getTopKClasses(preds[3],5);
    chart.draw(labels);
  };
}

init();

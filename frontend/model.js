import * as tf from '@tensorflow/tfjs';
import Plot from './plot';
import { getTopKClasses } from './imagenet_classes';

const IMAGE_SIZE = 224;
const TOPK_PREDICTIONS = 10;
const mobilenetPath = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'

export default class Model{
  constructor(){
    this.loaded = false;
  }
  async loadModel(){
    const mobilenet = await tf.loadModel(mobilenetPath);

    // Return a model that outputs an internal activation.
    const layerNames = ['conv_dw_1_relu','conv_dw_6_relu',
    'conv_dw_8_relu', 'reshape_2'];
    const layerOutputs = [];
    layerNames.forEach((layerName) => {
      var layer = mobilenet.getLayer(layerName);
      layerOutputs.push(layer.output);
    })
    this.model = tf.model({inputs: mobilenet.inputs, outputs: layerOutputs});
    this.loaded = true;
  }

  warmUp(){
    tf.tidy(() => {
      this.model.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3]));
    });
  }

  async predict(imgElement) {

    const preds = tf.tidy(() => {
      const img = tf.fromPixels(imgElement).toFloat();
      const offset = tf.scalar(127.5);
      const normalized = img.sub(offset).div(offset);
      const batched = normalized.reshape([1, IMAGE_SIZE, IMAGE_SIZE, 3]);
      return this.model.predict(batched);
    });
    this.preds = preds;
    return preds;
  }

  async getActivation(canvas, layerNumber, channelCount){
    if(this.preds){
      var activations = []
      const layerActivations = this.preds[layerNumber];
      const shape = layerActivations.shape;
      const w = shape[1];
      for(var i=0; i<channelCount; i++){
        const channel = layerActivations.slice([0,0,0,i],[0,w,w,1]);
        const channelData = await channel.data();
        const plt = new Plot(canvas,w,w,channelData);
        const pltData = plt.getImageData();
        activations.push(pltData);
      }
      return activations;
    }
  }

}

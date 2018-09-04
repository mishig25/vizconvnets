import * as tf from '@tensorflow/tfjs';
import Plot from './utils/plot';
import { IMAGENET_CLASSES } from './utils/imagenet_classes';

const IMAGE_SIZE = 224;
const TOPK_PREDICTIONS = 10;
const mobilenetPath = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'

/**
 * Mobilenet class for loading mobelent and image inferences
 */
export default class Model{

  /**
   * the class constructor
   */
  constructor(){
    this.loaded = false;
  }

  /**
   * Loads mobilenet
   */
  async loadModel(){
    const mobilenet = await tf.loadModel(mobilenetPath);
    // Return a model that outputs activations of hidden layers.
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

  /**
   * Warms up mobilenet to increase speed of subsequent processes.
   */
  warmUp(){
    tf.tidy(() => {
      this.model.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3]));
    });
  }

  /**
   * Run inference on given image and returns logits
   * @param {HTMLImageElement} imgElement 
   * @returns {object} imagenet labels and their probabilities
   */
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

  /**
   * Returns activations of a layer
   * @param {HTMLCanvasElement} canvas that will be used for plotting
   * @param {integer} layerNumber specifying which hidden layer
   * @param {integer} channelCount specifying how many feature filters to extract
   * @returns {array} of activation plots
   */
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

  /**
   * @returns {array} of the highest labels
   */
  async getLabels(){
    const labels = await this.getTopKClasses(this.preds[this.preds.length-1],5);
    return lables;
  }

  /**
   * Returns the highest proababilities and their labels
   * @param {tensor} layer last layer of the neural net
   * @param {integer} topK indicating how many of the top proababilities to extract
   * @returns {object} of the highest proababilities and their labels
   */
  async getTopKClasses(layer, topK) {
    const values = await layer.data();

    const valuesAndIndices = [];
    for (let i = 0; i < values.length; i++) {
      valuesAndIndices.push({value: values[i], index: i});
    }
    valuesAndIndices.sort((a, b) => {
      return b.value - a.value;
    });
    const topkValues = new Float32Array(topK);
    const topkIndices = new Int32Array(topK);
    for (let i = 0; i < topK; i++) {
      topkValues[i] = valuesAndIndices[i].value;
      topkIndices[i] = valuesAndIndices[i].index;
    }

    const topClassesAndProbs = [];
    for (let i = 0; i < topkIndices.length; i++) {
      topClassesAndProbs.push({
        className: IMAGENET_CLASSES[topkIndices[i]],
        probability: topkValues[i]
      })
    }
    return topClassesAndProbs;
  }

}

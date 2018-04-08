import * as tf from '@tensorflow/tfjs';
import { IMAGENET_CLASSES } from './utils/imagenet_classes';

export default class Chart{
  constructor(chartElement){
      this.chart = chartElement;
      this.options = {
        title: 'Predictions',
        width: 450,
        height: 450,
        legend: { position: "none" },
        hAxis: {
          minValue: 0,
          maxValue: 1
        },
      };
      this.optionsAnim = JSON.parse(JSON.stringify(this.options));
      this.optionsAnim.animation = { duration: 300,easing: 'out' };
  }
  drawAnimation(labels){
    const clonedLabels = JSON.parse(JSON.stringify(labels));
    this.draw(labels,false,this.options);
    this.draw(clonedLabels,true,this.optionsAnim);
  }
  draw(labels,anim,options){
    if(!anim){
      for(var i=0; i<labels.length; i++) labels[i].probability = 0;
    };
    var data = [['Label', 'Probability',]];
    labels.forEach((label) => {
      const { className, probability } = label;
      data.push([className,probability]);
    });
    data = google.visualization.arrayToDataTable(data);
    this.chart.draw(data, options);
  }
}

import * as tf from '@tensorflow/tfjs';
import { IMAGENET_CLASSES } from './utils/imagenet_classes';

export default class Chart{
  constructor(chartElement){
      this.chart = chartElement;
  }
  draw(labels){
    var data = [['Label', 'Probability',]];
    labels.forEach((label) => {
      const { className, probability } = label;
      data.push([className,probability]);
    });

    data = google.visualization.arrayToDataTable(data);

    var options = {
      title: 'Predictions',
      width: 400,
      height: 300,
      legend: { position: "none" },
    };
    this.chart.draw(data, options);
  }
}

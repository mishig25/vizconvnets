import * as tf from '@tensorflow/tfjs';
import { IMAGENET_CLASSES } from './utils/imagenet_classes';

export default class Chart{
  constructor(chartElement){
      this.chart = chartElement;
      this.options = {
        title: 'Predictions',
        width: 400,
        height: 300,
        legend: { position: "none" },
        hAxis: {
          minValue: 0,
          maxValue: 1
        },
      };
  }
  draw(labels){
    var data = [['Label', 'Probability',]];
    labels.forEach((label) => {
      const { className, probability } = label;
      data.push([className,probability]);
    });

    data = google.visualization.arrayToDataTable(data);
    this.chart.draw(data, this.options);
  }
}

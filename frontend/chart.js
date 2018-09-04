/**
 * Chart class for creating bar charts 
 * given predictions of ConvNet
 */
export default class Chart{

  /**
   * the class constructor
   * @param {HTMLElement} chartElement in which Google charts will be inserted
   */
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
  
  /**
   * Animates the chart
   * @param {array} labels values to be charted
   */
  drawAnimation(labels){
    const clonedLabels = JSON.parse(JSON.stringify(labels));
    this.draw(labels,false,this.options);
    this.draw(clonedLabels,true,this.optionsAnim);
  }

  /**
   * Update chart values and present it
   * @param {array} labels values to be charted
   * @param {boolean} anim whether to animate or no
   * @param {object} options indicating how the chart should look like
   */
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

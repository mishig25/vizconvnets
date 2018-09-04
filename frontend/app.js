import React from 'react';
import ReactDOM from 'react-dom';
import { markdown } from 'markdown';
const fs = require("fs");
import ReactLoading from 'react-loading';

import Model from './model';
import Engine from './engine';
import Chart from './chart';
import { getTopLabels } from './utils/imagenet_classes';
import styles from './styles.css'

import { IMAGE_URLS, getRandomImage } from './utils/sampleImages';

/**
 * React Component for runnign Tensorflow.js 
 * and visualizing ConvNets
 */
class App extends React.Component {

    /**
     * the class constructor
     * @param {args} props for the parent class
     */
    constructor(props){
        super(props);
        this.state = {
            random: true,
            loading : true
        }
    }

    /**
     * One of React's life cycle methods
     * Once the current React component is loaded, this function
     * initializes neural network model, graphics engine, and charts element.
     */
    async componentDidMount(){
        this.model = new Model();
        await this.model.loadModel();
        this.model.warmUp();
        this.setState({ loading: false });
        this.engine = new Engine(this.refs.renderArea);
        await this.initChart();
        this.refs.imgElement.setAttribute('crossorigin', 'anonymous');
        this.initImageUploads();
        const descContent = fs.readFileSync("./description.md", "utf-8");
        this.refs.description.innerHTML = markdown.toHTML(descContent);
        this.randomDemo();
    }

    /**
     * Runs random inference on the neural net model
     */
    randomDemo(){
        if(this.state.random){
            const imgPath = getRandomImage();
            this.runInference(imgPath);
            const self = this;
            setTimeout(() => { self.randomDemo() }, 3000);
        }
    }

    /**
     * Populate choose images option with options
     */
    initImageUploads(){
        const element = this.refs.sampleImages;
        IMAGE_URLS.forEach((sample) => {
            const option = document.createElement('option')
            option.setAttribute("value", sample.value);
            option.innerText = sample.text;
            element.appendChild(option);
        });
        element.addEventListener('change', this.predictSampleImage.bind(this), false);
        this.refs.file.addEventListener('change', this.predictUploadedImage.bind(this), false);
    }

    /**
     * Initializes the chart and attached it to DOM
     */
    async initChart(){
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        await google.charts.setOnLoadCallback(() => {
            const chartElement = new google.visualization.BarChart(this.refs.chart);
            this.chart = new Chart(chartElement);
        });
    }

    /**
     * Runs inference on the neural net model by passing the chosen sample image
     * @param {object} e contains chosen image information
     */
    predictSampleImage(e){
        this.state.random = false;
        this.runInference(e.target.value);
    }

    /**
     * Runs inference on the neural net model by passing the uploaded image
     * @param {object} evt contains uploaded file information
     */
    predictUploadedImage(evt){
        this.state.random = false;
        const reader = new FileReader();
        reader.onload = e => this.runInference(e.target.result);
        reader.readAsDataURL(evt.target.files[0]);
    }

    /**
     * Runs inference on the neural net
     * @param {string} imgPath indicates information of the image to run the inference on
     */
    runInference(imgPath){
        this.refs.imgElement.src = imgPath;
        const canvas = this.refs.helperCanvas;
        this.refs.imgElement.onload = async() => {
            if (!this.model.loaded) await model.loadModel();
            const preds = await this.model.predict(this.refs.imgElement);
            const layer1 = await this.model.getActivation(canvas, 0, 8);
            const layer2 = await this.model.getActivation(canvas, 1, 16);
            const layer3 = await this.model.getActivation(canvas, 2, 32);
            this.engine.renderChannels([layer1, layer2, layer3]);
            const labels = await getTopLabels(preds[3], 5);
            this.chart.drawAnimation(labels);
        }
    }

    /**
     * React Component's render method for rendering HTML components
     */
    render() {
        if (this.state.loading){
            return (
                <div id="container">
                    <h3 id="loadTitle">Tensorflow Model loading ...</h3>
                    <ReactLoading type="cylon" color="grey" height={'20%'} width={'20%'} />
                </div>
            );
        }
        return (
            <div id="container">
                <h1>Visualizing Convnet</h1>

                <div id="imgChooserContainer">
                    <label className="btn btn-primary">
                        <input type="file" id="file" ref="file" name="uploadImg" accept="image/*"/>
                        upload image
                    </label>
                    <label id="orLabel"> OR </label>
                    <select ref="sampleImages" className="btn btn-info">
                        <option value="" disabled selected>choose sample image</option>
                    </select>
                </div>

                <h5>*ConvNet is running live in your browser</h5>
                <div id="renderArea" ref="renderArea">
                    <img id="img" ref="imgElement" width={224} height={224} />
                </div>
                <div ref="chart"/>
                <div ref="description"/>
                <canvas id="helperCanvas" ref="helperCanvas" width={224} height={224}></canvas>
            </div>
        );
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('react-container')
);
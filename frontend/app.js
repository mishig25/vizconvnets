import React from 'react';
import ReactDOM from 'react-dom';
import { markdown } from 'markdown';
const fs = require("fs");

import Model from './model';
import Engine from './engine';
import styles from './styles.css'

import { IMAGE_URLS, getRandomImage } from './utils/sampleImages';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            random: true,
        }
    }
    async componentDidMount(){
        this.refs.imgElement.setAttribute('crossorigin', 'anonymous');
        this.initImageUploads();
        this.engine = new Engine();
        this.model = new Model();
        await this.model.loadModel();
        this.model.warmUp();
        this.randomDemo();
        const descContent = fs.readFileSync("./description.md", "utf-8");
        this.refs.description.innerHTML = markdown.toHTML(descContent);
    }
    randomDemo(){
        if(this.state.random){
            const imgPath = getRandomImage();
            this.predict(imgPath);
            const self = this;
            setTimeout(() => { self.randomDemo() }, 3000);
        }
    }
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
    predictSampleImage(e){
        this.state.random = false;
        this.predict(e.target.value);
    }
    predictUploadedImage(evt){
        this.state.random = false;
        const reader = new FileReader();
        reader.onload = e => this.predict(e.target.result);
        reader.readAsDataURL(evt.target.files[0]);
    }
    predict(imgPath){
        this.refs.imgElement.src = imgPath;
        const canvas = this.refs.helperCanvas;
        this.refs.imgElement.onload = async() => {
            if (!this.model.loaded) await model.loadModel();
            const preds = await this.model.predict(this.refs.imgElement);
            const layer1 = await this.model.getActivation(canvas, 0, 8);
            const layer2 = await this.model.getActivation(canvas, 1, 16);
            const layer3 = await this.model.getActivation(canvas, 2, 32);
            this.engine.renderChannels([layer1, layer2, layer3]);
        }
    }
    render() {
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
                <div id="renderArea">
                    <img id="img" ref="imgElement" width={224} height={224} />
                </div>
                <div ref="description"/>
                <canvas id="helperCanvas" ref="helperCanvas" width={224} height={224}></canvas>
            </div>
        );
    }
}


ReactDOM.render(
    <App name="Taylor" />,
    document.getElementById('react-container')
);
import React from 'react';
import ReactDOM from 'react-dom';

import Model from './model';
import Engine from './engine';

import { IMAGE_URLS, getRandomImage } from './utils/sampleImages';

class HelloMessage extends React.Component {
    async componentDidMount(){
        // console.log(this.refs.renderArea);
        this.engine = new Engine(this.refs.renderArea);
        this.model = new Model();
        await this.model.loadModel();
        this.model.warmUp();
        this.randomDemo();
        this.refs.imgElement.setAttribute('crossorigin', 'anonymous');
    }
    randomDemo(){
        const imgPath = getRandomImage();
        this.predict(imgPath);
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
            <div>
                <h1>Visualizing Convnet</h1>
                <h5>*ConvNet is running live in your browser</h5>
                <canvas ref="canvas" width={300} height={300} />
                <div id="renderArea" ref="renderArea">
                    <img id="img" ref="imgElement" width={224} height={224} crossorigin='anonymous'/>
                </div>
                <canvas id="helperCanvas" ref="helperCanvas" width={224} height={224}></canvas>
            </div>
        );
    }
}

ReactDOM.render(
    <HelloMessage name="Taylor" />,
    document.getElementById('react-container')
);
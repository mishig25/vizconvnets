# VizConvnets
### Visualizing Channels of 2D Convolutional Layers through [Tensorflow.js](https://js.tensorflow.org)
Independent Project

#### Live Demo: [https://mishig25.github.io/vizconvnets/](https://mishig25.github.io/vizconvnets/)

#### Description:
![alt text](https://github.com/mishig25/vizconvnets/raw/master/model/ss.png)

After [AlexNet](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf) won ImageNet 2012, popularity and usage of convnets have increased exponentially.
Visualizing channels/filters of conv layers turned out to be a powerful tool for analyzing how Convolutional Neural Networks work. [Zeiler and Fergus](https://arxiv.org/pdf/1311.2901.pdf) were one of the first people to visualize convnets throughly and went on to win ImageNet 2013.
Afterwards, there was a plethora of papers and demos about visualizing convnets, including [the popular one by Yosinski](http://yosinski.com/deepvis).

This project is a continuation of the convnet visualizing trend. By using Tensorflow.js and [MobileNet](https://arxiv.org/abs/1704.04861), an efficient CNN architecture, the project visualizes sample channels/filters from MobileNet and does so through web browser only.

### Contents of the repository:
* [Model](https://github.com/mishig25/vizconvnets/tree/master/model)
Activation model is created through Keras Functionall API in Jupyter Notebooks.
* [Frontend](https://github.com/mishig25/vizconvnets/tree/master/frontend)
Using Tensorflowjs and HTML5 Canvas to create a convnet visualizations in web-browser environemnt.

#### License
MIT

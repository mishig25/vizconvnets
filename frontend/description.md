After [AlexNet](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf) won ImageNet 2012, popularity and usage of convnets have increased exponentially.
Visualizing channels/filters of conv layers turned out to be a powerful tool for analyzing how Convolutional Neural Networks work. [Zeiler and Fergus](https://arxiv.org/pdf/1311.2901.pdf) were one of the first people to visualize convnets throughly and went on to win ImageNet 2013.
Afterwards, there was a plethora of papers and demos about visualizing convnets, including [the popular one by Yosinski](http://yosinski.com/deepvis).

This project is a continuation of the convnet visualizing trend. By using Tensorflow.js and [MobileNet](https://arxiv.org/abs/1704.04861), an efficient CNN architecture, the project visualizes sample channels/filters from MobileNet and does so live in your browser.

Circles and what layers being visualized:

* innermost circle: `conv_dw_1_relu` of MobileNet

* middle circle: `conv_dw_6_relu` of MobileNet

* outermost circle: `conv_dw_8_relu` of MobileNet

All these layers output feature maps that has formula: `relu(Depthwise Sep. Conv2d)`. From the demo, you can see the effectiveness of Depthwise Separable Convolutions: activations of different filters of a same Depthwise Sep. Conv2d layer differ greatly from one another because the inputs are fundamentally different (different channels), which allows the entire network learn more features, compared to normal Conv2d layers.

Source code is available at: [https://github.com/mishig25/vizconvnets](https://github.com/mishig25/vizconvnets)

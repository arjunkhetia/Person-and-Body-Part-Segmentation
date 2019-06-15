# Person & Body Part Segmentation (using TensorFlow.js with BodyPix Model)  ![Version][version-image]

![Linux Build][linuxbuild-image]
![Windows Build][windowsbuild-image]
![NSP Status][nspstatus-image]
![Test Coverage][coverage-image]
![Dependency Status][dependency-image]
![devDependencies Status][devdependency-image]

The quickest way to get start with Person & Body Part Segmentation (using TensorFlow.js with BodyPix Model), just clone the project:

```bash
$ git clone https://github.com/arjunkhetia/Person-and-Body-Part-Segmentation.git
```

Install dependencies:

```bash
$ npm install
```

Start the angular app at `http://localhost:4200/`:

```bash
$ npm start
```

## TensorFlow.js

[TensorFlow](https://www.tensorflow.org) is an open source software library for numerical computation using data flow graphs. The graph nodes represent mathematical operations, while the graph edges represent the multidimensional data arrays (tensors) that flow between them. [TensorFlow.js](https://www.tensorflow.org/js) is a library for developing and training ML models in JavaScript, and deploying in browser or on Node.js.

```ts
import * as tfjs from '@tensorflow/tfjs';
```

## BodyPix

This model can be used to segment an image into pixels that are and are not part of a person, and into pixels that belong to each of twenty-four body parts. It works for a single person, and its ideal use case is for when there is only one person centered in an input image or video. It can be combined with a person detector to segment multiple people in an image by first cropping boxes for each detected person then estimating segmentation in each of those crops.

This TensorFlow.js model does not require you to know about machine learning. It can take as input any browser-based image elements (<img>, <video>, <canvas> elements, for example) and returns an array of most likely predictions and their confidences.

### Person segmentation

```ts
import * as bodyPix from '@tensorflow-models/body-pix';

const outputStride = 16;
const segmentationThreshold = 0.5;

const imageElement = document.getElementById('image');

// load the BodyPix model from a checkpoint
const net = await bodyPix.load();

const segmentation = await net.estimatePersonSegmentation(imageElement, outputStride, segmentationThreshold);

console.log(segmentation);
```

### Body Part Segmentation

```ts
import * as bodyPix from '@tensorflow-models/body-pix';

const outputStride = 16;
const segmentationThreshold = 0.5;

const imageElement = document.getElementById('image');

// load the person segmentation model from a checkpoint
const net = await bodyPix.load();

const segmentation = await net.estimatePartSegmentation(imageElement, outputStride, segmentationThreshold);

console.log(segmentation);
```

# Image Mode -

### Person segmentation with Background Mask
![1](https://github.com/arjunkhetia/Person-and-Body-Part-Segmentation/blob/master/src/assets/1.png "1")

### Person segmentation with Person Mask
![2](https://github.com/arjunkhetia/Person-and-Body-Part-Segmentation/blob/master/src/assets/2.png "2")

### Body Part segmentation with color scale - Rainbow
![3](https://github.com/arjunkhetia/Person-and-Body-Part-Segmentation/blob/master/src/assets/3.png "3")

### Body Part segmentation with color scale - Warm
![4](https://github.com/arjunkhetia/Person-and-Body-Part-Segmentation/blob/master/src/assets/4.png "4")

### Body Part segmentation with color scale - Spectral
![5](https://github.com/arjunkhetia/Person-and-Body-Part-Segmentation/blob/master/src/assets/5.png "5")

### Body Part segmentation with Pixelation
![6](https://github.com/arjunkhetia/Person-and-Body-Part-Segmentation/blob/master/src/assets/6.png "6")

# Video Mode -

### Person Segmentation
![7](https://github.com/arjunkhetia/Person-and-Body-Part-Segmentation/blob/master/src/assets/7.png "7")

[version-image]: https://img.shields.io/badge/Version-1.0.0-orange.svg
[linuxbuild-image]: https://img.shields.io/badge/Linux-passing-brightgreen.svg
[windowsbuild-image]: https://img.shields.io/badge/Windows-passing-brightgreen.svg
[nspstatus-image]: https://img.shields.io/badge/nsp-no_known_vulns-blue.svg
[coverage-image]: https://img.shields.io/coveralls/expressjs/express/master.svg
[dependency-image]: https://img.shields.io/badge/dependencies-up_to_date-brightgreen.svg
[devdependency-image]: https://img.shields.io/badge/devdependencies-up_to_date-yellow.svg

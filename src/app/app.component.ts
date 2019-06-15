import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as bodyPix from '@tensorflow-models/body-pix';
import { Options, ChangeContext } from 'ng5-slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public multiplierArray: Array<number> = [1.00, 0.75, 0.50, 0.25];
  public multiplier: any = 0.75;
  public outputStrideArray: Array<number> = [8, 16, 32];
  public outputStride: any = 16;
  public segmentationThresholdOptions: Options = {
    floor: 0.0,
    ceil: 1,
    step: 0.01,
    showSelectionBar: true
  };
  public segmentationThreshold: any = 0.5;
  public opacityOptions: Options = {
    floor: 0,
    ceil: 1,
    step: 0.01,
    showSelectionBar: true
  };
  public opacity: any = 0.7;
  public maskBlurAmountOptions: Options = {
    floor: 0,
    ceil: 100,
    step: 0.1,
    showSelectionBar: true
  };
  public maskBlurAmount: any = 0;
  public edgeBlurAmountOptions: Options = {
    floor: 0,
    ceil: 100,
    step: 0.1,
    showSelectionBar: true
  };
  public edgeBlurAmount: any = 0;
  public pixelCellWidthOptions: Options = {
    floor: 0,
    ceil: 100,
    step: 0.1,
    showSelectionBar: true
  };
  public pixelCellWidth: any = 10.0;
  public segmentation: any = 'personsegmentation';
  public personSegmentationData: any;
  public bodyPartSegmentationData: any;
  public backgroundDarkeningMask: any;
  public flipHorizontal: any = false;
  public bokehEffect: any = false;
  public maskBackground: any = true;
  public colorScale: any = 'rainbow';
  public coloredPartImage: any;
  public pixelation: any = false;
  public title: string = 'Person & Body Part Segmentation';
  public introline: string = '(using TensorFlow.js with BodyPix Model)';
  public model: any;
  public modelLoaded: boolean = false;
  public imgBtnStatus: boolean = true;
  public webBtnStatus: boolean = false;
  public imageElement: any;
  public imageSrc: any = 'assets/person.jpg';
  public imageWidth: number = 410;
  public imageHeight: number = 310;
  public canvas: any;
  public canvasWidth: number = 400;
  public canvasHeight: number = 300;
  public canvasContext: any;
  public tempcanvas: any;
  public tempcanvasWidth: number = 398;
  public tempcanvasHeight: number = 298;
  public tempcanvasContext: any;
  @ViewChild('videoElement', {static: false}) videoElement: ElementRef;
  public video: any;
  public videoWidth: number = 410;
  public videoHeight: number = 310;
  public videoStream: any;
  public videoCanvas: any;
  public videoCanvasWidth: number = 410;
  public videoCanvasHeight: number = 310;
  public videoCanvasContext: any;
  public fileName: string = 'No File Chosen';
  public fileError: boolean = false;
  public realTimeMode: boolean = false;
  public animationFrame: any;
  public rainbow: any = [
    [110, 64, 170], [143, 61, 178], [178, 60, 178], [210, 62, 167],
    [238, 67, 149], [255, 78, 125], [255, 94, 99],  [255, 115, 75],
    [255, 140, 56], [239, 167, 47], [217, 194, 49], [194, 219, 64],
    [175, 240, 91], [135, 245, 87], [96, 247, 96],  [64, 243, 115],
    [40, 234, 141], [28, 219, 169], [26, 199, 194], [33, 176, 213],
    [47, 150, 224], [65, 125, 224], [84, 101, 214], [99, 81, 195]
  ];
  public warm: any = [
    [110, 64, 170], [106, 72, 183], [100, 81, 196], [92, 91, 206],
    [84, 101, 214], [75, 113, 221], [66, 125, 224], [56, 138, 226],
    [48, 150, 224], [40, 163, 220], [33, 176, 214], [29, 188, 205],
    [26, 199, 194], [26, 210, 182], [28, 219, 169], [33, 227, 155],
    [41, 234, 141], [51, 240, 128], [64, 243, 116], [79, 246, 105],
    [96, 247, 97],  [115, 246, 91], [134, 245, 88], [155, 243, 88]
  ];
  public spectral: any = [
    [158, 1, 66],    [181, 26, 71],   [202, 50, 74],   [219, 73, 74],
    [232, 94, 73],   [242, 117, 75],  [248, 142, 83],  [251, 167, 96],
    [253, 190, 112], [254, 210, 129], [254, 227, 149], [254, 240, 166],
    [251, 248, 176], [243, 249, 172], [231, 245, 163], [213, 238, 159],
    [190, 229, 160], [164, 218, 163], [137, 207, 165], [110, 192, 168],
    [86, 173, 174],  [70, 150, 179],  [67, 127, 180],  [77, 103, 173]
  ];

  public async ngOnInit() {
    this.model = await bodyPix.load();
    console.log('Model Loaded...');
    this.modelLoaded = true;
    setTimeout(() => {
      this.setSliderConfig();
    }, 1000);
  }

  public setSliderConfig() {
    this.segmentationThresholdOptions = {
      floor: 0.0,
      ceil: 1,
      step: 0.01,
      showSelectionBar: true
    };
    this.segmentationThreshold = 0.5;
    this.opacityOptions = {
      floor: 0,
      ceil: 1,
      step: 0.01,
      showSelectionBar: true
    };
    this.opacity = 0.7;
    this.maskBlurAmountOptions = {
      floor: 0,
      ceil: 100,
      step: 0.1,
      showSelectionBar: true
    };
    this.maskBlurAmount = 0;
    this.edgeBlurAmountOptions = {
      floor: 0,
      ceil: 100,
      step: 0.1,
      showSelectionBar: true
    };
    this.edgeBlurAmount = 0;
    this.pixelCellWidthOptions = {
      floor: 0,
      ceil: 100,
      step: 0.1,
      showSelectionBar: true
    };
    this.pixelCellWidth = 10.0;
  }

  public async imageMode() {
    if (this.webBtnStatus) {
      await this.stopVideo();
      await cancelAnimationFrame(this.animationFrame);
      this.realTimeMode = false;
      this.imageSrc = 'assets/white.jpg';
      this.imgBtnStatus = true;
      this.webBtnStatus = false;
      this.canvas = await document.getElementById("canvas");
      this.canvas.width = await this.canvas.width;
      this.tempcanvas = await document.getElementById("tempcanvas");
      this.tempcanvas.width = await this.tempcanvas.width;
    }
  }

  public async videoMode() {
    if (this.imgBtnStatus) {
      await cancelAnimationFrame(this.animationFrame);
      this.realTimeMode = false;
      this.fileName = 'No File Chosen';
      this.imageSrc = 'assets/white.jpg';
      this.webBtnStatus = true;
      this.imgBtnStatus = false;
      this.initCamera();
      this.canvas = await document.getElementById("canvas");
      this.canvas.width = await this.canvas.width;
      this.tempcanvas = await document.getElementById("tempcanvas");
      this.tempcanvas.width = await this.tempcanvas.width;
    }
  }

  public initCamera() {
    this.video = this.videoElement.nativeElement;
    let constraints = { audio: false, video: { width: 410, height: 310 } };
    navigator.mediaDevices.getUserMedia(constraints).then((stream: any) => {
      if(!stream.stop && stream.getTracks) {
        stream.stop = function(){
          this.getTracks().forEach(function (track: any) {
            track.stop();
          });
        };
      }
      this.videoStream = stream;
      try {
        this.video.srcObject = this.videoStream;
      } catch(err) {
        this.video.src = window.URL.createObjectURL(this.videoStream);
      }
      this.video.play();
    });
  }

  public stopVideo() {
    this.videoStream.stop();
  }

  public async snapPhoto() {
    await cancelAnimationFrame(this.animationFrame);
    this.realTimeMode = false;
    this.tempcanvas = await document.getElementById("tempcanvas");
    this.tempcanvasContext = await this.tempcanvas.getContext("2d");
    this.tempcanvas.width = await this.tempcanvas.width;
    await this.tempcanvasContext.drawImage(this.video, 0, 0, this.tempcanvasWidth, this.tempcanvasHeight);
    if (this.segmentation === 'personsegmentation') {
      this.snapPersonSegmentation();
    } else {
      this.snapBodyPartSegmentation();
    }
  }

  public async realTimeVideo() {
    this.realTimeMode = true;
    if (this.segmentation === 'personsegmentation') {
      await this.model.estimatePersonSegmentation(
        this.video, this.outputStride, this.segmentationThreshold
      ).then((personSegmentationData: any) => {
          this.renderPersonSegmentation(personSegmentationData);
          this.animationFrame = requestAnimationFrame(() => {
            this.realTimeVideo();
          });
      });
    } else {
      await this.model.estimatePartSegmentation(
        this.video, this.outputStride, this.segmentationThreshold
      ).then((bodyPartSegmentationData: any) => {
          this.renderBodyPartSegmentation(bodyPartSegmentationData);
          this.animationFrame = requestAnimationFrame(() => {
            this.realTimeVideo();
          });
      });
    }
  }

  public async renderPersonSegmentation(personSegmentationData: any) {
    this.videoCanvas = await <HTMLCanvasElement> document.getElementById("videoCanvas");
    this.videoCanvasContext = await this.videoCanvas.getContext("2d");
    await this.videoCanvasContext.drawImage(this.video, 0, 0, this.videoCanvasWidth, this.videoCanvasHeight);
    this.backgroundDarkeningMask = await bodyPix.toMaskImageData(personSegmentationData, this.maskBackground);
    if (this.bokehEffect) {
      bodyPix.drawBokehEffect(this.videoCanvas, this.video, personSegmentationData, this.maskBlurAmount, this.edgeBlurAmount, this.flipHorizontal);
    } else {
      bodyPix.drawMask(this.videoCanvas, this.video, this.backgroundDarkeningMask, this.opacity, this.maskBlurAmount, this.flipHorizontal);
    }
  }

  public async renderBodyPartSegmentation(bodyPartSegmentationData: any) {
    this.videoCanvas = await <HTMLCanvasElement> document.getElementById("videoCanvas");
    this.videoCanvasContext = await this.videoCanvas.getContext("2d");
    await this.videoCanvasContext.drawImage(this.video, 0, 0, this.videoCanvasWidth, this.videoCanvasHeight);
    this.backgroundDarkeningMask = await bodyPix.toMaskImageData(bodyPartSegmentationData, this.maskBackground);
    if (this.colorScale === 'rainbow') {
      this.coloredPartImage = await bodyPix.toColoredPartImageData(bodyPartSegmentationData, this.rainbow);
    } else if (this.colorScale === 'warm') {
      this.coloredPartImage = await bodyPix.toColoredPartImageData(bodyPartSegmentationData, this.warm);
    } else if (this.colorScale === 'spectral') {
      this.coloredPartImage = await bodyPix.toColoredPartImageData(bodyPartSegmentationData, this.spectral);
    }
    if (this.pixelation) {
      bodyPix.drawPixelatedMask(this.videoCanvas, this.video, this.coloredPartImage, this.opacity, this.maskBlurAmount, this.flipHorizontal, this.pixelCellWidth);
    } else {
      bodyPix.drawMask(this.videoCanvas, this.video, this.coloredPartImage, this.opacity, this.maskBlurAmount, this.flipHorizontal);
    }
  }

  public async onMultiplierChange(multiplier: any) {
    this.multiplier = multiplier;
  }

  public async loadModel() {
    this.modelLoaded = false;
    let multiplier: any = parseFloat(this.multiplier);
    this.model = await bodyPix.load(multiplier);
    this.modelLoaded = true;
  }

  public Segmentation() {
    if (this.segmentation === 'personsegmentation') {
      this.personSegmentation();
    } else {
      this.bodyPartSegmentation();
    }
  }

  public onSegmentationChange(segmentation: any) {
    this.segmentation = segmentation;
    if (!this.realTimeMode) {
      if (this.imgBtnStatus) {
        if (this.segmentation === 'personsegmentation') {
          this.personSegmentation();
        } else {
          this.bodyPartSegmentation();
        }
      } else {
        if (this.segmentation === 'personsegmentation') {
          this.snapPersonSegmentation();
        } else {
          this.snapBodyPartSegmentation();
        }
      }
    }
  }

  public onFlipHorizontalChanged() {
    this.flipHorizontal = !this.flipHorizontal;
    if (!this.realTimeMode) {
      if (this.imgBtnStatus) {
        if (this.segmentation === 'personsegmentation') {
          this.personSegmentation();
        } else {
          this.bodyPartSegmentation();
        }
      } else {
        if (this.segmentation === 'personsegmentation') {
          this.snapPersonSegmentation();
        } else {
          this.snapBodyPartSegmentation();
        }
      }
    }
  }

  public onOutputStrideChange(outputstride: any) {
    this.outputStride = parseInt(outputstride);
    if (!this.realTimeMode) {
      if (this.imgBtnStatus) {
        if (this.segmentation === 'personsegmentation') {
          this.personSegmentation();
        } else {
          this.bodyPartSegmentation();
        }
      } else {
        if (this.segmentation === 'personsegmentation') {
          this.snapPersonSegmentation();
        } else {
          this.snapBodyPartSegmentation();
        }
      }
    }
  }

  public onSegmentationThresholdChanged(changeContext: ChangeContext) {
    this.segmentationThreshold = changeContext['value'];
    if (!this.realTimeMode) {
      if (this.imgBtnStatus) {
        if (this.segmentation === 'personsegmentation') {
          this.personSegmentation();
        } else {
          this.bodyPartSegmentation();
        }
      } else {
        if (this.segmentation === 'personsegmentation') {
          this.snapPersonSegmentation();
        } else {
          this.snapBodyPartSegmentation();
        }
      }
    }
  }

  public onMaskBackgroundChanged() {
    this.maskBackground = !this.maskBackground;
    if (!this.realTimeMode) {
      if (this.imgBtnStatus) {
        if (this.segmentation === 'personsegmentation') {
          this.personSegmentation();
        } else {
          this.bodyPartSegmentation();
        }
      } else {
        if (this.segmentation === 'personsegmentation') {
          this.snapPersonSegmentation();
        } else {
          this.snapBodyPartSegmentation();
        }
      }
    }
  }

  public onOpacityChanged(changeContext: ChangeContext) {
    this.opacity = changeContext['value'];
    if (!this.realTimeMode) {
      if (this.imgBtnStatus) {
        if (this.segmentation === 'personsegmentation') {
          this.personSegmentation();
        } else {
          this.bodyPartSegmentation();
        }
      } else {
        if (this.segmentation === 'personsegmentation') {
          this.snapPersonSegmentation();
        } else {
          this.snapBodyPartSegmentation();
        }
      }
    }
  }

  public onMaskBlurAmountChanged(changeContext: ChangeContext) {
    this.maskBlurAmount = changeContext['value'];
    if (!this.realTimeMode) {
      if (this.imgBtnStatus) {
        if (this.segmentation === 'personsegmentation') {
          this.personSegmentation();
        } else {
          this.bodyPartSegmentation();
        }
      } else {
        if (this.segmentation === 'personsegmentation') {
          this.snapPersonSegmentation();
        } else {
          this.snapBodyPartSegmentation();
        }
      }
    }
  }

  public onBokehEffectChanged() {
    this.bokehEffect = !this.bokehEffect;
    if (!this.realTimeMode) {
      if (this.imgBtnStatus) {
        if (this.segmentation === 'personsegmentation') {
          this.personSegmentation();
        }
      } else {
        if (this.segmentation === 'personsegmentation') {
          this.snapPersonSegmentation();
        }
      }
    }
  }

  public onEdgeBlurAmountChanged(changeContext: ChangeContext) {
    this.edgeBlurAmount = changeContext['value'];
    if (!this.realTimeMode) {
      if (this.imgBtnStatus) {
        if (this.segmentation === 'personsegmentation' && this.bokehEffect) {
          this.personSegmentation();
        }
      } else {
        if (this.segmentation === 'personsegmentation' && this.bokehEffect) {
          this.snapPersonSegmentation();
        }
      }
    }
  }

  public onColorScaleChange(colorscale: any) {
    this.colorScale = colorscale;
    if (!this.realTimeMode) {
      if (this.imgBtnStatus) {
        if (this.segmentation === 'bodypartsegmentation') {
          this.bodyPartSegmentation();
        }
      } else {
        if (this.segmentation === 'bodypartsegmentation') {
          this.snapBodyPartSegmentation();
        }
      }
    }
  }

  public onPixelationChanged() {
    this.pixelation = !this.pixelation;
    if (!this.realTimeMode) {
      if (this.imgBtnStatus) {
        if (this.segmentation === 'bodypartsegmentation') {
          this.bodyPartSegmentation();
        }
      } else {
        if (this.segmentation === 'bodypartsegmentation') {
          this.snapBodyPartSegmentation();
        }
      }
    }
  }

  public onPixelCellWidthChanged(changeContext: ChangeContext) {
    this.pixelCellWidth = changeContext['value'];
    if (!this.realTimeMode) {
      if (this.imgBtnStatus) {
        if (this.segmentation === 'bodypartsegmentation') {
          this.bodyPartSegmentation();
        }
      } else {
        if (this.segmentation === 'bodypartsegmentation') {
          this.snapBodyPartSegmentation();
        }
      }
    }
  }

  public async personSegmentation() {
    if (this.imageSrc !== 'assets/white.jpg') {
      this.imageElement = await document.getElementById('image');
      this.tempcanvas = await document.getElementById("tempcanvas");
      this.tempcanvasContext = await this.tempcanvas.getContext("2d");
      await this.tempcanvasContext.clearRect(0, 0, this.tempcanvasWidth, this.tempcanvasHeight);
      await this.tempcanvasContext.drawImage(this.imageElement, 0, 0, this.tempcanvasWidth, this.tempcanvasHeight);
      this.personSegmentationData = await this.model.estimatePersonSegmentation(
        this.imageElement, this.outputStride, this.segmentationThreshold
      );
      this.backgroundDarkeningMask = await bodyPix.toMaskImageData(this.personSegmentationData, this.maskBackground);
      this.canvas = document.getElementById("canvas");
      if (this.bokehEffect) {
        bodyPix.drawBokehEffect(this.canvas, this.tempcanvas, this.personSegmentationData, this.maskBlurAmount, this.edgeBlurAmount, this.flipHorizontal);
      } else {
        bodyPix.drawMask(this.canvas, this.tempcanvas, this.backgroundDarkeningMask, this.opacity, this.maskBlurAmount, this.flipHorizontal);
      }
    }
  }

  public async snapPersonSegmentation() {
    this.canvas = await document.getElementById("canvas");
    this.canvasContext = await this.canvas.getContext("2d");
    this.tempcanvas = await document.getElementById("tempcanvas");
    await this.canvasContext.drawImage(this.tempcanvas, 0, 0, this.canvasWidth, this.canvasHeight);
    this.personSegmentationData = await this.model.estimatePersonSegmentation(
      this.canvas, this.outputStride, this.segmentationThreshold
    );
    this.backgroundDarkeningMask = await bodyPix.toMaskImageData(this.personSegmentationData, this.maskBackground);
    if (this.bokehEffect) {
      bodyPix.drawBokehEffect(this.canvas, this.tempcanvas, this.personSegmentationData, this.maskBlurAmount, this.edgeBlurAmount, this.flipHorizontal);
    } else {
      bodyPix.drawMask(this.canvas, this.tempcanvas, this.backgroundDarkeningMask, this.opacity, this.maskBlurAmount, this.flipHorizontal);
    }
  }

  public async bodyPartSegmentation() {
    if (this.imageSrc !== 'assets/white.jpg') {
      this.imageElement = await document.getElementById('image');
      this.tempcanvas = await document.getElementById("tempcanvas");
      this.tempcanvasContext = await this.tempcanvas.getContext("2d");
      await this.tempcanvasContext.clearRect(0, 0, this.tempcanvasWidth, this.tempcanvasHeight);
      await this.tempcanvasContext.drawImage(this.imageElement, 0, 0, this.tempcanvasWidth, this.tempcanvasHeight);
      this.bodyPartSegmentationData = await this.model.estimatePartSegmentation(
        this.imageElement, this.outputStride, this.segmentationThreshold
      );
      if (this.colorScale === 'rainbow') {
        this.coloredPartImage = await bodyPix.toColoredPartImageData(this.bodyPartSegmentationData, this.rainbow);
      } else if (this.colorScale === 'warm') {
        this.coloredPartImage = await bodyPix.toColoredPartImageData(this.bodyPartSegmentationData, this.warm);
      } else if (this.colorScale === 'spectral') {
        this.coloredPartImage = await bodyPix.toColoredPartImageData(this.bodyPartSegmentationData, this.spectral);
      }
      if (this.pixelation) {
        bodyPix.drawPixelatedMask(this.canvas, this.tempcanvas, this.coloredPartImage, this.opacity, this.maskBlurAmount, this.flipHorizontal, this.pixelCellWidth);
      } else {
        bodyPix.drawMask(this.canvas, this.tempcanvas, this.coloredPartImage, this.opacity, this.maskBlurAmount, this.flipHorizontal);
      }
    }
  }

  public async snapBodyPartSegmentation() {
    this.canvas = await document.getElementById("canvas");
    this.canvasContext = await this.canvas.getContext("2d");
    this.tempcanvas = await document.getElementById("tempcanvas");
    await this.canvasContext.drawImage(this.tempcanvas, 0, 0, this.canvasWidth, this.canvasHeight);
    this.bodyPartSegmentationData = await this.model.estimatePartSegmentation(
      this.canvas, this.outputStride, this.segmentationThreshold
    );
    if (this.colorScale === 'rainbow') {
      this.coloredPartImage = await bodyPix.toColoredPartImageData(this.bodyPartSegmentationData, this.rainbow);
    } else if (this.colorScale === 'warm') {
      this.coloredPartImage = await bodyPix.toColoredPartImageData(this.bodyPartSegmentationData, this.warm);
    } else if (this.colorScale === 'spectral') {
      this.coloredPartImage = await bodyPix.toColoredPartImageData(this.bodyPartSegmentationData, this.spectral);
    }
    if (this.pixelation) {
      bodyPix.drawPixelatedMask(this.canvas, this.tempcanvas, this.coloredPartImage, this.opacity, this.maskBlurAmount, this.flipHorizontal, this.pixelCellWidth);
    } else {
      bodyPix.drawMask(this.canvas, this.tempcanvas, this.coloredPartImage, this.opacity, this.maskBlurAmount, this.flipHorizontal);
    }
  }

  public browseFile(files: any) {
    if (files.length === 0) {
      return;
    } else {
      let mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.fileError = true;
        return;
      } else {
        this.fileError = false;
        this.fileName = files[0].name;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
          this.imageSrc = reader.result;
        }
      }
    }
  }

}

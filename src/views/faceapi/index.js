import React, { Component } from "react";
import * as faceapi from "face-api";
import "./index.css";
const photos = [
  "./images/commit.jpg",
  "./images/huo.jpg",
  "./images/faces.jpg",
  "./images/3-boy.jpg",
  "./images/3-uphand-boy.jpg"
];
export default class index extends Component {
  state = {
    photo: photos[0],
    index: 0,
    faceCount: 0,
    calculateTime: 0,
    image: {}
  };

  async componentDidMount() {
    await faceapi.loadTinyFaceDetectorModel("./weights/");
    console.log(1, faceapi.nets);
    this.detectFace();
  }
  detectFace = async () => {
    const { image } = this.state;
    console.log(4, image);
    var beginTime = +new Date();
    const detections = await faceapi.detectAllFaces(
      this.refs.image,
      new faceapi.TinyFaceDetectorOptions()
    );

    var endTime = +new Date();
    console.log("排序用时共计" + (endTime - beginTime) + "ms");
    console.log(2, detections);
    this.setState({
      faceCount: detections.length,
      calculateTime: endTime - beginTime
    });

    const boxes = detections.map(item => {
      return item.forSize(image.width, image.height);
    });
    console.log(5, boxes);
    faceapi.drawDetection(this.refs.canvas, boxes, { withScore: false });
  };
  changePhoto = () => {
    let { index } = this.state;
    index++;
    if (index === photos.length) {
      index = 0;
    }
    this.setState({
      photo: photos[index]
    });
    this.state.index = index;

    this.detectFace();
  };

  onImageLoad = ({ target: img }) => {
    let { image } = this.state;
    image.width = img.offsetWidth;
    image.height = img.offsetHeight;
    this.setState({
      image
    });
    this.detectFace();
  };
  render() {
    const { faceCount, calculateTime, index, image } = this.state;
    return (
      <div>
        <h2>Face-api Demo</h2>
        <button
          onClick={() => {
            this.changePhoto();
          }}
        >
          点击切换
        </button>
        <div>
          第<span>{index + 1}</span>张照片 检测到<span>{faceCount}</span>张人脸
          共用时
          <span>{calculateTime}</span> ms
        </div>
        <div className="canvas-container">
          <img
            alt=""
            src={photos[index]}
            onLoad={this.onImageLoad}
            ref="image"
          />

          <canvas width={image.width} height={image.height} ref="canvas" />
        </div>
      </div>
    );
  }
}

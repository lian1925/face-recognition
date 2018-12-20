import React, { Component } from "react";
import tracking from "@/build/tracking";
import "./index.css";
require("@/build/data/face");
require("@/build/data/eye");

const photo = require("@/images/commit.jpg");
const photos = [
  "./images/commit.jpg",
  "./images/huo.jpg",
  "./images/faces.jpg",
  "./images/3-boy.jpg",
  "./images/3-uphand-boy.jpg"
];
export default class index extends Component {
  state = {
    tracker: {},
    index: 4,
    image: {},
    faceCount: 0
  };
  async componentDidMount() {}

  onImageLoad = ({ target: img }) => {
    let { image } = this.state;
    image.width = img.offsetWidth;
    image.height = img.offsetHeight;
    this.setState({
      image
    });
    this.initRracker();
  };
  initRracker = () => {
    let { tracker } = this.state;

    var beginTime = +new Date();
    tracker = new tracking.ObjectTracker(["face"]);
    tracker.setStepSize(1.3);
    tracking.track(this.refs.image, tracker);

    tracker.on("track", event => {
      var endTime = +new Date();
      this.setState({
        faceCount: event.data.length,
        calculateTime: endTime - beginTime
      });
      let context = this.refs.canvas.getContext("2d");
      context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

      event.data.forEach(function(rect) {
        context.strokeStyle = "blue";
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = "11px Helvetica";
        context.fillStyle = "#fff";
        context.fillText(
          "x: " + rect.x + "px",
          rect.x + rect.width + 5,
          rect.y + 11
        );
        context.fillText(
          "y: " + rect.y + "px",
          rect.x + rect.width + 5,
          rect.y + 22
        );
      });
    });
  };
  changePhoto = () => {
    let { index } = this.state;
    index++;
    if (index === photos.length) {
      index = 0;
    }
    this.setState({
      index
    });

    this.initRracker();
  };
  render() {
    const { index, image, faceCount, calculateTime } = this.state;
    return (
      <div>
        <h2>Tracking.js Demo</h2>
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

import React, { Component } from "react";
import * as faceapi from "face-api";
import tracking from "@/build/tracking";
import "./index.css";
require("@/build/data/face");
require("@/build/data/eye");

let tracker = new tracking.ObjectTracker(["face"]);
export default class index extends Component {
  async componentDidMount() {
    tracker.setStepSize(1.7);
    tracking.track(this.refs.image2, tracker);
    tracker.on("track", event => {
      let context = this.refs.canvas.getContext("2d");
      context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
      event.data.forEach(function(rect) {
        context.strokeStyle = "#a64ceb";
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
    console.log(0, tracking);
    console.log(0.5, tracker);
    await faceapi.loadTinyFaceDetectorModel("./weights/tyny/");
    console.log(1, faceapi.nets);
    var beginTime = +new Date();
    const detections = await faceapi.detectAllFaces(
      this.refs.image,
      new faceapi.TinyFaceDetectorOptions()
    );
    var endTime = +new Date();
    console.log("排序用时共计" + (endTime - beginTime) + "ms");
    console.log(2, detections);
  }

  render() {
    return (
      <div>
        <h2>Home Face api</h2>
        <img
          src="./images/commit.jpg"
          alt=""
          width="121"
          height="140"
          ref="image"
        />
        <img
          src="./images/commit.jpg"
          alt=""
          width="1024"
          height="672"
          ref="image1"
        />
        <img
          src="./images/huo.jpg"
          alt=""
          width="125"
          height="168"
          ref="image2"
        />
        <img
          src="./images/faces.jpg"
          width="320"
          height="240"
          alt=""
          ref="photo"
        />
        <canvas ref="canvas" width="125" height="168" />
      </div>
    );
  }
}

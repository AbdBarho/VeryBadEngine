const ASPECT_RATIO = 16 / 9;

export default class ResizableCanvas {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let min = Math.min(width, height);
    if (min === width) {
      height = Math.min(height, Math.floor(width / ASPECT_RATIO));
      width = Math.floor(height * ASPECT_RATIO);
    } else {
      width = Math.min(width, Math.floor(height * ASPECT_RATIO));
      height = Math.floor(width / ASPECT_RATIO);
    }
    this.canvas.width = width;
    this.canvas.height = height;
  }

  getContext() {
    return this.canvas.getContext("2d");
  }


}

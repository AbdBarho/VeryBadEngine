export default function measureFPS(time = 500): Promise<number> {
  return new Promise(resolve => {
    let totalTime = 0;
    let numFrames = 1;
    let lastFrameTime = performance.now();
    const nextFrame = (currentFrameTime: number) => {
      // const currentFrameTime = performance.now();
      numFrames++;
      totalTime += (currentFrameTime - lastFrameTime);
      if (totalTime > time)
        return resolve(numFrames * 1000 / totalTime);
      lastFrameTime = currentFrameTime;
      requestAnimationFrame(nextFrame);
    }
    requestAnimationFrame(nextFrame);
  });
}

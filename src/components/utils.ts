const getOpacity = (beginFrame: number, endFrame: number, currentFrame: number) => {
  // example:
  // whole = 1
  // end frame = 10
  // start frame = 5
  // current frame = 4
  // 1 / (10 - 5) * 4
  // 1 / 5 * 4
  // 0.2 * 4
  // opacity = 0.8
  const whole = 1
  return whole / (endFrame - beginFrame) * (currentFrame - beginFrame) + ""
}

export {
  getOpacity
}
export function isEmpty(obj: any) {
  for (let _ in obj)
    return false;
  return true;
}

export function delay(callback: any) {
  return setTimeout(callback, 0);
  // return requestAnimationFrame(callback);
}

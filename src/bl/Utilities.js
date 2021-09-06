export function areOpposite(angle1, angle2) {
  return Math.abs(angle2 - angle1) === Math.PI;
}

export function getDistantPoint(sourcePoint, distance, angle) {
  const x = sourcePoint.x + distance * Math.sin(angle);
  const y = sourcePoint.y + distance * Math.cos(angle);
  return { x, y };
} // TODO: check correctness

export function getDistance(point1, point2) {
  const dY = point2.y - point1.y;
  const dX = point2.x - point1.x;
  return Math.sqrt(dY ** 2 + dX ** 2);
}

export function getAngle(point1, point2) {
  const dY = point2.y - point1.y;
  const dX = point2.x - point1.x;
  const angle = Math.atan(dX / dY);
  /* get positive represntation of angle in case of negative */
  const absoluteAngle = angle >= 0 ? angle : angle + Math.PI;
  /* get angle in case of reverse direction, TODO: make cleaner? */
  if (dX < 0) {
    return absoluteAngle + Math.PI;
  } else if (dX === 0) {
    return dY > 0 ? 0 : Math.PI;
  } else {
    return absoluteAngle;
  }
}

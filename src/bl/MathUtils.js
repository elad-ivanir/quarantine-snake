export function areOpposite(angle1, angle2) {
  return floatEquals(Math.abs(angle2 - angle1), Math.PI);
}

export function createDistantPoint(sourcePoint, distance, angle) {
  const x = sourcePoint.x + distance * Math.sin(angle);
  const y = sourcePoint.y + distance * Math.cos(angle);
  return { x, y };
} // TODO: function NOT correct!

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
  /* get angle in case of reverse direction */
  if (dX < 0) {
    return absoluteAngle + Math.PI;
  } else if (dX === 0) {
    return dY > 0 ? 0 : Math.PI;
  } else {
    return absoluteAngle;
  }
}

export function lineIncludesPoint(linePoint1, linePoint2, otherPoint) {
  return floatEquals(
    getDistance(linePoint1, linePoint2),
    getDistance(linePoint1, otherPoint) + getDistance(otherPoint, linePoint2)
  );
}

export function floatEquals(float1, float2) {
  const precision = 12;
  return (
    parseFloat(float1).toPrecision(precision) ===
    parseFloat(float2).toPrecision(precision)
  );
}

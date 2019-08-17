export function noop() {}

export function toArray(list) {
  if (!(list instanceof NodeList || list instanceof HTMLCollection)) return [list];
  return Array.prototype.slice.call(list);
}

export function assign(target, ...rest) {
  rest.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      target[key] = obj[key]; // eslint-disable-line no-param-reassign
    });
  });
  return target;
}

export function css(element, properties) {
  if (typeof properties === 'string') {
    return window.getComputedStyle(element)[properties];
  }

  Object.keys(properties).forEach((key) => {
    const value = properties[key];
    element.style[key] = value; // eslint-disable-line no-param-reassign
  });

  return undefined;
}

export function addClass(el, className) {
  const classNameAry = className.split(' ');

  if (classNameAry.length > 1) {
    classNameAry.forEach(classItem => addClass(el, classItem));
  } else if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ` ${className}`; // eslint-disable-line no-param-reassign
  }
}

export function removeClass(el, className) {
  const classNameAry = className.split(' ');
  if (classNameAry.length > 1) {
    classNameAry.forEach(classItem => removeClass(el, classItem));
  } else if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' '); // eslint-disable-line no-param-reassign
  }
}

export function remove(nodes) {
  toArray(nodes).forEach((el) => {
    el.parentNode.removeChild(el);
  });
}

export function createDom(str) {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.children[0];
}

// return height and angle for lines
export function getLengthAngle(x1, x2, y1, y2) {
  const xDiff = x2 - x1;


  const yDiff = y2 - y1;

  return {
    length: Math.ceil(Math.sqrt(xDiff * xDiff + yDiff * yDiff)),
    angle: Math.round((Math.atan2(yDiff, xDiff) * 180) / Math.PI),
  };
}

export function canAddPoint(last, next) {
  switch (last) {
    case 1:
      return [2, 4, 5].indexOf(next) !== -1
    case 2:
      return [1, 3, 4, 5, 6].indexOf(next) !== -1
    case 3:
      return [2, 5, 6].indexOf(next) !== -1
    case 4:
      return [1, 2, 5, 7, 8].indexOf(next) !== -1
    case 5:
      return [1, 2, 3, 4, 6, 7, 8, 9].indexOf(next) !== -1
    case 6:
      return [2, 3, 5, 8, 9].indexOf(next) !== -1
    case 7:
      return [4, 5, 8].indexOf(next) !== -1
    case 8:
      return [4, 5, 6, 7, 9].indexOf(next) !== -1
    case 9:
      return [5, 6, 8].indexOf(next) !== -1
  }
}
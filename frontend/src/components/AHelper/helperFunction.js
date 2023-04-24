import defaultPic from './default-pin-pic.png'

export const defaultImage = (e) => {
  e.target.onerror = null;
  e.target.src = defaultPic;
};

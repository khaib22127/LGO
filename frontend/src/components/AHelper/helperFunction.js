import defaultPic from './default-pin-pic.png'

export const defaultImage = (e) => {
  e.target.src = defaultPic;
  e.target.onerror = null;
};

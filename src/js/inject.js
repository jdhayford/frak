import '../img/icon-34.png';
import Controller from './inject/Controller';
import { selectVideoPrompt, closeToasts } from './inject/toaster';

const SELECT_TIME_LIMIT = 5*1000;
const FRAK_PURPLE = '#6700CD';
const frakAttr = 'frak-listener';

let watchedVideos = [];
let videoListeners = {};
let promptTimeout = null;
let closeToast = null;

const selectionStyle = (el) => {
  el.style.cursor = 'copy';
  el.style.outlineOffset = `-2px`;
  el.style.outline = `5px solid ${FRAK_PURPLE}`;
  el.style.cursor = 'copy';
}

const normalStyle = (el) => {
  el.style.outline = 'none';
  el.style.cursor = '';
}

const resetVideos = () => {
  watchedVideos.forEach(video => {
    normalStyle(video);
    video.removeEventListener('click', videoListeners[video.id]);
    video.setAttribute(frakAttr, false);  
  });

  watchedVideos = [];
  videoListeners = {};
};

const main = async () => {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    const isListening = video.getAttribute(frakAttr);
    selectionStyle(video);

    if (!isListening) {
      video.setAttribute(frakAttr, true);

      const handleClick = () => {
        resetVideos();
        closeToasts();
        new Controller(video).start();
      };

      video.addEventListener('click', handleClick);
      watchedVideos.push(video);
      videoListeners[video.id] = handleClick;
    }
  });

  // Prompt user to select video with expiration
  selectVideoPrompt(SELECT_TIME_LIMIT, () => resetVideos());
};

try {
  main();
} catch (e) {
  console.log(`Frak Error: ${e}`);
}
import './contentScript/ready';
import injectScript from './contentScript/injectScript';
import BuildTracker from './contentScript/BuildTracker';
import MessageType from './inject/MessageType';
import { downloadBlob } from './inject/downloadBlob';

const frakAttr = 'frak-listener';

const setUpRecorder = video => {
  const stream = video.captureStream();
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm',
  });

  const recordedChunks = [];
  mediaRecorder.ondataavailable = (blobEvent) => {
    console.log(blobEvent)
    recordedChunks.push(blobEvent.data);
  };
  mediaRecorder.onstop = () => {
    if (window.confirm('Would you like to download this video?')) {
      downloadBlob(recordedChunks);
    };
  };
  mediaRecorder.onwarning = (a) => console.log(a);

  video.onplay = () => {
    mediaRecorder.start();
    video.style.border = '1px solid red';

    video.onpause = () => {
      mediaRecorder.stop();
      video.style.border = '1px solid green';
      setTimeout(() => video.style.border = '1px solid green', 5000);
    };
  };
}

const main = async () => {
  const videos = document.querySelectorAll('video');
  videos.forEach(vid => {
    const isListening = vid.getAttribute(frakAttr);
    vid.style.border = '1px solid blue';
    vid.style.cursor = 'copy';
    vid.style.boxSizing = 'border-box';

    if (!isListening) {
      vid.setAttribute(frakAttr, true);  
      vid.addEventListener('click', event => {
        vid.style.border = '1px solid orange';
        vid.style.cursor = '';
        setUpRecorder(vid);
      });
    }
  })
};

try {
  main();
} catch (e) {
  console.log(`Frak Error: ${e}`);
}
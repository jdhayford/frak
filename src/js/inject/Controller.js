import { downloadBlob } from './downloadBlob';
import { recordingStyle, normalStyle, waitingStyle, doneStyle } from './styler';

class Controller {
  constructor(video) {
    this.video = video;
    this.mediaRecorder = new MediaRecorder(video.captureStream(), { mimeType: 'video/webm' });
    this.chunkList = [];

    this.dataAvailableHandler = null;
    this.stopHandler = null;
    this.playHandler = null;
    this.pauseHandler = null;
  }

  start() {
    this.handleMediaRecorder();
    this.handleVideo();
    waitingStyle(this.video);
  }

  reset() {
    this.mediaRecorder.removeEventListener('dataavailable', this.dataAvailableHandler);
    this.mediaRecorder.removeEventListener('stop', this.stopHandler);
    this.video.removeEventListener('play', this.playHandler);
    this.video.removeEventListener('pause', this.pauseHandler);
  }

  handleMediaRecorder() {
    this.dataAvailableHandler = (blobEvent) => {
      this.chunkList.push(blobEvent.data);
    };
    this.stopHandler = () => {
      if (window.confirm('Would you like to download this video?')) {
        downloadBlob(this.chunkList);
      };
      this.reset();
    };
    this.mediaRecorder.addEventListener('dataavailable', this.dataAvailableHandler);
    this.mediaRecorder.addEventListener('stop', this.stopHandler);
  }

  handleVideo() {
    this.pauseHandler = () => {
      this.mediaRecorder.stop();
      doneStyle(this.video);
      setTimeout(() => normalStyle(this.video), 5000);
    };

    this.playHandler = () => {
      this.mediaRecorder.start();
      recordingStyle(this.video);
      this.video.addEventListener('pause', this.pauseHandler);
    };
    this.video.addEventListener('play', this.playHandler);
  }
}

export default Controller;
const FRAK_PURPLE = '#6700CD';

export const selectionStyle = (el) => {
  el.style.cursor = 'copy';
  el.style.outlineOffset = `-2px`;
  el.style.outline = `5px solid ${FRAK_PURPLE}`;
  el.style.cursor = 'copy';
};

export const recordingStyle = (el) => {
  el.style.outline = `5px solid red`;
  el.style.cursor = '';
};

export const waitingStyle = (el) => {
  el.style.outline = `5px solid orange`;
  el.style.cursor = '';
};

export const doneStyle = (el) => {
  el.style.outline = `5px solid green`;
  el.style.cursor = '';
};

export const normalStyle = (el) => {
  el.style.outline = 'none';
  el.style.cursor = '';
};

import '../../css/iziToast.css';
import iziToast from 'izitoast';

const FRAK_PURPLE = '#6700CD';

export const selectVideoPrompt = (timeout, cb) => {
  const toast = iziToast.show({
    timeout,
    title: 'CLICK',
    titleColor: FRAK_PURPLE,
    message: 'the video you want to record',
    position: 'topRight',
    onClosed: cb,
  });

  return () => iziToast.hide({}, toast);
};

export const closeToasts = () => {
  const toasts = document.querySelectorAll('.iziToast');
  toasts.forEach(toast => iziToast.hide({}, toast));
}

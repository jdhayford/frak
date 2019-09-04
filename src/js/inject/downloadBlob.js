export const downloadBlob = chunks => {
  const blob = new Blob(chunks, { type: 'video/webm' });
  const blobUrl = URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobUrl;
  tempLink.setAttribute('download', 'frak-video.webm');

  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }

  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
}
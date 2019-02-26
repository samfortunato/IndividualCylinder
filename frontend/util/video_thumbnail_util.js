// UNFINISHED

const dataURIToBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArr = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    intArr[i] = byteString.charCodeAt(i);
  }

  const dataView = new DataView(arrayBuffer);
  const blob = new Blob([dataView], { type: mimeString });

  return blob;
};

export const thumbnailGenerator = (videoSrc) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const video = document.createElement('video');
  video.src = videoSrc;

  video.addEventListener('loadeddata', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, 194, 109);

    return dataURIToBlob(canvas.toDataURL());
  });

  // make this return a Promise that makes AJAX call
  //   when Blob conversion is done
};

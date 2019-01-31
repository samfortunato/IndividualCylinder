const randomHSLColorGenerator = () => {
  return Math.floor(Math.random() * 360);
};

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

export const userAvatarGenerator = (firstName) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 160;
  canvas.height = 160;

  // Random background color
  ctx.fillStyle = `hsl(${randomHSLColorGenerator()}, 30%, 50%)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Render first letter of user's first name
  ctx.font = '100px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText(firstName[0].toUpperCase(), (canvas.width / 2), ((canvas.height / 2) + 4));
  
  return dataURIToBlob(canvas.toDataURL());
  // let canvasBlob = getBlob(canvas);
  // return canvasBlob;
};

const randomHSLColorGenerator = () => {
  return Math.floor(Math.random() * 360);
};

const dataURIToBlob = (dataURI) => {
  /*
  The MIT License (MIT)
  Copyright (c) 2016 David Gomez-Urquiza

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */
  
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
};

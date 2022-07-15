const video = document.querySelector('.player');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');

async function getVideo() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    });
    // vide.src = URL.createObjectURL(stream);
    video.src = stream;
    video.play();
  } catch(error) {
    console.error('Video no available', error)
  }
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    // We take the image and we have an array of the rgba pixels
    // every value is or r or g or b or a of the pixels.
    // to make effets, we just take this array iterate and change.
    
    //pixels = redEffect(pixels);
    //pixels = rgbSplit(pixels);

    pixels = greenEffect(pixels)
    ctx.putImageData(pixels, 0, 0);
  }, 16)
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] += 100;
    pixels.data[i+1] -= 50;
    pixels.data[i+2] *= 0.5;
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i-150] = pixels.data[i];
    pixels.data[i+100] = pixels.data[i+1];
    pixels.data[i-150] = pixels.data[i+2];
  }
  return pixels;
}

function greenEffect(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  })

  for(let i = 0; i < pixels.data.length; i += 4) {
    let red = pixels.data[i];
    let green = pixels.data[i+1];
    let blue = pixels.data[i+2];

    if(red >= levels.rmin
      && green >= levels.gmin
      && blue >= lebels.bmin
      && red <= levelx.rmax
      && green >= levels.gmax
      && blue >= lebels.bmax) {
        pixels.data[i+3] = 0;
      }

  }
  return pixels;
}

function takePhoto() {
  snap.currentTime = 0;

  snap.play();
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  strip.insertBefore(link, strip.firstChild);
  link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt=""/>`
}

video.addEventListener('canplay', paintToCanvas)

getVideo()
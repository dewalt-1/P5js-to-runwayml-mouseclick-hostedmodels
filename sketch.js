// RunwayModel
let model;

// Global Variables
let img; // image to draw

// Load the model!
function preload() {
  model = new rw.HostedModel({
    url: 'https://nolligan-073289b9.hosted-models.runwayml.cloud/v1/',
    token: 'nw4dmjjyXSrMHhVekgWOKQ=='
  });
  //  model.info().then(info => console.log(info));
}

// Create random latent vector - z
function randomArray(size, mean, sd) {
  let array = [];
  for (let i = 0; i < size; i++) {
    array[i] = randomGaussian(mean, sd);
  }
  return array;
}

function setup() {
  createCanvas(1024, 1024);
}

function draw() {
  background(132, 198, 100);

  textAlign(CENTER);
  textFont('Courier New');
  fill(132, 80, 158);
  textSize(20);
  text('click to generate a latent space nolli', width / 2, height / 2);
  if (img) image(img, 0, 0); // draw the image, etc here

  if (!model.isAwake()) text('model is loading...', 40, 40);
}

function mouseClicked() {
  generateRandomImage();
}

//
function generateRandomImage() {
  // generate random latent vector - z
  let z = randomArray(512, 0.0, 1.0);

  const inputs = {
    z: z,
    truncation: 0.5
  };

  // Generate!
  model.query(inputs).then(outputs => {
    const { image } = outputs;
    img = loadImage(image); // load image!
  });
}

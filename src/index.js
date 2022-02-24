import { readImageDICOMFileSeries } from "itk-wasm/dist/browser/index.js";
import Viewer from "./viewer";

// Setup viewer with DOM
const viewerContainer = document.getElementById("viewer");
const topLabel = document.getElementById("top");
const bottomLabel = document.getElementById("bottom");
const leftLabel = document.getElementById("left");
const rightLabel = document.getElementById("right");
const viewer = new Viewer(viewerContainer, {
  topLabel,
  bottomLabel,
  leftLabel,
  rightLabel,
});

// Files
const fileInput = document.querySelector("input");
fileInput.addEventListener("change", async (event) => {
  // Get files
  const { dataTransfer } = event;
  const files = event.target.files || dataTransfer.files;

  // fileInput.setAttribute("hidden", "");

  // Read series
  //  let itkReader = await readImageDICOMFileSeries(files);

  //  if (itkReader.webWorkerPool) {
  //    const killMe = itkReader.webWorkerPool.workerQueue.filter(
  //      (x) => x !== null
  //    );
  //    console.log(killMe);
  //    killMe.forEach((x) => {
  //      console.log(x);
  //      x.terminate();
  //    });
  //    itkReader.webWorkerPool.terminateWorkers();
  //  }
  // const get = async () => {
  const get = async (index) => {
    console.log("loading a new image", index);
    const selector = document.getElementById("slicingModeSelector");
    // selector.setAttribute("hidden", "");
    let itkReader = await readImageDICOMFileSeries(files);

    itkReader.image.imageType.pixelType = 1;
    itkReader.image.direction.data = itkReader.image.direction;

    // Load in viewer
    viewer.load(itkReader.image, parseInt(selector.value));
    selector.removeAttribute("hidden");

    // console.log(itkReader);
    // if (itkReader.webWorkerPool) {
    //   console.log("killing workers");
    //   const killMe = itkReader.webWorkerPool.workerQueue.filter(
    //     (x) => x !== null
    //   );
    //   killMe.forEach((x) => {
    //     console.log(x);
    //     x.terminate();
    //   });
    //   itkReader.webWorkerPool.workerQueue = Array(16).fill(null);
    // }
    // get();
    console.log("Terminating workerpool", index);
    itkReader.webWorkerPool.terminateWorkers();
    itkReader.webWorkerPool = [];
    // itkReader.image = [];
    // delete itkReader.webWorkerPool;
    // itkReader.webWorkerPool = null;
  };

  // get();
  let cacheIndex = -1;
  const getInt = setInterval(() => {
    let index = cacheIndex + 1;
    console.log("Starting workerpool:", index);
    get(index);
    cacheIndex = index;
  }, 1000);
  const gett = setTimeout(stopInt, 2000, getInt);
  function stopInt(ti) {
    clearInterval(ti);
    console.error("Done");
  }

  // itkReader.image.imageType.pixelType = 1;
  // itkReader.image.direction.data = itkReader.image.direction;

  // // Load in viewer
  // const selector = document.getElementById("slicingModeSelector");
  // viewer.load(itkReader.image, parseInt(selector.value));

  // selector.removeAttribute("hidden");
  // selector.onchange = () => {
  //   viewer.load(itkReader.image, parseInt(selector.value));
  // };
  // get(files);
});

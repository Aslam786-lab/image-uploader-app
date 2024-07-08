import  { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import './ImageCropper.css'


function ImageCropper({ imageToCrop, onImageCropped }) {

  const [cropConfig, setCropConfig] = useState(
    {
      unit: "%",
      width: 60,
      aspect: 1 / 1
    }
  );

  const [imageRef, setImageRef] = useState();

  async function cropImage(crop) {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(
        imageRef,
        crop,
        "croppedImage" 
      );
      onImageCropped(croppedImage)
    }
  }

  function getCroppedImage(sourceImage, cropConfig, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    const diameter = Math.min(cropConfig.width, cropConfig.height);
    canvas.width = diameter;
    canvas.height = diameter;
    const ctx = canvas.getContext("2d");
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    ctx.beginPath();
    ctx.arc(diameter / 2, diameter / 2, diameter / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
  

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    );
  
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
  
        blob.name = fileName;
        const croppedImageUrl = window.URL.createObjectURL(blob);
  
        resolve(croppedImageUrl);
      }, "image/png"); 
    });
  }
  
  

  return (
    <ReactCrop
      crop={cropConfig}
      src={imageToCrop}
      circularCrop
      onImageLoaded={(imageRef) => setImageRef(imageRef)}
      onComplete={(cropConfig) => cropImage(cropConfig)}
      onChange={(cropConfig) => setCropConfig(cropConfig)}
      imageStyle={{ objectFit: "cover"}} 
      crossorigin="anonymous"
    /> 
  );
}


export default ImageCropper;

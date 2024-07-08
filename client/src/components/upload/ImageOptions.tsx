import { useContext } from "react";
import { CropIcon, DeleteIcon } from "../icons";
import { cropModalHandleContext } from "./UploadImageModal";
import { useDispatch } from "react-redux";
import { deleteUploadImage } from "../../redux/slices/uploadSlice";


function ImageOptions({file, id}) {
  const handleCropImage = useContext(cropModalHandleContext);
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteUploadImage(id));
  }

  return (
    <div className='flex gap-1  h-5 items-center cursor-pointer'>
      <div className='flex gap-1 items-center' onClick={() => handleCropImage(file)}>
        <CropIcon />
        <span className='text-sm'>Crop image</span>
      </div>
        <small>.</small>
      <div className='flex gap-1 items-center' onClick={handleDelete}>
        <DeleteIcon />
        <span className='text-sm'>Delete</span>
      </div>
    </div>
  );
}

export default ImageOptions;

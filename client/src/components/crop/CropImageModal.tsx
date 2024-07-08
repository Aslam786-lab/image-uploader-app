import { useState } from "react";
import { CrossIcon } from "../icons";
import ImageCropper from "./ImageCropper";
import { useDispatch } from "react-redux";
import { setProfileImg, setProfileImgReq } from "../../redux/slices/profileSlice";
import { styles } from "../../styles";

function CropImageModal({ file, onClose, toggleUploadImg }) {
  const [croppedImg, setCroppedImg] = useState(null);
  const dispatch = useDispatch();

  const onImageCropped = (croppedImgUrl) => {
    setCroppedImg(croppedImgUrl)
  }

  const handleConfirm = () => {
    dispatch(setProfileImgReq(croppedImg));
    onClose()
    toggleUploadImg()
  }

  return (
    <div className="w-[343px] h-[458px] bg-white rounded-lg p-6 flex gap-4 flex-col">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Crop Image</span>
        <button onClick={onClose}>
          <CrossIcon />
        </button>
      </div>
      <div className="bg-black flex justify-center">
        <ImageCropper imageToCrop={file} onImageCropped={onImageCropped}/>
      </div>
      <div className='flex justify-between gap-3'>
        <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
        <button className={styles.selectBtn} onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
}

export default CropImageModal;

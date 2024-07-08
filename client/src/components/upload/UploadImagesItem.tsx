import { useDispatch } from "react-redux";
import { CrossIcon, SuccessIcon } from "../icons";
import ImageOptions from "./ImageOptions";
import DefaultImg from '../../assets/default.png'

import ProgressBar from "./ProgressBar";
import { formatFileName, formatFileSize } from "./uploadImage-helper";
import { deleteUploadImage } from "../../redux/slices/uploadSlice";
import { ERORR_MESSAGE, STATUS_UPLOAD } from "../../constants";


interface FileItem {
  cancelUpload: { cancel: (a:string) => void}
  file: File,
  progress: number|string,
  id: number,
  status: string
}

interface UploadImagesItemProps {
  fileItem : FileItem,
  selectedProfile: (a:number) => void
}


const UploadSuccess = () => {
  return (
    <div className="flex items-center gap-2">
      <SuccessIcon />
      <span className="text-xs text-green-700">Update success!</span>
    </div>
  )
}


function UploadImagesItem({ fileItem, selectedProfile }: UploadImagesItemProps) {
  const {cancelUpload, file, progress , id, status} = fileItem;
  const dispatch = useDispatch()

  const handleCancel = () => {
    cancelUpload.cancel('Cancelled by user')
    dispatch(deleteUploadImage(id));
  }

  const handleSelect = (e) => {
    selectedProfile(e.target.value)
  }

  const getImageURL = () => {
    let isValidUpload = [STATUS_UPLOAD.uploading, STATUS_UPLOAD.upload_done, STATUS_UPLOAD.upload_success].includes(status)
    if(isValidUpload) {
      return URL.createObjectURL(file);
    }
    return DefaultImg;
  }

  return (
    <li className="h-20 flex">
      <img src={getImageURL()}className="size-20 rounded-md"/>
      <div className="ml-3 w-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold">{formatFileName(file.name)}</span>
            {status === STATUS_UPLOAD.upload_success ? 
            <input
            type="radio"
            name='profile'
            className="cursor-pointer"
            value={id}
            onClick={handleSelect}
          />
          : 
            <button onClick={handleCancel} ><CrossIcon /></button>}
          </div>
          <span className="text-xs">{formatFileSize(file.size)}</span>
        </div>
        {status === STATUS_UPLOAD.upload_done && <UploadSuccess />}
        {status === STATUS_UPLOAD.upload_success && <ImageOptions file={file} id={id}/>} 
        {status === STATUS_UPLOAD.uploading && <ProgressBar progress={progress}/>}
        {status === STATUS_UPLOAD.large_file && <span className="text-xs font-medium text-red-600">{ERORR_MESSAGE.large_file}</span>}
        {status === STATUS_UPLOAD.unsupported && <span className="text-xs font-medium text-red-600">{ERORR_MESSAGE.unsupported}</span>}
        {status === STATUS_UPLOAD.network_error && <span className="text-xs font-medium text-red-600">{ERORR_MESSAGE.network_error}</span>}
        {status === STATUS_UPLOAD.server_error && <span className="text-xs font-medium text-red-600">{ERORR_MESSAGE.server_error}</span>}
      </div>
    </li>
  );
}

export default UploadImagesItem;


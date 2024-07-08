import { useDispatch, useSelector } from "react-redux"
import UploadImagesItem from "./UploadImagesItem"
import { RootState } from "../../redux/store/configure-store"
import { size, toArray } from "lodash";
import { useEffect } from "react";
import { uploadFileReq } from "../../redux/slices/uploadSlice";

interface UploadImagesProps {
  selectedProfile: (a: number) => void
}

function UploadImages({selectedProfile}: UploadImagesProps) {
  const { fileProgress }  = useSelector((state: RootState) => state.upload)
  const uploadedFilesLen = size(fileProgress);
  const dispatch = useDispatch();

  useEffect(() => {
    const fileToUpload = toArray(fileProgress).filter(file =>    file.progress === 0)
    // @ts-ignore
    dispatch(uploadFileReq(fileToUpload))
  },[uploadedFilesLen])

  return (
    <ul className="flex flex-col gap-8 ">
        {uploadedFilesLen > 0 ? 
        toArray(fileProgress).map((fileItem, index) => 
          <UploadImagesItem key={index} fileItem={fileItem} selectedProfile={selectedProfile}/>
        ): null}
    </ul>
  )
}

export default UploadImages
import { useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { setUploadFile } from "../../redux/slices/uploadSlice";
import { UploadIcon } from "../icons";


interface DragAndDropCompProps {
  isMaxFiles : boolean
}

function DragAndDropComp( {isMaxFiles}: DragAndDropCompProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null); 
    const dispatch = useDispatch();


    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave' || e.type === 'drop') {
            setIsDragging(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        handleDrag(e);
        const files = e.dataTransfer.files;
        if(isMaxFiles) {
          dispatch(setUploadFile(files))
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = e.target.files;
            if(isMaxFiles) dispatch(setUploadFile(files));
        }
    };

  return (
    <div
      className={`w-[272px] md:w-[528px] h-48 rounded border py-6 px-9 bg-[#FAFAFA]  flex items-center text-center flex-col ${
        isDragging ? "border-blue-500" : "border-[#E5E5E5]"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center shadow-md">
        <UploadIcon />
      </div>
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <h4 className="text-lg font-medium mt-5">
        Click or drag and drop to upload
      </h4>
      <p className="text-sm">PNG, or JPG (Max 5MB)</p>
    </div>
  );
}

export default DragAndDropComp;

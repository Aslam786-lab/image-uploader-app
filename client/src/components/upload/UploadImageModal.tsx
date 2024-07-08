import { CrossIcon } from "../icons";
import { useSelector } from "react-redux";
import { size } from "lodash";
import { RootState } from "../../redux/store/configure-store";
import MaxLimitReach from "./MaxLimitReach";
import UploadImages from "./UploadImages";
import { styles } from "../../styles";
import { createContext, useState } from "react";
import CropImageModal from "../crop/CropImageModal";
import DragAndDropComp from "./DragAndDropComp";

interface UploadImageModalProps {
    toggleUploadImg: () => void;
}

export const cropModalHandleContext = createContext();

function UploadImageModal({ toggleUploadImg  }: UploadImageModalProps ) {
    const { fileProgress }  = useSelector((state: RootState) => state.upload)
    const [selectedFile, setSelectedFile] = useState('');
    const [cropImageModal, setCropImageModal] = useState(false);
    const isMaxFiles = size(fileProgress) < 5;

    const selectedProfile = (profileId: number) => {
        setSelectedFile(URL.createObjectURL(fileProgress[profileId].file))
    }

    const handleSelect = () => {
        if(selectedFile) {
            setCropImageModal(true)
        }
    }

    const handleModalClose = () => {
        setCropImageModal(false)
        setSelectedFile('');
    }

    const handleCropImage = (file) => {
        setSelectedFile(URL.createObjectURL(file))
        setCropImageModal(true)
    }

    return (
        <div className="absolute w-full h-full bg-opacity-70 bg-[#0A0A0A] flex justify-center items-center">
            {cropImageModal ? <CropImageModal file={selectedFile} onClose={handleModalClose} toggleUploadImg={toggleUploadImg}/> :
            <div className="w-[320px] max-h-[90vh] md:w-[576px] bg-white rounded-md py-8 px-6 flex flex-col gap-8  overflow-y-auto overflow-x-hidden">
                <div className="flex justify-between items-baseline">
                    <div>
                        <h4 className="text-xl font-medium">Upload image(s)</h4>
                        <p className="text-base">You may upload up to 5 images</p>
                    </div>
                    <button onClick={toggleUploadImg}><CrossIcon /></button>
                </div>
                {isMaxFiles ? <DragAndDropComp isMaxFiles={isMaxFiles}/> : <MaxLimitReach />}
                <cropModalHandleContext.Provider  value={handleCropImage}>
                    <UploadImages selectedProfile={selectedProfile}/>
                </cropModalHandleContext.Provider>
                {size(fileProgress) > 0 ? (
                <div className='flex justify-between gap-3'>
                    <button className={styles.cancelBtn} onClick={toggleUploadImg}>Cancel</button>
                    <button className={selectedFile ? styles.selectBtn : styles.disabledSelectBtn} onClick={handleSelect}>Select Image</button>
                </div>) : null }
            </div>} 
        </div>
    );
}

export default UploadImageModal;

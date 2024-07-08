import { useState } from "react";
import cover from "../../assets/cover.png";
import avatar from "../../assets/default-avatar.png";
import { styles } from "../../styles";
import UserDeatails from "./UserDeatails";
import UploadImageModal from "../upload/UploadImageModal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/configure-store";



function UserProfile() {
  const [uploadImgModal, setUploadImgModal] = useState(false);
  const { profileImg } = useSelector((state:RootState) => state.profile);

  const toggleUploadImg = () => {
    setUploadImgModal(!uploadImgModal);
  }

  return (
    <>
    <div className={`${styles.profileContainer} shadow-custom`}>
      <img src={cover} className="min-h-44 rounded-t-md" />
      <div className=" relative h-[50%] bottom-12 md:bottom-1/4 flex flex-col font-noto pl-4 pr-4 md:pl-8 md:pr-8">
        <div className="flex justify-between  items-end">
          <img
            src={profileImg ? profileImg : avatar}
            className="w-[96px] md:w-[160px] object-cover"
          />
          <button className={`${styles.updatePicBtn}`} onClick={toggleUploadImg}>Update picture</button>
        </div>
        <UserDeatails />
      </div>
    </div>
    {uploadImgModal && (
      <UploadImageModal toggleUploadImg={toggleUploadImg}/>
    )}
    </>
  );
}

export default UserProfile;

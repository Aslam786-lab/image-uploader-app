import { useSelector } from "react-redux";
import ToasterNotification from "./components/profile/ToasterNotification"
import UserProfile from "./components/profile/UserProfile"
import { RootState } from "./redux/store/configure-store";


function App() {  
  const { showToaster, toasterType } = useSelector((state: RootState) => state.profile);
  return (
   <div className='flex flex-col justify-center items-center h-screen relative'>
      {showToaster && <ToasterNotification toasterObj={toasterType} />}
      <UserProfile />
   </div>
  )
}

export default App

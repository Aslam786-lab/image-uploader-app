
interface ToasterObj {
  btn_text: string; 
  btn_text_color: string; 
  toaster_msg: string; 
  toaster_msg_color: string; 
  toaster_bg_color: string; 
  toaster_size: string
}

interface ToasterNotificationProps {
  toasterObj: ToasterObj
}

function ToasterNotification({toasterObj}: ToasterNotificationProps) {
  const {btn_text, btn_text_color, toaster_msg, toaster_msg_color, toaster_bg_color, toaster_size} = toasterObj;
  return (
    <div className={`absolute top-1 ${toaster_size} rounded-full py-1 pl-1 pr-[10px] flex items-center gap-3  ${toaster_bg_color}`}>
        <button className={`min-w-[72px] h-24px ${btn_text_color} rounded-full shadow-sm py-[2px] px-[10px] bg-white text-sm font-medium`}>{btn_text}</button>
        <span className={`text-sm font-medium ${toaster_msg_color}`}>{toaster_msg}</span>
    </div>
  )
}

export default ToasterNotification
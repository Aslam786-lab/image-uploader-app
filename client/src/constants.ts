export const STATUS_UPLOAD = {
    uploading: 'uploading',
    large_file: 'large_file',
    unsupported: 'unsupported',
    upload_done: 'upload_done',
    upload_success: 'upload_success',
    network_error: 'network_error',
    server_error: 'server_error'
};


export const ERORR_MESSAGE = {
    large_file: 'This image is larger than 5MB. Please select a smaller image.',
    unsupported: 'The file format of [filename] is not supported. Please upload an image in one of the following formats: JPG or PNG.',
    network_error: 'An error occurred during the upload. Please check your network connection and try again.',
    server_error: 'An unexpected error occurred during the upload. Please contact support if the issue persists.'
}

export const TOASTER_SUCCESS = {
    btn_text: 'Success',
    btn_text_color: 'text-green-700',
    toaster_msg: 'Changes saved successfully',
    toaster_msg_color: 'text-green-700',
    toaster_bg_color: 'bg-green-50',
    toaster_width: 'w-[282px] h-8'
}

export const TOASTER_ERROR = {
    btn_text: 'Error',
    btn_text_color: 'text-red-800',
    toaster_msg: 'Upload failed. Please retry or contact us if you believe this is a bug.',
    toaster_msg_color: 'text-red-600',
    toaster_bg_color: 'bg-red-50',
    toaster_size: 'w-[347px] h-[48px] md:w-[550px] md:h-[32px]'
}
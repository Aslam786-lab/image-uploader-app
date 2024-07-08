import axios from "axios";
import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { setUploadProgress, setUploadStatus, uploadFileReq } from "../slices/uploadSlice";
import { store } from "../store/configure-store";
import { STATUS_UPLOAD, TOASTER_ERROR, TOASTER_SUCCESS } from "../../constants";
import { hideToaster, setProfileImgFailure, setProfileImgReq, setProfileImgSuccess, showToaster } from "../slices/profileSlice";

interface PayloadObj {
    file: File,
    cancelUpload: object,
    id: number
    status: string
}

interface UploadFileParam {
    payload: Array<PayloadObj>
}

function* uploadFile({ payload }: UploadFileParam): Generator<any, void, any> {
    if (payload.length) {
        for (let file of payload) {
            const formPayload = new FormData();
            formPayload.append('file', file.file);

            try {
                if(![STATUS_UPLOAD.large_file, STATUS_UPLOAD.unsupported].includes(file.status)) {
                    const response = yield call(() => axios({
                        baseURL: 'http://localhost:5000',
                        url: '/upload',
                        method: 'post',
                        data: formPayload,
                        cancelToken: file.cancelUpload.token,
                        onUploadProgress: function(progress) {
                            const { loaded, total } = progress;
                            const percentageProgress = Math.floor((loaded / total) * 100);
                            store.dispatch(setUploadProgress({ id: file.id, progress: percentageProgress}));
                            if(percentageProgress === 100) {
                                store.dispatch(setUploadStatus({id: file.id, status: STATUS_UPLOAD.upload_done}))
                                setTimeout(() => {
                                    store.dispatch(setUploadStatus({id: file.id, status: STATUS_UPLOAD.upload_success}))
                                },1000)
                            }
                        }
                    }));
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('cancelled by user');
                }

                if(error.message === 'Network Error' && !error?.response) {
                    yield put(setUploadStatus({id: file.id, status: STATUS_UPLOAD.network_error}))
                } 
                
                if(error?.response) {
                    yield put(setUploadStatus({id: file.id, status: STATUS_UPLOAD.server_error}))
                }
            }
        }
    }
}

function* setProfileImg(action): Generator<any, void, any>  {
    const formPayload = { imageUrl: action.payload };
  
    try {
      const response = yield call(() => axios({
        baseURL: 'http://localhost:5000',
        url: '/profile-update',
        method: 'get',
        data: formPayload,
      }));
  
      yield put(setProfileImgSuccess(response.data.imageUrl));
      yield put(showToaster(TOASTER_SUCCESS));
    } catch (error) {
      yield put(setProfileImgFailure(error.message));
      yield put(showToaster(TOASTER_ERROR));
    } finally {
      yield delay(3000); 
      yield put(hideToaster());
    }
  }
  

export default function* uploadSaga() {
    yield takeEvery(uploadFileReq, uploadFile);
    yield takeLatest(setProfileImgReq, setProfileImg);
}

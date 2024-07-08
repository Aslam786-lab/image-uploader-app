import axios, { AxiosError } from "axios";
import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { setUploadProgress, setUploadStatus, uploadFileReq } from "../slices/uploadSlice";
import { store } from "../store/configure-store";
import { STATUS_UPLOAD, TOASTER_ERROR, TOASTER_SUCCESS } from "../../constants";
import { hideToaster, setProfileImgFailure, setProfileImgReq, setProfileImgSuccess, showToaster } from "../slices/profileSlice";

interface CancelUpload {
    token: any;
}

interface PayloadObj {
    file: File;
    cancelUpload: CancelUpload;
    id: number;
    status: string;
}

interface UploadFileParam {
    payload: Array<PayloadObj>;
}

function* uploadFile({ payload }: UploadFileParam): Generator<any, void, any> {
    if (payload.length) {
        for (let file of payload) {
            const formPayload = new FormData();
            formPayload.append('file', file.file);

            try {
                if(![STATUS_UPLOAD.large_file, STATUS_UPLOAD.unsupported].includes(file.status)) {
                    yield call(() => axios({
                        baseURL: 'https://image-uploader-app-server.vercel.app',
                        url: '/upload',
                        method: 'post',
                        data: formPayload,
                        cancelToken: file.cancelUpload.token,
                        onUploadProgress: function(progress) {
                            const { loaded, total } = progress;
                            if (total) {
                                const percentageProgress = Math.floor((loaded / total) * 100);
                                store.dispatch(setUploadProgress({ id: file.id, progress: percentageProgress}));
                                if(percentageProgress === 100) {
                                    store.dispatch(setUploadStatus({id: file.id, status: STATUS_UPLOAD.upload_done}));
                                    setTimeout(() => {
                                        store.dispatch(setUploadStatus({id: file.id, status: STATUS_UPLOAD.upload_success}));
                                    }, 1000);
                                }
                            }
                        }
                    }));
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('cancelled by user');
                }

                const err = error as AxiosError;

                if(err.message === 'Network Error' && !err.response) {
                    yield put(setUploadStatus({id: file.id, status: STATUS_UPLOAD.network_error}));
                } 
                
                if(err.response) {
                    yield put(setUploadStatus({id: file.id, status: STATUS_UPLOAD.server_error}));
                }
            }
        }
    }
}

function* setProfileImg({payload}: {payload: string}): Generator<any, void, any> {
    const formPayload = { imageUrl: payload };
  
    try {
        const response = yield call(() => axios({
            baseURL: 'https://image-uploader-app-server.vercel.app',
            url: '/profile-update',
            method: 'post',
            data: formPayload,
        }));
  
        yield put(setProfileImgSuccess(response.data.imageUrl));
        yield put(showToaster(TOASTER_SUCCESS));
    } catch (error) {
        yield put(setProfileImgFailure((error as Error).message));
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { modifyFiles } from '../uploadFile.utils';
import { keyBy, toArray } from 'lodash';


interface FileProgress {
    [key: string]: {
        progress?: number;
        status: string
    };
}

interface UploadState {
    fileProgress: FileProgress;
}

const initialState: UploadState = {
    fileProgress: {}
};

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        setUploadFile: (state, action: PayloadAction<any>) => {
            state.fileProgress = {
                ...state.fileProgress,
                ...modifyFiles(state.fileProgress, action.payload),
            };
        },
        uploadFileReq: (state, action: PayloadAction<any>) => {
        },
        setUploadProgress: (state, action: PayloadAction<{ id: string, progress: number }>) => {
            const { id, progress, status } = action.payload;
            state.fileProgress[id] = {
                ...state.fileProgress[id],
                progress,
            };
        },
        deleteUploadImage: (state, action: PayloadAction<number>) => {
            const filteredArray = toArray(state.fileProgress).filter(file => file.id !== action.payload);
            state.fileProgress = keyBy(filteredArray, 'id');
        },
        setUploadStatus: (state, action) => {
            const {id, status} = action.payload;
            state.fileProgress[id] = {
                ...state.fileProgress[id],
                status
            }
        }
    }
});

export const { setUploadFile, uploadFileReq, setUploadProgress, deleteUploadImage, setUploadStatus } = uploadSlice.actions;

export default uploadSlice.reducer;

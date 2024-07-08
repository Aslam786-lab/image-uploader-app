import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import uploadReducer from '../slices/uploadSlice';
import profileReducer from '../slices/profileSlice';
import uploadSaga from '../saga/uploadSaga';

const sagaMiddleWare = createSagaMiddleware();

export const store: any = configureStore({
    reducer: {
        upload: uploadReducer,
        profile: profileReducer
    },
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare({ serializableCheck: false}).concat([sagaMiddleWare]),
})

sagaMiddleWare.run(uploadSaga);

export type RootState = ReturnType<typeof store.getState>
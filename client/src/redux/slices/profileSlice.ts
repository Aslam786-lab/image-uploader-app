import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileImg: '',
    error: false,
    errorMsg: '',
    showToaster: false,
    toasterType: null,
  },
  reducers: {
    // @ts-ignore
    setProfileImgReq: (state, action) => {},
    setProfileImgSuccess: (state, action) => {
      state.profileImg = action.payload;
      state.error = false;
      state.errorMsg = '';
    },
    setProfileImgFailure: (state, action) => {
      state.error = true;
      state.errorMsg = action.payload;
    },
    showToaster: (state, action) => {
      state.showToaster = true;
      state.toasterType = action.payload;
    },
    hideToaster: (state) => {
      state.showToaster = false;
      state.toasterType = null;
    }
  }
});

export const { setProfileImgReq, setProfileImgSuccess, setProfileImgFailure, showToaster, hideToaster } = profileSlice.actions;
export default profileSlice.reducer;

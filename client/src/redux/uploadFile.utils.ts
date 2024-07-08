import axios from 'axios';
import size from 'lodash/size';
import { STATUS_UPLOAD } from '../constants';

interface FileType {
    size: number;
    type: string;
}

export const modifyFiles = (existingFiles: object, files: Array<FileType>) => {
    let fileToUpload = {};

    for (let i = 0; i < files.length; i++) {
        const id = size(existingFiles) + i + 1;
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();

        let status = STATUS_UPLOAD.uploading;

        if (files[i].size > 5 * 1024 * 1024) { // 5MB
            status = STATUS_UPLOAD.large_file;
        } else if (!['image/png', 'image/jpeg', 'image/jpg'].includes(files[i].type)) {
            status = STATUS_UPLOAD.unsupported;
        }

        fileToUpload = {
            ...fileToUpload,
            [id]: {
                id,
                file: files[i],
                progress: 0,
                cancelUpload: source,
                status: status,
            }
        };
    }

    return fileToUpload;
};

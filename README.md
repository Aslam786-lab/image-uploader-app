# Image Uploader

## Overview

This project aims to create a versatile and user-friendly image uploader app using React.js. It supports single and multiple image uploads with features like drag-and-drop functionality, image management (cropping, removal, selection), progress indicators for upload status, and API integration for fetching and saving avatar images.


<img src="https://github.com/Aslam786-lab/image-uploader-app/assets/54398424/4cb193e6-2ffd-4c34-8427-657ed050baf7" alt="1720501311549" width="400"/>


## Features

- **Drag-and-Drop Interface:** Easily select files by dragging them into the uploader area.
  
- **Single or Multiple Uploads:** Supports uploading multiple images (up to 5), but allows selecting only one as the profile picture.

- **Progress Indicators:** Display loading bars to indicate upload progress.

- **Error Handling:** Gracefully handles errors such as file size limits, unsupported file formats, network issues, and server errors.

- **Image Management:** Includes features for cropping images to a fixed 1:1 circular aspect ratio, deleting images, and selecting a profile picture.

## Technology Stack

This project utilizes the following technologies:

- React.js
- Typescript
- Tailwind CSS
- REST API for backend integration 
- Express
- Multer
- react-image-crop
- Redux-toolkit
- Redux-saga
  
## Setup

To get started with the Image Uploader component:

### Server Setup:

1. Clone this repository to your local machine.
2. Navigate to the project directory `server` folder.
3. Install dependencies using `npm install`.
4. Start the development server with `npm run start`.
5. Your server will be running at `http://localhost:5000`.

### Frontend Setup:

1. Navigate to the project directory `client` folder.
2. Install dependencies using `npm install`.
3. Navigate to the `redux/saga/uploadSaga.ts` file and replace the `'https://image-uploader-app-server.vercel.app'` URL with `http://localhost:5000`.
4. Start the development server with `npm run start`.
5. Open your web browser and visit `http://localhost:3000` to view the application.


## Figma Designs

For responsive designs, refer to the attached Figma file [here](https://www.figma.com/design/tAekIi9QG7AVxP9NGxkNYb/image-uploader-figma?node-id=38-3098&t=PFc8aIDbD0eXxp0r-0) which includes adaptations for desktop, tablet, and mobile views.

### Vercel Deployment:

Check out the live demo of the Image Uploader on Vercel [here](https://image-uploader.vercel.app/).

Feel free to contact us with any questions or feedback!


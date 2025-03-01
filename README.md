

![Squishy Logo](./app//public/logo.svg)

## Features

- **Image compression** using **Sharp**
- **Drag-and-drop file upload** for seamless user experience
- **Real-time compression preview**
- **Responsive UI** powered by **Tailwind CSS**
- **Server-side processing** with **Next.js API Routes**
- **Containerized with Docker** for easy deployment

## Getting Started

Follow these steps to run Squishy locally.

### Clone Repository

```bash
git clone https://github.com/marcopolov2/squishy.git
```

Navigate to the project directory:

```bash
cd squishy
```

## **1. Docker (optional)**

### Build Docker Image

```bash
docker build -t squishy .
```

### Run Docker Container

```bash
docker run -p 3000:3000 squishy
```

## **2. Local (optional)**

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

This will start the Next.js application locally on port `3000`. You can now access the app in your browser at `http://localhost:3000`.

## **Technologies Used**

- **Next.js** - Framework for building the app
- **Tailwind CSS** - For a modern, responsive design
- **Sharp** - Image compression and processing
- **Docker** - For easy deployment
- **Next.js API Routes** - Backend image compression processing

##  **Assumptions & Limitations**

1. **Single File Upload** - The app supports uploading and compressing one file at a time.
2. **File Size Limitation** - The maximum file size supported for upload is **5MB**, since we store images locally. Larger image files may cause blocking the UI.
3. **Restricted File Types**:
   - "png"
   - "jpg"
   - "jpeg"
   - "jp2"
   - "webp"
   - "tiff"
   - "avif"
   - "heif"
   - "jxl"
4. **No Database Hosting** - Squishy does not currently use a hosted database, but a local JSON file.
5. **Speed** - Images are handled using base64 encoding, which is large for some images, causing slow response times.
6. **Image Storage and Optimization** - Currently, images are stored locally as base64-encoded data, but in the future, images will be stored in a hosted database with direct links. This transition will significantly reduce the overhead associated with base64 encoding and improve performance.
   
## **AI Assistance**

The AI was used to:

- Optimizing the image compression logic on backend.
- Translate css to tailwind utility classes.
- Testing for bugs and edge cases.
- ReadMe file (this syntax is weird haha)

## **Architectural Decisions**

- **Sharp** used as this it works in the node runtime environment, and after looking at some YT vids and reading onlnie articles, i could see its the de-facto for image compression in Node.
- **Next.js API Routes** per spec.
- **Tailwind CSS** for easy css integration (dont have to make seperate css files for each component).

## **Testing the Application**

1. Clone the repository and follow the setup instructions.
2. Test the image compression feature by uploading various supported image formats.
3. Ensure that the app is responsive across different screen sizes and works well on both desktop and mobile.

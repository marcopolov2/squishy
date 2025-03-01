

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

- **Next.js** 
- **Tailwind CSS**  
- **Sharp** 
- **Docker**  
- **Next.js API Routes**  

##  **Assumptions & Limitations**

1. **Single File Upload** - The app supports uploading and compressing one file at a time, as base64 handling is resource intense.
2. **File Size Limitation** - The maximum file size supported for upload is **5MB**, since we store images locally. Larger image files may cause blocking the UI.
3. **Restricted File Types**: png, jpg, jpeg, jp2, webp, tiff, avif, heif, jxl.
4. **No Database Hosting** - Squishy does not currently use a hosted database, but a local JSON file, to keep things simple.
5. **Speed** - Images are handled using base64 encoding, which is large for images, causing possible slow response times.
6. **Image Storage and Optimization** - Currently, images are stored locally as base64-encoded data, but in the future, images will be stored in a hosted database with direct links. This transition will significantly reduce the overhead associated with base64 encoding and improve performance.
7. **Local File Storage** - Too many images uploaded causes massive local JSON file, as the base64 for each image is stored in the file.
   
## **AI Assistance (OpenAI ChatGPT free tier)**

- Optimizing the image compression logic on backend using Sharp and file buffers.
- Translate css to tailwind utility classes.
- Testing bugs and edge cases.
- ReadMe file (this syntax is weird haha)

## **Architectural Decisions**

- **Sharp** used as it runs on the node runtime environment.After watching YT vids and reading online articlee, i could see it's widely for image compression on Node.
- **Next.js API Routes** per spec.
- **Tailwind CSS** for easy css integration (dont have to make seperate css files for each component).
- **Local JSON Database** used as this is simple, and had time restriction. In the real world images would be send to frontend using stored links (like Amazon S3).
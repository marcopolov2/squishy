# Squishy - Image Compression Made Easy

![Squishy Logo](./app//public/logo.svg)

Squishy is a **Next.js** web application designed to **compress images** efficiently using the **Sharp** library. The app features a modern, user-friendly UI built with **Tailwind CSS** and leverages **Next.js API routes** for backend processing.

## 🚀 Features

- **Lightning-fast image compression** using **Sharp**
- **Drag-and-drop file upload** for seamless user experience
- **Real-time compression preview**
- **Responsive UI** powered by **Tailwind CSS**
- **Server-side processing** with **Next.js API Routes**
- **Containerized with Docker** for easy deployment

## 🎯 Getting Started

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

## 🔧 **Technologies Used**

- **Next.js** - Framework for building the app
- **Tailwind CSS** - For a modern, responsive design
- **Sharp** - Image compression and processing
- **Docker** - For easy deployment
- **Next.js API Routes** - Backend image compression processing

## ⚠️ **Assumptions & Limitations**

1. **Single File Upload** - The app supports uploading and compressing one file at a time.
2. **File Size Limitation** - The maximum file size supported for upload is **5MB**.
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
4. **No Database Hosting** - Squishy does not currently use a hosted database.

## 🤖 **AI Assistance**

AI was used to enhance the existing features, assist in finding bugs, and help in the testing and development of new functionalities. The AI was especially helpful in:

- Optimizing the image compression logic
- Suggesting improvements to the UI and UX
- Testing for bugs and edge cases

## 📝 **Architectural Decisions**

- **Sharp** was chosen for its high-performance image processing capabilities.
- **Next.js API Routes** were used for server-side image compression to handle all processing efficiently and securely.
- **Tailwind CSS** was used for styling to create a responsive and clean UI with minimal effort.

## ✅ **Testing the Application**

1. Clone the repository and follow the setup instructions.
2. Test the image compression feature by uploading various supported image formats.
3. Ensure that the app is responsive across different screen sizes and works well on both desktop and mobile.

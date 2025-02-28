import { apiCall } from "./utils";

const IACTIONS = {
  POST: "post",
};

const IROUTES = {
  UPLOAD: "/api/upload",
  COMPRESS: "/api/compress",
};

const createFormData = (file, quality = null) => {
  const formData = new FormData();
  formData.append("file", file);

  if (quality !== null) {
    formData.append("quality", String(quality));
  }

  return formData;
};

const postFileData = async (route, file, quality) => {
  const formData = createFormData(file, quality);
  return await apiCall(route, formData, IACTIONS.POST, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const _uploadFile = (file) => postFileData(IROUTES.UPLOAD, file);

export const _compressFile = (file, quality = 1) =>
  postFileData(IROUTES.COMPRESS, file, quality);

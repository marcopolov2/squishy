import moment from "moment";

export const formatDate = (timestamp = "", format = "MM-DD-YYYY") => {
  if (timestamp) {
    return moment.utc(timestamp).local().format(format);
  }
  return "";
};

export const getSizeInKB = (size: number | string | undefined): number => {
  const sizeInBytes = Number(size ?? 0);

  return isNaN(sizeInBytes) ? 0 : sizeInBytes / 1024;
};

export const formatFileSize = (sizeInKB: number): string => {
  if (sizeInKB <= 1024) {
    return `${sizeInKB.toFixed(2)} kB`;
  } else if (sizeInKB < 1024 * 1024) {
    return `${(sizeInKB / 1024).toFixed(2)} MB`;
  } else if (sizeInKB < 1024 * 1024 * 1024) {
    return `${(sizeInKB / 1024 / 1024).toFixed(2)} GB`;
  } else {
    return `${(sizeInKB / 1024 / 1024 / 1024).toFixed(2)} TB`;
  }
};

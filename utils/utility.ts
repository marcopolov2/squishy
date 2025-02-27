import moment from "moment";

export const getSizeInKB = (size: number | string | undefined) => {
  return Number(size ?? 0) ?? 0 / 1024 ?? 0;
};

export const formatDate = (timestamp = "", format = "MM-DD-YYYY") => {
  if (timestamp) {
    return moment.utc(timestamp).local().format(format);
  }
  return "";
};

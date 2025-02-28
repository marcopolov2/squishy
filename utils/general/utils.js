import moment from "moment";

export default class Utils {
  static debounce(func, wait) {
    let timeout;
    return function () {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const context = this,
        args = arguments;

      return new Promise(function (resolve) {
        const later = function () {
          timeout = null;
          resolve(func.apply(context, args));
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      });
    };
  }

  static formatDate = (timestamp = "", format = "MM-DD-YYYY") => {
    if (timestamp) {
      return moment.utc(timestamp).local().format(format);
    }
    return "";
  };

  static getSizeInKB = (size) => {
    const sizeInBytes = Number(size ?? 0);
    return isNaN(sizeInBytes) ? 0 : sizeInBytes / 1024;
  };

  static getFileSize = (sizeInKB) => {
    const units = [
      { unit: "KB", divisor: 1 },
      { unit: "MB", divisor: 1024 },
      { unit: "GB", divisor: 1024 * 1024 },
      { unit: "TB", divisor: 1024 * 1024 * 1024 },
    ];

    // Start with KB, and find the first unit where size exceeds the divisor threshold
    let { unit, divisor } = units[0]; // Default to KB for very small sizes

    for (let i = 1; i < units.length; i++) {
      if (sizeInKB >= units[i].divisor) {
        unit = units[i].unit;
        divisor = units[i].divisor;
      } else {
        break;
      }
    }

    // Convert the size and round it to two decimal places
    const size = (sizeInKB / divisor).toFixed(2);

    return `${size} ${unit}`;
  };
}

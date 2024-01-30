/* eslint-disable max-len */
export function mapModifiers(
  baseClassName: string,
  ...modifiers: (string | string[] | false | undefined)[]
): string {
  return modifiers
    .reduce<string[]>(
      (acc, m) => (!m ? acc : [...acc, ...(typeof m === "string" ? [m] : m)]),
      []
    )
    .map((m) => `-${m}`)
    .reduce<string>(
      (classNames, suffix) => `${classNames} ${baseClassName}${suffix}`,
      baseClassName
    );
}

export const isArray = (value: string | any[], minLength: any) =>
  Array.isArray(value) &&
  (minLength
    ? value.length >= (typeof minLength === "number" ? minLength : 1)
    : true);

export function getMousePosition(
  evt:
    | React.MouseEvent<SVGPathElement, MouseEvent>
    | React.MouseEvent<SVGRectElement, MouseEvent>,
  item: HTMLDivElement
) {
  let { pageX } = evt;
  let { pageY } = evt;
  if (pageX === undefined) {
    pageX =
      evt.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    pageY =
      evt.clientY +
      document.body.scrollTop +
      document.documentElement.scrollTop;
  }

  const rect = item.getBoundingClientRect();
  const offsetX = evt.clientX - rect.left;
  const offsetY = evt.clientY - rect.top;

  return {
    client: { x: evt.clientX, y: evt.clientY }, // relative to the viewport
    screen: { x: evt.screenX, y: evt.screenY }, // relative to the physical screen
    offset: { x: offsetX, y: offsetY }, // relative to the event target
    page: { x: pageX, y: pageY }, // relative to the html document
  };
}

export function getDimensions(ele: HTMLDivElement) {
  const { height } = ele.getBoundingClientRect();
  const { offsetTop } = ele;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
}

export function scrollStop(callback: (value: any) => void, time = 2000) {
  // Make sure a valid callback was provided
  if (!callback || typeof callback !== "function") return;

  // Setup scrolling variable
  let isScrolling: any;

  // Listen for scroll events
  window.addEventListener(
    "scroll",
    () => {
      // Clear our timeout throughout the scroll
      window.clearTimeout(isScrolling);

      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(callback, time);
    },
    false
  );
}

export const formatDateDDMMYYYY = (date?: string, unitDot?: boolean) => {
  if (!date) return "";
  const dateFormat = new Date(date);
  let day: string | number = dateFormat.getDate();
  let month: string | number = dateFormat.getMonth() + 1;
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  if (unitDot) return `${day}.${month}.${dateFormat.getFullYear()}`;
  return `${day}/${month}/${dateFormat.getFullYear()}`;
};

export const lengthMinutes = (minutes: Date) => {
  if (minutes.getMinutes().toString().length === 1) {
    return "00";
  }
  return "30";
};

export const handleRenderGUID = () =>
  "00-0-4-1-000".replace(/[^-]/g, (s: any) =>
    (((Math.random() + ~~s) * 0x10000) >> s).toString(16).padStart(4, "0")
  );

export const downloadBlobPDF = (base64Data: any, fileName: string) => {
  // Chuyển đổi base64 thành mảng byte
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Tạo một blob từ mảng byte
  const blob = new Blob([byteArray], { type: "application/pdf" });

  // Tạo URL cho blob và tạo một liên kết tải xuống
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  // Thêm liên kết vào DOM và kích hoạt sự kiện nhấp chuột
  document.body.appendChild(link);
  link.click();

  // Giải phóng tài nguyên sau khi tải xuống hoàn tất
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const handleConverFileToBase64 = (file: any) => {
  const result = {
    name: file?.name,
    ext: file?.type?.split("/").pop(),
    blob: "",
  };
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e: any) {
      const base64Data = e.target.result;
      result.blob = base64Data?.split(",")[1];
    };

    reader.readAsDataURL(file);
  }
  return result;
};

export const handleConvertToTimeZoneZ = (utcTimeString: any) => {
  const padZero = (number: any) => {
    return (number < 10 ? "0" : "") + number;
  };

  const utcDate = new Date(utcTimeString);

  utcDate.setHours(utcDate.getHours() + 7);

  const year = utcDate.getFullYear();
  const month = utcDate.getMonth() + 1;
  const day = utcDate.getDate();
  const hours = utcDate.getHours();
  const minutes = utcDate.getMinutes();
  const seconds = utcDate.getSeconds();

  const convertedTimeString =
    year +
    "-" +
    padZero(month) +
    "-" +
    padZero(day) +
    "T" +
    padZero(hours) +
    ":" +
    padZero(minutes) +
    ":" +
    padZero(seconds) +
    ".000000";

  return convertedTimeString;
};

export const copyClipboard = (text: string) => {
  const tempElement = document.createElement("textarea");
  tempElement.value = text;

  // Thêm thẻ tạm thời vào DOM
  document.body.appendChild(tempElement);

  // Chọn và sao chép nội dung vào Clipboard
  tempElement.select();
  document.execCommand("copy");

  // Loại bỏ thẻ tạm thời khỏi DOM
  document.body.removeChild(tempElement);
};

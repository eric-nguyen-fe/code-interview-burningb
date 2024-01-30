/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
export const validAudioCodecse = {
  default: ["g711", "pcma", "pcmu", "transport-cc", "telephone-event"],
};

export const callAudioConstraint = {
  audio: { noiseSuppression: true, echoCancellation: false },
};

export const DEFAULT_QUERY_OPTION = {
  retry: 0,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export const MENU_CODE = {
  MENU_HEADER: "header",
  MENU_FOOTER: "footer",
  MENU_PDFLIST: "pdf-list",
};

export const callAudioConstraints = {
  audio: {
    noiseSuppression: true,
    echoCancellation: false,
    autoGainControl: true,
    channelCount: 2,
    sampleRate: 44100,
  },
};

export const validAudioCodecs = {
  default: ["g711", "pcma", "pcmu", "transport-cc", "telephone-event"],
  // default: { payload: 9, codec: 'G722', rate: 8000 },
  // slow: ['red', 'g729', 'g7221', 'g722', 'pcma', 'pcmu', 'gsm', 'transport-cc', 'telephone-event'],
  // hight: ['red', 'pcma', 'pcmu', 'g729', 'g7221', 'g722', 'gsm', 'transport-cc', 'telephone-event'],
};

// export type LanguageKey = keyof LocalesType;

// export type LocalesType = {
//   vi: LocalesItem,
//   en: LocalesItem,
// };
export const USER_LOGIN = "USER_LOGIN";
export const TOKEN = "accessToken";
export const IMAGEREGEX = /.(jpg|jpeg|png|gif|bmp|webp)$/i;
export const VIDEOREGEX = /.(m4v|avi|mpg|mp4|webm)$/i;
export const AUDIOREGEX = /.(mp3|wav)$/i;

export type TypeExportExcel = "afterExams" | "other";
export interface DateExportExcel {
  from: Date;
  to: Date;
}
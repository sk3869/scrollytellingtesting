export interface ImageCredit {
  src: string;
  credit: string;
  license?: string;
}

export const IMAGE_CREDITS: ImageCredit[] = [];

export function getImageCredit(src: string): ImageCredit | undefined {
  return IMAGE_CREDITS.find((c) => c.src === src);
}

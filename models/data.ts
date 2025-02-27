export interface ImageMetadata {
  guid: string;
  dateUploaded: string;
  image: {
    original: string;
    compressed: string | null;
  };
}

import imageCompression from "browser-image-compression";

export async function compressImages(files: File[]) {
  const options = {
    maxSizeMB: 1, // compress to ~1MB
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const compressed = [];

  for (const file of files) {
    const output = await imageCompression(file, options);
    compressed.push(new File([output], file.name, { type: file.type }));
  }

  return compressed;
}

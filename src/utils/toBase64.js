export const toBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        // Landscape: 1080x608
        // Square: 1080x1080
        // Portait: 1080x1350
        const width = img.width > 1080 ? 1080 : img.width;
        const elem = document.createElement("canvas");
        const scaleFactor = width / img.width;
        elem.width = width;
        elem.height = img.height * scaleFactor;

        const ctx = elem.getContext("2d");
        ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
        const type = "image/jpeg";

        resolve({ base64: ctx.canvas.toDataURL(type, 1), type });
      };
    };

    reader.onerror = error => {
      reject(error);
    };
  });
};

export const getLightColorFromImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    // Validate image URL
    if (!imageUrl || typeof imageUrl !== "string") {
      return reject(new Error("Invalid image URL. Please provide a valid URL string."));
    }

    const img = new Image();

    // Log the image URL
    console.log("Loading image from URL:", imageUrl);

    if (!imageUrl.startsWith("data")) {
      img.crossOrigin = "anonymous"; 
    }

    img.src = imageUrl;

    // Handle image load
    img.onload = () => {
      console.log("Image loaded successfully");

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let r = 0, g = 0, b = 0, count = 0;

      // Calculate average color of bright pixels
      for (let i = 0; i < imageData.length; i += 4) {
        const red = imageData[i];
        const green = imageData[i + 1];
        const blue = imageData[i + 2];
        const brightness = (red + green + blue) / 3;

        if (brightness > 180) {
          r += red;
          g += green;
          b += blue; 
          count++;
        }
      }

      // Resolve with color or fallback
      if (count === 0) {
        console.log("No bright pixels found, returning white");
        resolve("#ffffff"); // No bright pixels found, return white
      } else {
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        const rgbColor = `rgb(${r}, ${g}, ${b})`;
        console.log("Calculated light color:", rgbColor);
        resolve(rgbColor);
      }
    };

    // Handle image error
    img.onerror = (e) => {
      console.error("Failed to load image:", e);
      reject(new Error("Image could not be loaded. Check the image URL and CORS policy."));
    };

    // Handle image timeout
    img.onloadend = () => {
      if (!img.complete) {
        reject(new Error("Image loading was interrupted or timed out."));
      }
    };
  });
};
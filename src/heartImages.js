// Create heart images using SVG data URIs
export const createHeartImage = (color) => {
  const svg = `
    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,18 C10,18 2,10 2,6 C2,3 4,1 7,1 C8,1 9,1.5 10,2.5 C11,1.5 12,1 13,1 C16,1 18,3 18,6 C18,10 10,18 10,18 Z" fill="${color}"/>
    </svg>
  `;
  
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const img = new Image();
  img.src = url;
  return img;
};

// Pre-create heart images in pink, red, and black
export const getHeartImages = () => {
  const colors = [
    '#ff69b4', // Hot pink
    '#ff1493', // Deep pink
    '#ffb6c1', // Light pink
    '#ffc0cb', // Pink
    '#ff91af', // Medium pink
    '#dc143c', // Crimson red
    '#ff0000', // Red
    '#8b0000', // Dark red
    '#1a1a1a', // Black
    '#2a2a2a', // Dark gray/black
  ];
  
  return colors.map(color => createHeartImage(color));
};

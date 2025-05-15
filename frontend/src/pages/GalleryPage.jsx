import React from 'react';

function GalleryPage() {
  const images = [
    'https://via.placeholder.com/200x150?text=Chart+1',
    'https://via.placeholder.com/200x150?text=Chart+2',
    'https://via.placeholder.com/200x150?text=Chart+3',
  ];

  return (
    <div className="gallery-container">
      <h2>Gallery</h2>
      <div className="image-grid">
        {images.map((url, index) => (
          <img key={index} src={url} alt={`Chart ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default GalleryPage;

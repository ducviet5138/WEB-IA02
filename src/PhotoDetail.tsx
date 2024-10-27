import { useEffect, useState } from 'react';

type Photo = {
  id: string;
  urls: {
    full: string;
  };
  description: string;
  user: {
    name: string;
  };
}

export default function PhotoDetail({ photoId }: { photoId: string }) {
  console.log('photoId:', photoId);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/photos/${photoId}?client_id=D0zCkwvvgbKEiiD9Chd8vRjFRrIVsnqG8EJXwMe3ZNQ`);
        const data: Photo = await response.json();
        setPhoto(data);
      } catch (error) {
        console.error('Error fetching photo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [photoId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!photo) {
    return <p>Photo not found.</p>;
  }

  return (
    <>
    <h1>Photo Detail</h1>
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <img src={photo.urls.full} alt={photo.description} className="w-full h-auto" />
      <h1 className="text-4xl mb-4">{photo.description || 'No description available'}</h1>
      <p>{photo.user.name}</p>
    </div>
    </>
  );
}
import { useEffect, useState, useCallback } from "react";

type Photo = {
  id: string;
  urls: {
    small: string;
  };
  description: string;
};

export default function Photos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?page=${page}&client_id=D0zCkwvvgbKEiiD9Chd8vRjFRrIVsnqG8EJXwMe3ZNQ`
      );
      const data: Photo[] = await response.json();
      setPhotos((prevPhotos: Photo[]) => [...prevPhotos, ...data]);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="h-screen w-screen mx-4">
      <h1 className="text-4xl mb-4">Photos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo: Photo, idx: number) => (
          <div key={idx} className="p-2" onClick={() => {
            window.location.href = `/photos/${photo.id}`;
          }}>
            <img
              src={photo.urls.small}
              alt={photo.description}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
}

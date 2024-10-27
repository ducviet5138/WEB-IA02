import Photos from './Photos';
import Index from './index';
import PhotoDetail from './PhotoDetail';

export default function App() {
  const currentPath = window.location.pathname;
  const photoDetailMatch = currentPath.match(/^\/photos\/(\w+)$/);

  return (
    <div className="h-screen w-screen">
      {currentPath === '/photos' ? (
        <Photos />
      ) : photoDetailMatch ? (
        <PhotoDetail photoId={photoDetailMatch[1]} />
      ) : (
        <Index />
      )}
    </div>
  );
}
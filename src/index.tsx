export default function Index() {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <button
          className="border border-blue-500"
          onClick={() => (window.location.href = "/photos")}
        >
          View Gallery
        </button>
      </div>
    );
  }
  
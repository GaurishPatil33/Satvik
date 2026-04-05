import { Media } from "./MediaGallery";

export function MediaRenderer({ item }: { item: Media }) {
  if (item.type === "image") {
    return (
      <img
        src={item.url}
        className="w-full h-full object-contain"
      />
    );
  }

  if (item.type === "video") {
    return (
      <video
        src={item.url}
        controls
        className="w-full h-full object-contain"
      />
    );
  }

  if (item.type === "youtube") {
    const id = item.url.split("v=")[1];
    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        className="w-full h-full"
        allowFullScreen
      />
    );
  }

  return null;
}
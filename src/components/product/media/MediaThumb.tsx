import { Media } from "./MediaGallery";

export function MediaThumb({ item }: { item: Media }) {
  if (item.type === "image") {
    return <img src={item.url} className="w-full h-full object-cover rounded" />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center text-xs">
      ▶
    </div>
  );
}
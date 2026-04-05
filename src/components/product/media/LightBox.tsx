import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { MediaRenderer } from "./MediaRender";

export function Lightbox({
  media,
  active,
  setActive,
  onClose,
}: any) {
  const next = () => setActive((p: number) => (p + 1) % media.length);
  const prev = () => setActive((p: number) => (p - 1 + media.length) % media.length);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">

      {/* Close */}
      <button onClick={onClose} className="absolute top-4 right-4 text-white">
        <X size={28} />
      </button>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-5 text-white">
        <ChevronLeft size={40} />
      </button>

      <div className="w-[80%] h-[80%]">
        <MediaRenderer item={media[active]} />
      </div>

      <button onClick={next} className="absolute right-5 text-white">
        <ChevronRight size={40} />
      </button>
    </div>
  );
}
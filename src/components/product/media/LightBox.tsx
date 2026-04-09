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

    <div className="fixed inset-0 flex items-center justify-center">


      <div className="fixed inset-0 bg-black/90 z-60 flex items-center justify-center" onClick={onClose} />


      <div className="flex items-center justify-center z-70 inset-0">



        {/* Arrows */}
        <button onClick={prev} className="absolute left-5 text-gray-600 p-0.5 bg-white/50 rounded-full">
          <ChevronLeft size={40} />
        </button>

        <div className="w-[80%] h-[80%]">

          <MediaRenderer item={media[active]} />
        </div>

        <button onClick={next} className="absolute right-5 text-gray-600 p-0.5 bg-white/50 rounded-full">
          <ChevronRight size={40} />
        </button>

      </div>
    </div>
  );
}
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react'
import { MediaRenderer } from './MediaRender';
import { MediaThumb } from './MediaThumb';
import { Lightbox } from './LightBox';
export type Media = {
  url: string;
  type: "image" | "video" | "youtube";
  public_id: string
};

const MediaGallery = ({ media }: { media: Media[] }) => {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = () => setActive((p) => (p + 1) % media.length);
  const prev = () => setActive((p) => (p - 1 + media.length) % media.length);
  return (
    <div className="lg:sticky lg:top-24">

      {/* MAIN VIEW */}
      <div className="relative aspect-square bg-cream-100 rounded-3xl overflow-hidden group">

        <MediaRenderer item={media[active]} />

        {/* Arrows */}
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <ChevronLeft />
        </button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
          <ChevronRight />
        </button>

        {/* Click → Lightbox */}
        <div
          onClick={() => setLightbox(true)}
          className="absolute inset-0 cursor-zoom-in"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-2 mt-3 overflow-x-auto">
        {media.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-16 h-16 rounded-lg border ${active === i ? "border-green-600" : "border-gray-200"
              }`}
          >
            <MediaThumb item={m} />
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <Lightbox
          media={media}
          active={active}
          setActive={setActive}
          onClose={() => setLightbox(false)}
        />
      )}
    </div>
  )
}

export default MediaGallery
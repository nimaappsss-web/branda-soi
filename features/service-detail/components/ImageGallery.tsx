"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export const ImageGallery = ({ images, name }: ImageGalleryProps) => {
  const [selected, setSelected] = useState(0);
  const imageList = images.length > 0 ? images : ["/placeholder.jpg"];

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60">
        <Image
          src={imageList[selected]}
          alt={`${name} - image ${selected + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      {imageList.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              aria-label={`View image ${idx + 1}`}
              className={cn(
                "relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                selected === idx
                  ? "border-primary"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                sizes="128px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

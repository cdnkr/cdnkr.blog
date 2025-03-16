"use client"

import Masonry from "./masonry";

export default function ImageMasonry({ images }) {
    return (
        <Masonry
            className="not-prose"
            items={images}
            renderItem={(item) => (
                <div>
                    <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-auto object-cover border-2 border-dark"
                        loading="lazy"
                    />
                    {item.caption && (
                        <p className="text-sm text-gray-600 italic font-mono mt-2">{item.caption}</p>
                    )}
                </div>
            )}
            columnWidth={300}
            gap={16}
        />
    );
}

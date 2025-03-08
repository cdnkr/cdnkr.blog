"use client";

import Button from "./ui/button";
import { ArrowUpRight } from "./ui/icons";

export default function ShareButton({ title, text }) {
  return (
    <div>
      <Button
        className="px-4 bg-black"
        onClick={() => {
          navigator.share({
            title: title,
            text: text,
            url: window.location.href,
          });
        }}
      >
        <ArrowUpRight className="size-6 lg:size-6 stroke-white fill-white" />
      </Button>
    </div>
  );
}

"use client";

import Button from "./ui/button";
import { ArrowUpRight } from "./ui/icons";

export default function ShareButton({ title, text }) {
  return (
    <div>
      <Button
        className="w-full uppercase font-mono"
        onClick={() => {
          navigator.share({
            title: title,
            text: text,
            url: window.location.href,
          });
        }}
      >
        share
        <ArrowUpRight className="shrink-0" />
      </Button>
    </div>
  );
}

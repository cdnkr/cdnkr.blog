"use client";

import config from "@/config";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import Input from "../ui/input";

function DownloadButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md px-2 py-1 text-sm bg-primary/70 hover:bg-primary/90 transition-colors cursor-pointer"
    >
      Download
    </button>
  );
}

export default function QRCodeGenerator() {
  const [text, setText] = useState("");

  const downloadQRCode = () => {
    // create a temporary canvas element
    const canvas = document.createElement("canvas");
    const svg = document.getElementById("qrcode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();

    // convert SVG to data URL
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // create download link
      const a = document.createElement("a");
      a.download = "qrcode.png";
      a.href = canvas.toDataURL("image/png");
      a.click();

      // cleanup
      URL.revokeObjectURL(svgUrl);
    };

    img.src = svgUrl;
  };

  return (
    <div className="w-full flex justify-start">
      <div className="w-full max-w-xl flex flex-col mt-6">
        <div className="relative">
          <div className="absolute right-2 -top-10 lg:top-2 flex gap-2">
            <DownloadButton onClick={downloadQRCode} />
          </div>
          <div className="group w-full flex justify-center p-8 rounded-t-lg overflow-x-auto text-white bg-black/75">
            <QRCodeSVG
              id="qrcode"
              value={text || config.url}
              size={512}
              className="rounded-lg w-44 h-auto"
              bgColor="transparent"
              fgColor="#ffffff"
            />
          </div>
        </div>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter something to encode..."
          className="rounded-b-lg focus:ring-0"
        />
      </div>
    </div>
  );
}

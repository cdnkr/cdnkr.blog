"use client";

import config from "@/config";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import Input from "../ui/input";
import UtilityButton from "../ui/utilitybutton";

function DownloadButton({ onClick }) {
  return <UtilityButton onClick={onClick}>Download</UtilityButton>;
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
    <div className="p-4 border-2 border-dashed border-dark my-8">
      <div className="w-full flex justify-start">
        <div className="w-full flex flex-col">
          <div className="relative">
            <div className="absolute right-2 -top-10 lg:top-2 flex gap-2">
              <DownloadButton onClick={downloadQRCode} />
            </div>
            <div className="group w-full flex justify-center p-8 overflow-x-auto text-white bg-dark">
              <QRCodeSVG
                id="qrcode"
                value={text || config.url}
                size={512}
                className="w-44 h-auto"
                bgColor="transparent"
                fgColor="#ffffff"
              />
            </div>
          </div>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter something to encode..."
            className="focus:ring-0 bg-dark text-white rounded-none"
          />
        </div>
      </div>
    </div>
  );
}

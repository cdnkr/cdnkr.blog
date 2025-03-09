"use client";

import config from "@/config";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";

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
    <div className="p-4 border-2 border-dashed border-dark mb-8 lg:my-8 max-w-sm mx-auto">
      <div className="w-full flex justify-start">
        <div className="w-full flex flex-col  gap-4">
          <QRCodeSVG
            id="qrcode"
            value={text || config.url}
            size={512}
            className="w-full  h-auto"
            bgColor="transparent"
            fgColor="#111111"
          />
          <div className="w-full flex flex-col gap-4">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter something to encode..."
              variant="secondary"
            />
            <Button
              onClick={downloadQRCode}
              variant="tertiary"
              className="w-full h-full uppercase"
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

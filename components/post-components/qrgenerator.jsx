"use client";

import config from "@/config";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import { Download } from "../ui/icons";

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
    <div className="w-full flex flex-col">
      <div className="flex flex-col items-center gap-8 p-4 max-w-md mx-auto">
        <QRCodeSVG
          id="qrcode"
          value={text || config.url}
          size={512}
          className="rounded-lg w-full h-auto"
          bgColor="transparent"
          fgColor="#ffffff"
        />
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter something to encode..."
        />
        <Button onClick={downloadQRCode}>
          Download
          <Download />
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import UtilityButton from "./ui/utilitybutton";

export default function CopyButton({ text, className }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <UtilityButton onClick={copy} className={className}>
      {copied ? "Copied!" : "Copy"}
    </UtilityButton>
  );
}

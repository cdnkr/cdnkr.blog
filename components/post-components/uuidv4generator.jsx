"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import UtilityButton from "../ui/utilitybutton";

function RegenerateButton({ onClick }) {
  return <UtilityButton onClick={onClick}>Regenerate</UtilityButton>;
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <UtilityButton onClick={copy}>{copied ? "Copied!" : "Copy"}</UtilityButton>
  );
}

export default function UUIDV4Generator() {
  const [uuid, setUUID] = useState(uuidv4());

  function generateUUIDV4() {
    setUUID(uuidv4());
  }

  return (
    <div className="p-4 border-2 border-dashed border-dark my-8">
      <div className="relative">
        <div className="absolute right-2 -top-10 lg:top-2 flex gap-2">
          <CopyButton text={uuid} />
          <RegenerateButton onClick={generateUUIDV4} />
        </div>
        <pre className="group p-4 overflow-x-auto my-4 text-white bg-black/85">
          {uuid}
        </pre>
      </div>
    </div>
  );
}

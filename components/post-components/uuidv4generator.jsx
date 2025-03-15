"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../ui/button";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="tertiary" className="uppercase" onClick={copy}>
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}

export default function UUIDV4Generator() {
  const [uuid, setUUID] = useState(uuidv4());

  function generateUUIDV4() {
    setUUID(uuidv4());
  }

  return (
    <div className="lg:p-4 lg:border-2 lg:border-dashed lg:border-muted flex flex-col gap-3 my-8 lg:my-0 lg:mb-8">
      <pre className="group p-4 overflow-x-auto text-text-alt bg-dark">{uuid}</pre>
      <div className="flex gap-4">
        <CopyButton text={uuid} />
        <Button
          variant="tertiary"
          className="uppercase"
          onClick={generateUUIDV4}
        >
          Regenerate
        </Button>
      </div>
    </div>
  );
}

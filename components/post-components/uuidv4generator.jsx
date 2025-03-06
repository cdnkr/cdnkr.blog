"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function RegenerateButton({
    onClick
}) {
    return (
        <button
            onClick={onClick}
            className="rounded-md px-2 py-1 text-sm bg-primary/70 hover:bg-primary/90 transition-colors cursor-pointer"
        >
            Regenerate
        </button>
    );
}

function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={copy}
            className="rounded-md px-2 py-1 text-sm bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        >
            {copied ? "Copied!" : "Copy"}
        </button>
    );
}

export default function UUIDV4Generator() {
    const [uuid, setUUID] = useState(uuidv4());

    function generateUUIDV4() {
        setUUID(uuidv4());
    }

    return (
        <pre className="group p-4 rounded-lg overflow-x-auto my-4 text-white bg-black/75 relative">
            <div className="absolute right-2 top-2 flex gap-2">
                <CopyButton text={uuid} />
                <RegenerateButton onClick={generateUUIDV4} />
            </div>
            {uuid}
        </pre>
    );
}

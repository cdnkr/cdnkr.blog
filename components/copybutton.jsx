"use client";

import { useState } from "react";

export default function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={copy}
            className="absolute right-2 top-2 rounded-md px-2 py-1 text-sm bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        >
            {copied ? "Copied!" : "Copy"}
        </button>
    );
} 
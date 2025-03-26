"use client";

import React, { useState } from "react";
import Button from "../ui/button";

function Base64Converter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'

    const handleConvert = () => {
        try {
            if (mode === 'encode') {
                const encoded = btoa(input);
                setOutput(encoded);
            } else {
                const decoded = atob(input);
                setOutput(decoded);
            }
        } catch (error) {
            setOutput('Error: Invalid input');
        }
    };

    return (
        <div className="not-prose p-4 border-2 border-dashed border-muted max-w-xl mx-auto flex flex-col gap-4">

            <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="mb-2 p-2 border cursor-pointer"
            >
                <option value="encode">Encode</option>
                <option value="decode">Decode</option>
            </select>

            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode' : 'Enter base64 to decode'}
                className="w-full p-2 border h-32"
            />

            <Button
                onClick={handleConvert}
            >
                {mode === 'encode' ? 'Encode' : 'Decode'}
            </Button>

            <textarea
                value={output}
                readOnly
                placeholder="Result"
                className="w-full p-2 border h-32"
            />

        </div>
    );
}

export default Base64Converter;

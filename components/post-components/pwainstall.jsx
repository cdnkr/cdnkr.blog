"use client";

import { useEffect, useState } from "react";
import Button from "../ui/button";
import { Install } from "../ui/icons";
import { getPrompt, clearPrompt } from "@/utils/pwa-handler";
import { Block } from "../ui/block";

export default function PWAInstallButton() {
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const prompt = getPrompt();
    setIsInstallable(!!prompt);
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = getPrompt();
    if (promptEvent) {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      clearPrompt();
      setIsInstallable(false);
      console.log(`User response to the install prompt: ${outcome}`);
    }
  };

  return (
    <>
      <div className="p-4 border-2 border-dashed border-dark my-8">
        <div className="flex w-full justify-center">
          <Button
            variant="tertiary"
            className="max-w-fit uppercase"
            onClick={handleInstallClick}
          >
            <Install />
            Install App
          </Button>
        </div>
      </div>
      {!isInstallable && (
        <Block caretPosition="top-left" variant="dark" className="font-mono space-y-2 mb-8 text-tertiary">
          <h3>
            <strong>PWA install is not supported in your browser.</strong>
          </h3>
          {typeof navigator !== "undefined" && <p>Browser: {navigator.userAgent}</p>}
          <p>See <a href="#%20Important%20Caveats" className="underline">Important Caveats</a> below for more information.</p>
        </Block>
      )}
    </>
  );
}

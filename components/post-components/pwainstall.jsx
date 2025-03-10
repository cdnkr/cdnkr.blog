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
    if (!promptEvent) {
      // Show error message for unsupported browsers (like Safari)
      setIsInstallable(false);
      return;
    }

    try {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      clearPrompt();
      console.log(`User response to the install prompt: ${outcome}`);
    } catch (error) {
      console.error("PWA installation failed:", error);
      setIsInstallable(false);
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
      {/* {!isInstallable && (
        <Block caretPosition="top-left" variant="dark" className="font-mono space-y-2 mb-8 text-tertiary">
          <h3>
            <strong>PWA install is not supported in your browser.</strong>
          </h3>
          {typeof navigator !== "undefined" && <p>Browser: {navigator.userAgent}</p>}
          <p>See <a href="#%20Browser%20Support" className="underline">Browser Support</a> below for more information.</p>
        </Block>
      )} */}
    </>
  );
}

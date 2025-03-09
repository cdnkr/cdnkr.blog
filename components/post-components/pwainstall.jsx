"use client";

import { useEffect, useState } from "react";
import Button from "../ui/button";
import { Install } from "../ui/icons";

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setIsInstallable(false);
      console.log(`User response to the install prompt: ${outcome}`);
    }
  };

  return (
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
  );
}

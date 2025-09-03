
'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function usePWAInstall() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstallPWA, setCanInstallPWA] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(event as BeforeInstallPromptEvent);
      // Check if not running in standalone mode (already installed)
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setCanInstallPWA(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const promptInstall = async () => {
    if (!installPrompt) {
        console.log("Installation prompt not available.");
        return;
    }
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('PWA installation accepted');
      setCanInstallPWA(false); // Hide button after install
    } else {
      console.log('PWA installation dismissed');
    }
    setInstallPrompt(null);
  };

  return { canInstallPWA, promptInstall };
}

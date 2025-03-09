// global state to store the deferred prompt
let deferredPrompt = null;

// function to get the stored prompt
export const getPrompt = () => deferredPrompt;

// function to clear the stored prompt
export const clearPrompt = () => {
  deferredPrompt = null;
};

// initialize the global handler
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
}
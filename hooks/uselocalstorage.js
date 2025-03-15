import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting state in localStorage
 * @param {string} key - The localStorage key to store the value under
 * @param {any} initialValue - The initial value if no value exists in localStorage
 * @returns {[any, Function]} - A stateful value and a function to update it
 */
function useLocalStorage(key, initialValue) {
  // Get stored value from localStorage or use initialValue
  const getStoredValue = () => {
    try {
      // Get from localStorage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initialValue if null
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State to store our value
  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Dispatch a custom event so other instances can update
      window.dispatchEvent(new Event('local-storage-change'));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes to this localStorage key in other components/windows
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(getStoredValue());
    };
    
    // Listen for the custom event
    window.addEventListener('local-storage-change', handleStorageChange);
    
    // Listen for changes to localStorage from other windows
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('local-storage-change', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]); // Re-run if the key changes

  return [storedValue, setValue];
}

export default useLocalStorage;

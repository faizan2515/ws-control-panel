import { useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prevState: T) => T)) => void] => {
  // State to hold the current value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = localStorage.getItem(key);
      // Parse stored JSON or return initial value if none exists
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key “" + key + "”: ", error);
      return initialValue;
    }
  });

  // Function to update the stored value
  const setValue = (value: T | ((prevState: T) => T)) => {
    try {
      // Allow value to be a function to have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save to local storage
      localStorage.setItem(key, JSON.stringify(valueToStore));
      // Update state
      setStoredValue(valueToStore);
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;

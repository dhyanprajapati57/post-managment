import { useState, useEffect } from "react";

/**
 * useDebounce - returns a debounced value after the specified delay
 * @param value - value to debounce
 * @param delay - debounce delay in ms
 */

// generic type T
// It allows this hook to work with any data type

const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
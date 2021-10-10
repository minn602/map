import React, { useCallback, useState } from "react";

export const useClientRect = () => {
  const [rect, setRect] = useState(null);
  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node);
    }
  }, []);
  return [rect, ref];
};

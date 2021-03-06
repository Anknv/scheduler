import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  }
  function back() {
    if (history.length > 1) {
      history.pop();
    }
    setMode(history[history.length - 1]);
    setHistory(history);
  }
  return { mode, transition, back };
}

'use client';
import { useState, useEffect } from 'react';
export function useLocalStorage<T>(key: string, init: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return init;
    try { const v = window.localStorage.getItem(key); return v ? JSON.parse(v) : init; } catch { return init; }
  });
  useEffect(() => { try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  return [value, setValue] as const;
}
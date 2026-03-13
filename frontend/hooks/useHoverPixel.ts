'use client';
import { useState, useCallback } from 'react';
interface HoverInfo { x: number; y: number; color: string; owner: string; }
export function useHoverPixel() {
  const [hovered, setHovered] = useState<HoverInfo | null>(null);
  const onHover = useCallback((info: HoverInfo | null) => setHovered(info), []);
  const clear = useCallback(() => setHovered(null), []);
  return { hovered, onHover, clear };
}
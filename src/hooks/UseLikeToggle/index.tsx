'use client';
import { useState } from 'react';

export default function UseLikeToggle(initialLiked = false, initialCount = 0) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const toggle = () => {
    setLiked(!liked);
    setCount((prev) => prev + (liked ? -1 : 1));
  };

  return { liked, count, toggle };
}

import { useEffect, useRef, useState } from 'react';
import '../../styles/cursor.css';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
        outlineRef.current.style.transform = `translate(${clientX - 20}px, ${clientY - 20}px)`;
      }

      const target = e.target as HTMLElement;
      const isTargetPointer = window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer';
      setIsPointer(isTargetPointer);
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className={`custom-cursor ${isPointer ? 'custom-pointer' : ''}`}>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={outlineRef} className="cursor-outline"></div>
    </div>
  );
};

export default CustomCursor;

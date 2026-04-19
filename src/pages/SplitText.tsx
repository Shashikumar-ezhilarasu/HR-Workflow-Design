import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 1.0,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
  showCallback = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.split-item');
    
    gsap.set(elements, from);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: `top bottom${rootMargin}`,
        toggleActions: 'play none none none',
        onEnter: () => !hasAnimated && setHasAnimated(true),
      },
    });

    tl.to(elements, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      onComplete: () => {
        if (showCallback && onLetterAnimationComplete) {
          onLetterAnimationComplete();
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, [text, delay, duration, ease, from, to, rootMargin, showCallback, onLetterAnimationComplete]);

  const items = splitType === 'chars' ? text.split('') : text.split(' ');

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ textAlign, whiteSpace: 'pre-wrap' }}
    >
      {items.map((item, index) => (
        <span
          key={index}
          className="split-item inline-block"
          style={{ display: 'inline-block' }}
        >
          {item === ' ' ? '\u00A0' : item}
          {splitType === 'words' && index < items.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </div>
  );
}

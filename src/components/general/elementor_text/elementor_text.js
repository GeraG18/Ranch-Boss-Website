'use client'
import { useEffect, useRef } from 'react';
import './elementor_text.style.css';

const InfiniteScroller = ({text = "Elementor text"}) => {
  const scrollerRef = useRef(null);
  const scrollerInnerRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
  }, []);

  const addAnimation = () => {
    if (scrollerRef.current) {
      scrollerRef.current.setAttribute('data-animated', 'true');
      
      const scrollerContent = Array.from(scrollerInnerRef.current.children);
      
      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", "true");
        scrollerInnerRef.current.appendChild(duplicatedItem);
      });
    }
  };

  return (
    <div className="scroller" ref={scrollerRef}>
      <ul className="tag-list scroller__inner" ref={scrollerInnerRef}>
        {
            [1,1,1,1,1,1].map((_, i) =>
                <li key={i}>{text}</li>
            )
        }
      </ul>
    </div>
  );
};

export default InfiniteScroller;
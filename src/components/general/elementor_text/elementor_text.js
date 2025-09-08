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
// import { useEffect, useRef } from "react";

// const ElementorText = ({text = "Elementor text"}) => {

//     const scrollerRef = useRef(null);
//     const scrollerInnerRef = useRef(null);

//     const addAnimation = () => {
//         if (scrollerRef.current) {
//           scrollerRef.current.setAttribute('data-animated', 'true');
          
//           const scrollerContent = Array.from(scrollerInnerRef.current.children);
          
//           scrollerContent.forEach(item => {
//             const duplicatedItem = item.cloneNode(true);
//             duplicatedItem.setAttribute("aria-hidden", "true");
//             scrollerInnerRef.current.appendChild(duplicatedItem);
//           });
//         }
//     };

//     useEffect(() => {
//         if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//             addAnimation();
//         }
//     }, []);
    
//     return (
//         <div className="scroller | max-w-[2000px] data-[animated=true]:overflow-hidden" ref={scrollerRef}>
//            <ul ref={scrollerInnerRef} className="tag-list scroller__inner | m-0 px-0 list-none py-8 flex flex-wrap gap-4 data-[animated=true]:w-fit data-[animated=true]:flex-nowrap data-[animated=true]:animate-scroll-x">
//                 {
//                     [1,1,1,1,1,1].map((_, i) =>
//                         <li className="bg-transparent padding-4 w-[250px] text-center text-[1.5rem]" key={i}>{text}</li>
//                     )
//                 }
//            </ul>
//         </div>
//     );   
// }

// export default ElementorText;
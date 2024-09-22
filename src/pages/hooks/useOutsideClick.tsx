import { RefObject, useEffect } from "react";

const useOutsideClick = (ref: RefObject<HTMLElement>, cb: VoidFunction) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        cb();
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [cb, ref]);
}

export default useOutsideClick;

import { Footer as DaisyUIFooter } from 'react-daisyui';
import { FaHeart, FaCode } from 'react-icons/fa';

import ThemeToggle from './ThemeToggle';

export default function Footer() {
  return (
    <DaisyUIFooter className="footer footer-center text-base-content bottom-0 mb-10 mt-8 gap-1 tall:!fixed">
      <DaisyUIFooter.Title className="inline-flex">
        <FaCode /> with <FaHeart /> by Keksi
      </DaisyUIFooter.Title>
      <a
        className="link link-hover mb-2"
        href="https://github.com/keksiqc/shako"
        target="_blank"
      >
        GitHub
      </a>
      <ThemeToggle />
    </DaisyUIFooter>
  );
}

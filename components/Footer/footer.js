'use client';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.footerColumns}>
        <div className={styles.footerSection}>
          <h4>Contact</h4>
          <p>Email: <a href="mailto:yassahaali@gmail.com">yassahaali@gmail.com</a></p>
          <p>Phone: +44 7548601948</p>
          <p>London, UK</p>
        </div>

        <div className={styles.footerSection}>
          <h4>Links</h4>
          <nav>
            <a href="https://linkedin.com/in/yassahaali" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com/yassahaali" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://github.com/yali5" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Yassaha Ali. All rights reserved.</p>
      </div>
    </footer>
  );
}
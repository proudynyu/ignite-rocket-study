import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href="/">
          <a title="logo">
            <img src="/images/Logo.svg" alt="logo" />
          </a>
        </Link>
      </div>
    </header>
  );
}

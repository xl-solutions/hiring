import styles from './styles.module.css'
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const projectName = "Projeto Raphael Rissoli";

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>{projectName} - {currentYear}</p>
      </div>
    </footer>
  );
}
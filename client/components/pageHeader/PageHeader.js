import styles from './pageHeader.module.css';

const PageHeader = ({ title }) => {
  return <h1 className={styles.title}>{title}</h1>;
};

export default PageHeader;

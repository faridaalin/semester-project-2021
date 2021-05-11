import ReactPaginate from 'react-paginate';
import styles from './pagination.module.css';

const Pagination = ({ pageCount, changePage }) => {
  return (
    <ReactPaginate
      previousLabel='Prev'
      nextLabel='Next'
      containerClassName={styles.paginationContainer}
      previousClassName={styles.prevBtn}
      nextClassName={styles.nextBtn}
      disabledClassName={styles.paginationDisabled}
      activeClassName={styles.paginationActive}
      pageCount={pageCount}
      onPageChange={changePage}
    />
  );
};

export default Pagination;

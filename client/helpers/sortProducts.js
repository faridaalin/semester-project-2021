const sortProducts = (order, type) => {
  if (type === 'price') {
    if (order === 'desc') {
      console.log('Heigh to low', type);
    } else {
      console.log('Low to heigh', type);
    }
  } else {
    if (type === 'rating') {
      if (order === 'desc') {
        console.log('Heigh to low', type);
      } else {
        console.log('Low to heigh', type);
      }
    }
  }
};

export default sortProducts;

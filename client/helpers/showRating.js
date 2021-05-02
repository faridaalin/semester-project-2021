const showRating = (rating) => {
  let ratingArray = [];
  for (let index = 0; index < rating; index++) {
    ratingArray.push(index);
  }
  return ratingArray;
};

export default showRating;

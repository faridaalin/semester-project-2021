const calcNights = (checkin, checkout) => {
  const start = new Date(checkin);
  const end = new Date(checkout);
  const timeDiff = Math.abs(start.getTime() - end.getTime());
  const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return numberOfNights === 0 ? 1 : numberOfNights;
};

export default calcNights;

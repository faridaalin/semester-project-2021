import { parseCookies } from '../../helpers/parseCookies';

export default (req, res) => {
  const cookie = parseCookies(req);
  const token = cookie.jwt;

  res.status(200).json({ name: 'John Doe' });
};

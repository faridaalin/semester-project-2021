import axios from 'axios';
import { parseCookies } from '../../helpers/parseCookies';

export default async (req, res) => {
  try {
    const result = await axios.get('http://localhost:8080/api/users/logout');

    const { data } = result;

    console.log('🔥🔥RESPONSE🔥🔥', res);
    res.status(200).send({ data: data });
  } catch (err) {
    console.log('ERROR response data 🔥', err.response.data);
    res.status(400).send({ error: err.response.data });
  }
};

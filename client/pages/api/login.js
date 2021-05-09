import axios from 'axios';

export default async (req, res) => {
  console.log(req.body);
  try {
    const result = await axios.post('http://localhost:8080/api/users/login', {
      email: req.body.email,
      password: req.body.password,
    });

    const { data } = result;

    console.log('🔥🔥RESPONSE🔥🔥', res);
    res.status(200).send({ data: data });
  } catch (err) {
    console.log('ERROR response data 🔥', err.response.data);
    res.status(400).send({ error: err.response.data });
  }
};

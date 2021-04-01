const fetchApi = (route, method, body) =>
  fetch(`${process.env.API_HOST}/${route}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });

export default fetchApi;

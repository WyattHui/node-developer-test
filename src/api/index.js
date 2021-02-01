export const get = async (uri, opts = {}) => {
  let
    response = await fetch(uri, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      ...opts
    }),
    json = await parseJSON(response),
    status = response.status;

  if (status >= 400 && status <= 599) {
    throw json;
  }
  return json;
};

const parseJSON = async response => {
  let text = await response.text();
  return text ? JSON.parse(text) : null;
};

export const post = (uri, opts = {}) => {
  return get(uri, {
    ...opts,
    method: 'post',
    body: JSON.stringify(opts.body)
  });
};

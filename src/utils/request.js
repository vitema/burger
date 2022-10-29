export async function request(url, options) {
  const res = await fetch(url, options);
  return checkResponse(res);
}

function checkResponse(res) {
  if (res.ok || res.status==403) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

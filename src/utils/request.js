import { apiUrl } from "../constants/constants";
import { getCookie, saveTokens, deleteTokens } from "./cookie";
import { refreshTokenName } from "../constants/constants";

export async function request(url, options) {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err === "jwt expired") {
      console.log("get refreshtoken")
      const { refreshToken, accessToken } = await refreshTokenRequest();
      saveTokens(refreshToken, accessToken);

      options.headers.authorization = accessToken;

      const res = await fetch(url, options);

      return await checkResponse(res);
    } else if (err === "invalid token") {
      console.log("invalid token")
      deleteTokens();
      return Promise.reject(err);
    } else {
      return Promise.reject(err);
    }
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  if (res.status >= 400 && res.status < 500) {
    return res.json().then((data) => {
      return Promise.reject(data.message);
    });
  }

  return Promise.reject(
    `Непредвиденная ошибка, попрорбуйте повторить операцию позже`
  );
}

const refreshTokenRequest = () => {
  return fetch(`${apiUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getCookie(refreshTokenName),
    }),
  }).then(checkResponse);
};

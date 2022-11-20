import { apiUrl } from "../constants/constants";
import { getCookie, saveTokens, deleteTokens } from "./cookie";
import { refreshTokenName } from "../constants/constants";

export async function request<TResponse>(url:string, options: RequestInit={}): Promise<TResponse> {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err === "jwt expired") {
      try {
      const { refreshToken, accessToken } = await refreshTokenRequest();
      saveTokens(refreshToken, accessToken);
      
      options.headers = new Headers( options.headers);
      options.headers.set('Authorization', accessToken);

        const res = await fetch(url, options);
        return await checkResponse(res);
      } catch (err) {
        if (err === "Token is invalid") {
          deleteTokens();
          return Promise.reject(err);
        }
      }
    } else {
      return Promise.reject(err);
    }

    return Promise.reject("unknown error");
  }
}

async function checkResponse(res:Response): Promise<any> {
  if (res.ok) {
    return res.json();
  }

  if (res.status >= 400 && res.status < 500) {
    const data = await res.json();
    return await Promise.reject(data.message);
  }

  return Promise.reject(
    `Непредвиденная ошибка, попрорбуйте повторить операцию позже`
  );
}

async function refreshTokenRequest(): Promise<any> {
  const res = await fetch(`${apiUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getCookie(refreshTokenName),
    }),
  });
  return checkResponse(res);
}

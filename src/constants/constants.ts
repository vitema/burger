export const apiUrl = "https://norma.nomoreparties.space/api";
export const wsUrl = "wss://norma.nomoreparties.space/orders";
export const availableTypes: Record<string, string> = {
  bun: "Булки",
  sauce: "Соус",
  main: "Начинки",
};

export const bunType = "bun";

export const dndIngredientsAccept = "ingredients";
export const dndComponentsAccept = "components";
export const dndComponentAccept = "component";

export const refreshTokenName="refreshToken";
export const accessTokenName="accessToken";
export const sendForgotEmail="sendForgotEmail";


export const orderStatus: Record<string, string> = {
  created: "Создан",
  pending: "Готовится",
  done: "Выполнен",
  cancelled: "Отменен",
};

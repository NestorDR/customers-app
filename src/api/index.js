
// apiGet retorna una función que es lo que está esperando el
// payload creator de createAction (de redux-actions)
export const apiGet =
  (url) =>
    () => fetch(url).then(response => response.json());
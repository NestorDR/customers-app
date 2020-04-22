// apiGet retorna una función que es lo que está esperando el payload creator de createAction (de redux-actions)
export const apiGet =
  url =>
    () => fetch(url).then(response => response.json());


// apiPut retorna una función que es lo que está esperando el payload creator de createAction (de redux-actions)
export const apiPut =
  (url, id, customer) =>
    () => fetch(`${url}/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: new Headers({
          'Content-type': 'application/json'
        })
      }).then(response => {
      // console.log('apiPut 1º then', response);
        return response.json();
      }).then(json => {
        // console.log('apiPut 2º then', json);
        return json.mensajesError ? Promise.reject(json.mensajesError) : json;
      });
      /*
      // Un catch atrapa el Promise.reject
      .catch(err => {
        console.log("Error en apiPut" + err);
      });
      */

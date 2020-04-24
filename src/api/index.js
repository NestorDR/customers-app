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

// apiPost retorna una función que es lo que está esperando el payload creator de createAction (de redux-actions)
export const apiPost =
  (url, newCustomer) =>
    () => fetch(`${url}`,
      {
        method: 'POST',
        body: JSON.stringify(newCustomer),
        headers: new Headers({
          'Content-type': 'application/json'
        })
      }).then(response => {
      // console.log('apiPost 1º then', response);
      return response.json();
    }).then(json => {
      // console.log('apiPost 2º then', json);
      return json.mensajesError ? Promise.reject(json.mensajesError) : json;
    });
    /*
    // Un catch atrapa el Promise.reject
    .catch(err => {
      console.log("Error en apiPost" + err);
    });
    */

// apiPut retorna una función que es lo que está esperando el payload creator de createAction (de redux-actions)
export const apiDelete =
  (url, id) =>
    () => fetch(`${url}/${id}`,
      {
        method: 'DELETE',
        headers: new Headers({
          'Content-type': 'application/json'
        })
      }).then(response => {
      console.log('apiDelete 1º then', response);
      return response;
    }).then(json => {
      console.log('apiDelete 2º then', json);
      return json.mensajesError ? Promise.reject(json.mensajesError) : id;
    });
    /*
    // Un catch atrapa el Promise.reject
    .catch(err => {
      console.log("Error en apiPut" + err);
    });
    */

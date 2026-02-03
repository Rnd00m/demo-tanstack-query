export const PostsApi = {
  list: () => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json());
  },
  listPaginated: (page = 1, limit = 10) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
      .then((response) => {
        // Pour simuler une API qui renvoie des métadonnées de pagination,
        // on pourrait extraire les headers, mais JSONPlaceholder est basique.
        // On va juste retourner les données.
        return response.json();
      });
  },
  get: (id) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json());
  },
  create: (newPost) => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json());
  },
  update: (id, data) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json());
  }
}
import { store } from '../_store';

const config = {
    api: '/api/NewsApi/',
    options: {
        headers: authHeader(),
    },
};

const httpGet = (currentPage, pageLimit) => {
    return fetch(`${config.api}?page=${currentPage}&pageLimit=${pageLimit}`, {
        ...config.options, ...{ 'content-type': 'application/json' },
    })
        .then((response) => handleResponse(response))
        .then((response) => response.json())
        .catch((error) => {
            throw Error(error);
        });
};

const httpGetById = (id) => {
    return fetch(`${config.api}${id}`, {
        ...config.options, ...{ 'content-type': 'application/json' },
    })
        .then((response) => handleResponse(response))
        .then((response) => response.json())
        .catch((error) => {
            throw Error(error);
        });
};

const httpPost = (data) => {
    return fetch(`${config.api}`, {
        method: 'post',
        body: data ? data : null,
        ...config.options,
    })
        .then((response) => handleResponse(response))
        .then((response) => response)
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
};

const httpPut = (id, data) => {
    return fetch(`${config.api}${id}`, {
        method: 'put',
        body: data ? data : null,
        ...config.options,
    })
        .then((response) => handleResponse(response))
        .then((response) => response)
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
};

const httpDelete = (id) => {
    return fetch(`${config.api}${id}`, {
        method: 'delete',
        ...config.options, ...{ 'content-type': 'application/json' },
    })
        .then((response) => handleResponse(response))
        .then((response) => response)
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
};

function authHeader() {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = authToken();
    const isLoggedIn = !!token;
    if (isLoggedIn) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

function authToken() {
    return store.getState().auth.jwtToken;
}

const handleResponse = async (response) => {
    if (response.status === 200) {
        return response;
    }
    else if (response.status === 400) {
        throw Error(JSON.stringify((await response.json()).modelErrors));
    }
    else {
        throw Error(response.json() | 'error');
    }
};

const exportedObject = {
    httpGet, httpGetById, httpPost, httpPut, httpDelete
};

export default exportedObject;
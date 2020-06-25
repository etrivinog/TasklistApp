
export const apiGet = (url) => () => fetch(url).then(data => {
    return data.json()
});

export const apiPut = (url, obj) => () => 
    fetch(`${url}`, {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: new Headers({ 'Content-type': 'application/json'})
    }).then(v => v.json())
    .then(r => {
        if (r.code) {
            return Promise.reject(r.message);
        }
        return r;
    });

export const apiPost = (url, obj) => () => 
    fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: new Headers({ 'Content-type': 'application/json'})
    }).then(v => v.json())
    .then(r => {
        if (r.code) {
            return Promise.reject(r.message);
        }
        return r;
    })

    
export const apiDelete = (url, id) => () => 
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: new Headers({ 'Content-type': 'application/json'})
    }).then(v => v.json())
    .then(r => {
        if (r.code) {
            console.log(JSON.stringify(r.message));
            //return Promise.reject(r.message);
        }
        return r;
    })
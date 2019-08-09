
function fetchJson(url, options = {}) {
    const opt = Object.assign({
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // mode: 'cors', // no-cors, cors, *same-origin
        // credentials: 'same-origin', // include, *same-origin, omit
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // no-referrer, *client
    }, options);
    return new Promise((accept, reject) => {
        fetch(url, opt)
            .then(resp => resp.json())
            .then((data) => {
                accept(data);
            })
            .catch(reject);
    });
}

function urlId(baseUrl, id) {
    let url = baseUrl;
    if (url.substr(-1) !== '/') {
        url += '/';
    }
    return url + id;
}

export function GET(url) {
    return fetchJson(url);
}

export function POST(url, data = {}) {
    return fetchJson(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export function DELETE(baseUrl, id) {
    return fetchJson(urlId(baseUrl, id), {
        method: 'DELETE'
    });
}

export function PUT(baseUrl, id, data = {}) {
    return fetchJson(urlId(baseUrl, id), {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export default function crud(baseUrl) {
    return {
        list: () => { return GET(baseUrl)},
        item: (id) => { return GET(urlId(baseUrl, id))},
        insert: (doc) => { return POST(baseUrl, doc)},
        delete: (id) => { return DELETE(baseUrl, id)},
        update: (data) => { return PUT(baseUrl, data._id, data)}
    }
}

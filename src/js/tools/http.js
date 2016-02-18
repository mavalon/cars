function status(res) {
    if (res.status >= 200 && res.status < 300) return res;

    let error = new Error(res.statusText);
    error.res = res;
    throw error;
}


function json(res) {
    if (res && typeof res.json === 'function') return res.json();
}

const defaultOpts = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
}

export default function(url, opts = {}) {
    return fetch(url, Object.assign(opts, defaultOpts)).then(status).then(json);
}


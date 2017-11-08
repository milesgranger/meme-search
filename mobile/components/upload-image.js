


const futch = (url, opts={}, onProgress) => {
    console.log(url, opts);
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', url);
        for (let k in opts.headers || {}){
            xhr.setRequestHeader(k, opts.headers[k]);
        }
        xhr.onload = e => res(e.target);
        xhr.onerror = rej;
        if (xhr.upload && onProgress){
            xhr.upload.onprogress = onProgress;
        }
        xhr.send(opts.body);
    });
};

export default futch;
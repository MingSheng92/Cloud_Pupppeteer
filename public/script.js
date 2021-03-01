function bufferToImageUrl(buffer) {
    // See https://gist.github.com/candycode/f18ae1767b2b0aba568e

    var arrayBufferView = new Uint8Array( buffer );
    var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL( blob );

    return imageUrl;
}

function onBtnClicked(e) {
    e.preventDefault();

    const pageToScreenshot = document.getElementById('page').value;

    document.getElementById('result').textContent = "Please wait..."

    if (!pageToScreenshot) return document.getElementById('result').textContent = 'Please enter a page URL';

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ pageToScreenshot: pageToScreenshot })
    };

    fetch("/.netlify/functions/take-screenshot", options)
        .then((res) => res.json())
        .then((res) => {
            
            if (!res.buffer) return document.getElementById('result').textContent = 'Error capturing screenshot';

            const img = document.createElement('img');
            img.src = bufferToImageUrl(res.buffer.data);
            document.getElementById('result').innerHTML = img.outerHTML;
        })
        .catch((err) => {
            console.log(err)
            document.getElementById('result').textContent = `Error: ${err.toString()}`
        });
}


/*
document.querySelector('button[type="submit"]').addEventListener('click', (e) => {
    console.log("");
});
    e.preventDefault();

    const pageToScreenshot = document.getElementById('page').value;

    document.getElementById('result').textContent = `Error: ${pageToScreenshot.toString()}`
    document.getElementById('result').textContent = "Please wait..."

    if (!pageToScreenshot) return document.getElementById('result').textContent = 'Please enter a page URL';

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ pageToScreenshot: pageToScreenshot })
    };

    fetch("/.netlify/functions/take-screenshot", options)
        .then((res) => res.json())
        .then((res) => {
            
            if (!res.buffer) return document.getElementById('result').textContent = 'Error capturing screenshot';

            const img = document.createElement('img');
            img.src = bufferToImageUrl(res.buffer.data);
            document.getElementById('result').innerHTML = img.outerHTML;
        })
        .catch((err) => {
            console.log(err)
            document.getElementById('result').textContent = `Error: ${err.toString()}`
        });
*/
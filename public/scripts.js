const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
        pageToScreenShot: "https://www.mymringredient.com/"
    })
};

fetch("/.netlify/functions/take-screenshot", options);
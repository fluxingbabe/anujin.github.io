const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.allorigins.win/get?url=" + encodeURIComponent("https://ikon.mn/rss"));
xhr.onload = function () {
    if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.contents, "text/xml");
        const items = xmlDoc.getElementsByTagName("item");
        if (items.length > 0) {
            const firstItem = items[0];
            const title = firstItem.getElementsByTagName("title")[0].textContent;
            const pubDate = (firstItem.getElementsByTagName("pubDate")[0].textContent);
            const link = firstItem.getElementsByTagName("link")[0].textContent;
            const breakingNewsHtml = `
                <div class="breaking-news">
                    <h3><a href="detail.html?id=0" target="_blank">${title}</a></h3>
                    <p>Published on: ${pubDate}</p>
                </div>
            `;
            document.getElementById("breaking-news").innerHTML = breakingNewsHtml;
        }
        var htmlContent = "<ul>";
for (var i = 0; i < items.length; i++) {
    const title = items[i].getElementsByTagName("title")[0].textContent;
    const link = items[i].getElementsByTagName("link")[0].textContent;
    const pubDate = items[i].getElementsByTagName("pubDate")[0].textContent;

    htmlContent += `<li>
        <h3><a href="detail.html?id=${i}" target="_blank">${title}</a></h3>
        <p>Published on: ${pubDate}</p>
    </li>`;
}

htmlContent += "</ul>";
document.getElementById("topNews").innerHTML = htmlContent;

    } else {
        console.error("RSS татахад алдаа гарлаа.");
    }
};

xhr.onerror = function () {
    console.error("Хүсэлт илгээхэд алдаа гарлаа.");
};

xhr.send();

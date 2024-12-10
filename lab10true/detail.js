const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

if (itemId !== null) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.allorigins.win/get?url=" + encodeURIComponent("https://ikon.mn/rss"));
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.contents, "text/xml");
            const items = xmlDoc.getElementsByTagName("item");

            if (items[itemId]) {
                const title = items[itemId].getElementsByTagName("title")[0].textContent;
                const description = items[itemId].getElementsByTagName("description")[0].textContent;
                const pubDate = items[itemId].getElementsByTagName("pubDate")[0].textContent;

                document.getElementById("content").innerHTML = `
                    <div class="back"><a href="blog.html" class="backButton">Буцах</a>
                    <h2>${title}</h2></div>
                    <p>${description}</p>
                    <p><strong>Published on:</strong> ${pubDate}</p>
                `;
            } else {
                document.getElementById("content").textContent = "Мэдээ олдсонгүй!";
            }
        } else {
            console.error("Алдаа гарлаа!");
        }
    };

    xhr.onerror = function () {
        console.error("Сүлжээний алдаа гарлаа.");
    };

    xhr.send();
} else {
    document.getElementById("news-detail").textContent = "Буруу параметр!";
}

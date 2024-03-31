const apiKey = "71b83a1410d34e4f9d3e994787e85ae9";

const blogConatiner = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");

const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news ", error);
    return [];
  }
}

searchButton.addEventListener("click", async() => {
  const query = searchField.value.trim()
  if(query !== ""){
    try {
      const articles = await fetchNewsQuery(query)
      displayBlogs(articles)
    } catch (error) {
      console.log("Error fetching news by query ",error)
    }
  }
});

async function fetchNewsQuery(query){
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news ", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogConatiner.innerHTML = "";
  articles.forEach((articles) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = articles.urlToImage;
    img.alt = articles.title;
    const title = document.createElement("h2");
    const truncatedTitle =
      articles.title.length > 30
        ? articles.title.slice(0, 30) + "...."
        : articles.title;
    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    const truncatedDescription =
      articles.description.length > 50
        ? articles.description.slice(0, 50) + "...."
        : articles.description;

    description.textContent = truncatedDescription;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(articles.url, "_blank");
    });
    blogConatiner.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    console.log(articles);
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news ", error);
  }
})();

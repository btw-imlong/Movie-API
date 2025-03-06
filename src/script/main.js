const API_KEY = "38ce8edf86ce46dd2cc6a4d56763297a"; // Replace with your TMDB API key
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");
const resultsGrid = resultsDiv.querySelector("div");
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

// Toggle mobile menu
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Search functionality
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        resultsGrid.innerHTML = data.results.length
          ? data.results
              .map(
                (movie) => `
           <a href="../src/page/watch-movie.html?id=${movie.id}" class="block">
            <div class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
             <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
        alt="${movie.title}" 
          class="w-full h-64 object-cover rounded-md">
    <h2 class="mt-2 font-bold line-clamp-1">${movie.title}</h2>
      <p class="text-sm text-gray-400">${movie.release_date}</p>
    </div>
    </a>

          `
              )
              .join("")
          : `<p class="text-center text-gray-400">No results found</p>`;

        resultsDiv.classList.remove("hidden");
      })
      .catch((error) => console.error("Error fetching movies:", error));
  } else {
    resultsDiv.classList.add("hidden");
  }
});

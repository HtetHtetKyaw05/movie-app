import { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ⭐ localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // ⭐ 保存
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ⭐ API取得（fetch）
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${searchTerm}&apikey=a46f44c4`
        );

        const data = await res.json();

        console.log("API:", data);

        if (data.Response === "False") {
          setMovies([]);
          setError(data.Error);
        } else {
          setMovies(data.Search);
        }
      } catch (err) {
        setError("Network Error");
      }

      setLoading(false);
    };

    fetchMovies();
  }, [searchTerm]);

  // ⭐ 検索
  const handleSearch = () => {
    setSearchTerm(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // ⭐ お気に入り
  const toggleFavorite = (movie) => {
    const exists = favorites.find((f) => f.imdbID === movie.imdbID);

    if (exists) {
      setFavorites(favorites.filter((f) => f.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1>🎬 Movie App</h1>

      {/* 検索 */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search movies..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* loading */}
      {loading && <p>Loading...</p>}

      {/* error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 一覧 */}
      <div style={{ marginTop: "20px" }}>
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "15px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
          >
            {/* ポスター */}
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/80"
              }
              alt={movie.Title}
              width="80"
            />

            <div style={{ flex: 1 }}>
              <p>{movie.Title}</p>

              <button onClick={() => toggleFavorite(movie)}>
                {favorites.find((f) => f.imdbID === movie.imdbID)
                  ? "★ Favorite"
                  : "☆ Add"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* お気に入り */}
      <h2>⭐ Favorites</h2>

      {favorites.length === 0 ? (
        <p>No favorites</p>
      ) : (
        favorites.map((movie) => (
          <div key={movie.imdbID} style={{ display: "flex", gap: "10px" }}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/50"
              }
              alt={movie.Title}
              width="50"
            />
            <p>{movie.Title}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
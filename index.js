import express, { json } from "express";
import { randomUUID } from "node:crypto";
import cors from "cors";

import { validateMovie, validatePartialMovie } from './schemas/movies.schemas.js'

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:8080",
        "http://localhost:1234",
        "https://movies.com",
        "https://midu.dev",
      ];

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.disable("x-powered-by"); // deshabilitar el header X-Powered-By: Express


app.get("/", (req, res) => {
  const { genre } = req.query; ////n para recuperar parametros por la url 
  
  res.json({ datos: "todas la peliculas" });
});

app.get("/movies", (req, res) => {
  const { genre } = req.query; ////n para recuperar parametros por la url 
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json({ datos: "todas la peliculas" });
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  //   const movie = movies.find((movie) => movie.id === id);
  //   if (movie) return res.json(movie);
  //   res.status(404).json({ message: "Movie not found" });
  if (id == "12") {
    res.json({ datos: `una pelicual con ${id}` });
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);

  if (!result.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  // en base de datos
  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data,
  };

  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  movies.splice(movieIndex, 1);

  return res.json({ message: "Movie deleted" });
});

const PORT = process.env.PORT ?? 1234; ///buscando PORT del sistema

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});

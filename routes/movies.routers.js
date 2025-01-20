import { Router } from "express";
import { randomUUID } from "node:crypto";
import { validateMovie, validatePartialMovie } from '../schemas/movies.schemas.js'

export const moviesRouter = Router()
const {crypto} = randomUUID()

///get de todas las peliculas 
moviesRouter.get('/',()=>{
    const { genre } = req.query; ////n para recuperar parametros por la url 
    if (genre) {
        // generar el filtro      
      return res.json({ datos: "todas la peliculas con filtro" });
    }
    res.json({ datos: "todas la peliculas" });
})

// get de un pelicula por ID
moviesRouter.get('/:id',(req, res) => {
  const { id } = req.params;
  if (id == "12") {
    res.json({ datos: `una pelicual con ${id}` });
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
})

// post para crear una pelicula
moviesRouter.post('/', (req, res) => {
  const result = validateMovie(req.body);
  if (!result.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  // en base de datos
  const newMovie = {
    id: crypto, // uuid v4
    ...result.data,
  };
  res.status(201).json(`se agrego correctamente con el ID  ${crypto}`);
})

// Delete para eliminar una pelicula con ID
moviesRouter.delete('/:id',(req, res) => {
    const { id } = req.params;
    if (id == "12") {
      res.json({ datos: `una pelicual a eliminar con el id ${id}` });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  })
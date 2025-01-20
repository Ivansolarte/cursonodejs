import express, { json } from "express";
import { moviesRouter } from "./routes/movies.routers.js";
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();
app.use(express.json());


app.use(corsMiddleware());

app.disable("x-powered-by"); // deshabilitar el header X-Powered-By: Express

app.get("/*", (req, res) => {
  const { genre } = req.query; ////n para recuperar parametros por la url   
  res.json({ datos: "estas en el home" });
});

// routas de las apis
app.use("/movies",moviesRouter)

const PORT = process.env.PORT ?? 1234; ///buscando PORT del sistema
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});

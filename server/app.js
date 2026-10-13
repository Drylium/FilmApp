import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get("/api/movies", (request, response) => {
  setTimeout(() => {
    return response.json(movies);
  }, 3000);
});

app.listen(port, () => {
  console.log(`Server is live, go to http://localhost:${port}`);
});
import app from "./app";

const PORT = 3004;

app.listen(PORT, () => {
  console.info(`app has started http://localhost:${PORT}`);
});

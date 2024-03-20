import app from "./app";
import { AppDataSource } from "./data-source";

const PORT = 3004;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.info(`app has started http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

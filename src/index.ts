import app, { port, host } from "./app";
import { testConnection as connectDB } from "./config";

connectDB(() => {
  app.listen(
    {
      port,
      host,
    },
    () => console.log(`Server is ready at: http://${host}:${port}`)
  );
});

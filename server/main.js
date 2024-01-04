const express = require("express");
const path = require("path");
const PORT = env.process.PORT || 3000;

const app = express();
app.enableCors();

const routes = ["webgl-urp-2d-sample"];
for (const route of routes) {
  app.use(
    route,
    express.static(path.join(__dirname, route), {
      cacheControl: "no-cache",
    })
  );
}

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

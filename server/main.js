const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;

const app = express();
app.enableCors();

app.get("/health", function (_req, res) {
  res.send(42);
});

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

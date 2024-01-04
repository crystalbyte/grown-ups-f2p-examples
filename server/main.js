const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3003;

const app = express();
app.use(cors());

app.get("/health", function (_req, res) {
  res.sendStatus(200);
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

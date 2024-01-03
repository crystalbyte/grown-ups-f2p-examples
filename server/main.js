const express = require("express");
const app = express();
const PORT = env.process.PORT || 3000;

app.use(express.static("webgl-urp-2d-sample/dist"));
app.enableCors();
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

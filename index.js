const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.get("/webapi", async (req, res) => {
  const restNum = req.query.restNum;
  const good = await fetch(
    "http://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=fJG3TBoTlbHyOI9f0VTK9lnW2re1zlt9culWOaM9v7PLCzmSLCYDv3RcjOgf5dG3QDmj%2BuxFv560JYq8z6G4%2FA%3D%3D&numOfRows=" +
      encodeURI(restNum) +
      "&pageNo=1&resultType=json"
  );
  const data = await good.json();
  if (!data) throw new Error("Fail to fetch data");
  res.send(data);
});
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);

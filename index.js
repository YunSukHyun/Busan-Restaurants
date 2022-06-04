const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))
app.get('/', (req, res) => res.send('Hello World'))
app.get('/webapi', (req, res) => {
    var request = require('request');
    const restNum = req.query.restNum;
    var options = {
        'method': 'GET',
        'url': 'http://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=fJG3TBoTlbHyOI9f0VTK9lnW2re1zlt9culWOaM9v7PLCzmSLCYDv3RcjOgf5dG3QDmj%2BuxFv560JYq8z6G4%2FA%3D%3D&numOfRows=' + encodeURI(restNum) + '&pageNo=1&resultType=json',
        'headers': {
        }
        
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(typeof(response));
        //console.log(response);
        
        res.send(response.body);
      });
})
app.listen(port, ()=> console.log(`Example app listening at http://localhost:${port}`))

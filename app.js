const express = require('express') //載入express套件

const exphbs = require('express-handlebars') //載入handlebars套件
const bodyParser = require("body-parser"); // 引用 body-parser

const routes = require("./routes"); // 引用路由器
require("./config/mongoose");

const app = express() 

const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main' , extname:'.hbs'})); //建立名稱為hbs的樣板，並傳入exphbs
app.set('view engine','hbs') //啟用稱為hbs的樣板引擎

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes); // 將 request 導入路由器


app.listen(port,()=>{
  console.log(`Express is running on http://localhost:${port}`);
})

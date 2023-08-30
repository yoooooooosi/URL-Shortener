const express = require('express') //載入express套件
const mongoose = require('mongoose') //載入mongoose套件
const exphbs = require('express-handlebars') //載入handlebars套件
const bodyParser = require("body-parser"); // 引用 body-parser
const URL = require('./models/url')

const app = express() 

const port = 3000

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('hbs', exphbs({ defaultLayout: 'main' , extname:'.hbs'})); //建立名稱為hbs的樣板，並傳入exphbs
app.set('view engine','hbs') //啟用稱為hbs的樣板引擎

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true,});

const db = mongoose.connection

db.on('error',()=>{
  console.log('mongodb error!')
})

db.once('open',()=>{
  console.log('mongodb connection!')
})

//剛進入的index頁面
app.get('/',(req,res)=>{
  res.render('index')
})

//
app.post('/',(req,res)=>{
  
  function sample(array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function shortenerurl(number) {
    let letterWithNumber = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomNumber = "";

    for (let i = 1; i <= number; i++) {
      randomNumber += sample(letterWithNumber);
    }

    return randomNumber;
  }

  const shortURL = shortenerurl(5);
  const NewRrl = 'localhost:3000/https://URL-shortener.herokuapp.com/' + shortURL

  

  URL.findOne({ OriginRrl: req.body.url })

    //例外處理01、先置資料庫尋找是否已有該網址
    .then((data) => {
      //如果有則回傳，沒有的話則建立
      if (data) {
        return data
      } else {
        return URL.create({ OriginRrl: req.body.url, NewRrl });
      }
    })
    //之後回傳頁面
    .then((url) => {
      res.redirect("/new");
    })
    .catch((error) => {
      console.log(error);
    });
})

app.get('/new',(req,res)=>{

  URL.findOne({})
    .sort({ _id: -1 })
    .lean()
    .then((url) => {
      res.render("new", { url });
    })
    .catch((error) => {
      console.log(error);
    });

})


app.listen(port,()=>{
  console.log(`Express is running on http://localhost:${port}`);
})

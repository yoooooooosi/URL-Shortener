const express = require('express') //載入express套件
const mongoose = require('mongoose') //載入mongoose套件
const exphbs = require('express-handlebars') //載入handlebars套件

const app = express() 

const port = 3000

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

app.get('/' ,(req,res)=>{
  res.render('index')
})

app.listen(port,()=>{
  console.log(`Express is running on http://localhost:${port}`);
})

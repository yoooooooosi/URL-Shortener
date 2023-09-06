// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

const URL = require("../../models/url"); // 引用  model

//剛進入的index頁面
router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", (req, res) => {
  //取得短網址
  const shortUrl = shortenerurl(5);

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

  const myInternet = "http://localhost:3000"; //我的app網域名稱
  const OriginRrl = req.body.url.trim(); //使用者所輸入的網址
  const NewRrl = shortUrl; //新創建的網址

  //從資料庫翻找是否符合req.body.url索回傳的資料
  URL.findOne({ OriginRrl })
    .then((url) => {
      // 如果找到了符合的 URL
      if (url) {
        return url;
      } else {
        return URL.create({ OriginRrl: req.body.url, NewRrl }); // 確保返回創建的值
      }
    })
    .then((url) => {
      // 確保url不是undefined或null
      if (url) {
        res.render("new", { NewRrl: url.NewRrl, myInternet });
      } else {
        throw new Error("URL創建失敗");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:NewRrl", (req, res) => {
  const NewRrl = req.params.NewRrl; //抓值進來

  URL.findOne({ NewRrl })
    .sort({ _id: -1 })
    .lean()
    .then((url) => {
      if (!url) {
        res.send(`
          <html>
            <body>
              <script>
                alert('URL不存在!');
                window.location.href = '/'; //重新導回首頁
              </script>
            </body>
          </html>
        `);
        return;
      }

      res.redirect(url.OriginRrl);
    })
    .catch((error) => {
      console.log(error);
    });
});


// 匯出路由模組
module.exports = router;

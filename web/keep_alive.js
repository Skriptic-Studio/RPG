const express = require("express")
let app = express()

app.set("views", "web")
app.set("view engine", "ejs")
app.use(express.json())

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/404", (req, res) => {
    res.render("404")
})

app.post('/test', function(req, res, next){
   res.send('got it!');
});

app.use(function(req, res, next){
  res.status(404);
	res.redirect('404')
});

app.listen(8080);
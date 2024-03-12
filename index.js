const express = require("express");
const app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.set('view engine', 'html');
// 静态资
let todo = [];
app.get("/", (request, response) => {
  // response.send('Hello World')
  // response.send([
  //     {name:'jeffrey'},
  //     {name:'jason'}
  // ])
  // console.log(__dirname);
  // response.sendFile(__dirname +'/index.html')
  response.render("index", {
    name: "jeffrey",
    gender: "male",
  });
});

app.get("/todo", (req, res) => {
  res.render("todo", {
    todo: todo,
  });
});
app.post("/todo", (request, response) => {
  console.log(request.body);
  const { name, title, content } = request.body;
  todo.push({
    name,
    title,
    content,
  });
  console.log(todo);
  response.redirect("todo");
});
app.post("/delete/:index", (request, response) => {
  console.log(request.params);
  const { index } = request.params;
  todo.splice(index, 1);
  response.redirect("/todo");
});

app.get("/edit/:index", (request, response) => {
  response.render("edit", {
    index: request.params.index,
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

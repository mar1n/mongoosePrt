var express = require("express"),
  db = require("./model/db"),
  routes = require("./routes"),
  user = require("./routes/user"),
  project = require("./routes/project"),
  http = require("http"),
  path = require("path");

var app = express();

app.configure(function () {
  app.set("port", process.env.PORT || 3000);
  app.set("views", __dirname + "/views");
  app.set("view engine", "jade");
  app.use(express.favicon());
  app.use(express.logger("dev"));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser("your secret here"));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, "public")));
});

app.configure("development", function () {
  app.use(express.errorHandler());
});

app.get("/", routes.index);

app.get("/users", user.index);
app.get("/user/new", user.create);
app.post("/user/new", user.doCreate);
app.get("/user/edit", user.edit);
app.post('/user/edit', user.doEdit);
app.get('/user/delete', user.confirmDelete);

app.post('/user/delete', user.doDelete);

app.get('/login', user.login);
app.post('/login', user.doLogin);
app.get('/logout', user.doLogout);

app.get('/project/new', project.create);
app.post('/project/new', project.doCreate);

app.get('/project/:id', project.displayInfo);
app.get('/project/edit/:id', project.edit);
app.post('/project/edit/:id', project.doEdit);
app.get('/project/delete/:id', project.confirmDelete);
app.get('/project/delete/:id', project.doDelete);




http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});

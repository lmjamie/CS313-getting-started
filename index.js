const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + "/views/pages");

app.get("/math", function get_math (request, response) {
  var op1 = Number(request.query.operand1);
  var op2 = Number(request.query.operand2);
  var op = request.query.operation
  var result = do_math(op, op1, op2);
  if ("Error" === result)
    return response.status(400).send("<p>Bad Operation</p>");

  response.render("result.ejs", {
    "operation": op,
    "op1": op1,
    "op2": op2,
    "result": result
  });
});

app.get("/math_service", function get_json(request, response) {
  var op1 = Number(request.query.operand1);
  var op2 = Number(request.query.operand2);
  var op = request.query.operation
  var result = do_math(op, op1, op2);
  if ("Error" === result)
    return response.status(400).json({"Error": "Bad Operation"});

  response.json({
    "operation": op,
    "op1": op1,
    "op2": op2,
    "result": result
  });
});

app.all("/", function go_home(req, res) {
  res.redirect(303, "/form.html");
});

function do_math(op, op1, op2) {
  switch (op) {
    case "Add":
      return op1 + op2;
      break;
    case "Subtract":
      return op1 - op2;
      break;
    case "Multiply":
      return op1 * op2;
      break;
    case "Divide":
      return op1 / op2;
      break;
    default:
      return "Error";
  }
}

const port = 5000;
app.listen(port, function () {
  console.log("We are listening to port " + port +"!");
});

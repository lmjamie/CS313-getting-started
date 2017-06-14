function sleak_math() {
  $.get({
    url: "/math_service",
    data: {
      operation: $("#operation").val(),
      operand1: $("#op1").val(),
      operand2: $("#op2").val()
    }
  }).done(function (data) {
    $("#result-div").removeAttr("hidden");
    $("#result").html(JSON.stringify(data));
  });
}

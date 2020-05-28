$(function () {
  // compile the template
  var content = [
    "<ul>",
    "{{#each products}}",
    "<li>{{this}}</li>",
    "{{/each}}",
    "</ul>",
  ].join("");

  var template = Handlebars.compile(content);

  $("#pagination-container").pagination({
    dataSource: function (done) {
      $.ajax({
        type: "GET",
        url: "api/products?sort=rating,desc&category=&name=",
        success: function (response) {
          debugger;
          done(response);
        },
      });
    },
    callback: function (data, pagination) {
      // template method of yourself
      var html = template({
        products: data,
      });
      $("#data-container").html(html);
    },
  });
});

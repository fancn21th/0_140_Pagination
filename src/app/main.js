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
    dataSource: function () {
      return [1, 2, 3, 4];
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

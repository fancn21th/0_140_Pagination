$(function () {
  // compile the template
  var content = [
    "<ul>",
    "{{#each products}}",
    "<li>{{this.name}}</li>",
    "{{/each}}",
    "</ul>",
  ].join("");

  var template = Handlebars.compile(content);

  var dcPageSize = 2;

  $("#pagination-container").pagination({
    dataSource: "api/products?sort=rating,desc&category=&name=",
    pageSize: dcPageSize,
    locator: "content",
    totalNumberLocator: function (response) {
      return response.totalPages;
    },
    callback: function (data, pagination) {
      // template method of yourself
      var html = template({
        products: data,
      });
      $("#data-container").html(html);
    },
    alias: {
      pageNumber: "page",
      pageSize: "size",
    },
  });
});

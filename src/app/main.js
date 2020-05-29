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

  var search = $("#search-txt");
  var pgContainer = $("#pagination-container");
  var dataContainer = $("#data-container");

  $("#search-btn").click(function () {
    createPg(pgContainer, dataContainer, search.val());
  });

  var createPg = function (container, dataContainer, searchParam) {
    container.pagination({
      dataSource: "api/products?sort=rating,desc&category=&name=" + searchParam,
      alias: {
        pageNumber: "page",
        pageSize: "size",
      },
      pageSize: dcPageSize,
      locator: "content",
      ajax: {
        beforeSend: function () {
          dataContainer.html("Loading data ...");
        },
      },
      totalNumberLocator: function (response) {
        return response.totalPages;
      },
      callback: function (data, pagination) {
        // template method of yourself
        var html = template({
          products: data,
        });
        dataContainer.html(html);
      },
    });
  };

  createPg(pgContainer, dataContainer, "");
});

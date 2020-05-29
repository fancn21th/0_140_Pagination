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

  var getNewUrl = function (url) {
    return url.replace(/(page=)(\d+)/, function (match, p1, p2) {
      return p1 + (parseInt(p2) - 1);
    });
  };

  var createPg = function (pgContainer, dataContainer, searchParam) {
    pgContainer.destroy && pgContainer.destroy();
    pgContainer.pagination({
      dataSource: "api/products?sort=rating,desc&category=&name=" + searchParam,
      alias: {
        pageNumber: "page",
        pageSize: "size",
      },
      pageSize: dcPageSize,
      locator: "content",
      ajax: {
        beforeSend: function () {
          const newUrl = getNewUrl(this.url);
          this.url = newUrl;
          dataContainer.html("Loading data ...");
        },
      },
      totalNumberLocator: function (response) {
        return response.totalElements;
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

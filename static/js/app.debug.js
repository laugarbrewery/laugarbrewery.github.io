(function() {
  (function() {
    var Laugar;
    Laugar = (function() {
      Laugar.prototype.loaders = [];

      function Laugar() {}

      Laugar.prototype.onload = function(fn) {
        return this.loaders.push(fn);
      };

      Laugar.prototype.init = function() {
        var fn, i, len, ref, results;
        ref = this.loaders;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          fn = ref[i];
          results.push(typeof fn === "function" ? fn() : void 0);
        }
        return results;
      };

      return Laugar;

    })();
    return window.Laugar = new Laugar;
  })();

  $(function() {
    var $footer, $header, $main, height;
    $main = $("#main");
    $header = $("#header");
    $footer = $("#footer");
    height = (function() {
      var footerHeight, result;
      footerHeight = $footer.find("#beers").outerHeight();
      result = document.body.offsetHeight - $header.outerHeight();
      if (footerHeight > 0) {
        result = result - footerHeight;
      }
      return result;
    })();
    $main.css("min-height", height);
    $main.find("#overlay").css("min-height", $main.css("min-height"));
    return Laugar.init();
  });

}).call(this);

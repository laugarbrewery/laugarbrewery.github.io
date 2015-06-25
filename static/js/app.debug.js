(function() {
  var slice = [].slice;

  (function() {
    var Laugar;
    Laugar = (function() {
      Laugar.prototype.loaders = [];

      Laugar.prototype.tuk = TukTuk;

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

      Laugar.prototype.prompt = function() {
        var args, ref;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return (ref = TukTuk.Modal).prompt.apply(ref, args);
      };

      Laugar.prototype.alert = function() {
        var args, ref;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return (ref = TukTuk.Modal).alert.apply(ref, args);
      };

      Laugar.prototype.confirm = function(message, true_cb, false_cb) {
        return TukTuk.Modal.confirm(message, true_cb, false_cb);
      };

      return Laugar;

    })();
    return window.Laugar = new Laugar;
  })();

  $(function() {
    return Laugar.init();
  });

  window.Key = (function() {
    Key.MODEL = "keys";

    Key.prototype.key = void 0;

    Key.prototype.value = void 0;

    function Key(key) {
      var model, models;
      models = Laugar.tabletop.getModel(this.constructor.MODEL);
      model = models.all().filter(function(item) {
        return item.key === key;
      })[0];
      this.key = model.key;
      this.value = model.value;
    }

    return Key;

  })();

  (function() {
    var API, MailGun, TabletopHelper;
    API = (function() {
      API.prototype.path = "";

      function API(path1) {
        this.path = path1;
      }

      API.prototype.execute = function(message, path, method, callback) {
        var xhr;
        if (message == null) {
          message = {};
        }
        xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function(event) {
          if (xhr.readyState === 4) {
            return typeof callback === "function" ? callback(event.target) : void 0;
          }
        };
        xhr.open(method, this.path + path, true);
        if (method === "POST" || method === "PUT" || method === "PATCH") {
          return xhr.send(JSON.stringify(message));
        } else {
          return xhr.send();
        }
      };

      API.prototype._get = function(path, callback) {
        return this.execute(null, path, "GET", callback);
      };

      API.prototype._post = function(message, path, callback) {
        return this.execute(message, path, "POST", callback);
      };

      API.prototype._put = function(message, path, callback) {
        return this.execute(message, path, "PUT", callback);
      };

      API.prototype._del = function(path, callback) {
        return this.execute(null, path, "DELETE", callback);
      };

      return API;

    })();
    MailGun = (function() {
      MailGun.prototype.path = void 0;

      function MailGun(url, key) {
        url = new URL(url);
        url.hostname = key + "@" + url.hostname;
        this.path = url.toString().replace("%40", "@");
      }

      MailGun.prototype.sendMail = function(request, callback) {
        var form, iframe, input, item;
        form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", this.path + "/messages");
        for (item in request) {
          input = document.createElement("input");
          input.setAttribute("type", "hidden");
          input.setAttribute("name", item);
          input.setAttribute("value", request[item]);
          form.appendChild(input);
        }
        iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        iframe.contentDocument.body.appendChild(form);
        iframe.onload = function(data) {
          data.target.remove();
          return typeof callback === "function" ? callback() : void 0;
        };
        return form.submit();
      };

      return MailGun;

    })();
    TabletopHelper = (function() {
      TabletopHelper.prototype.tabletop = {};

      function TabletopHelper(key, callback) {
        Tabletop.init({
          key: key,
          callback: (function(_this) {
            return function(data, tabletop) {
              _this.tabletop = tabletop;
              return typeof callback === "function" ? callback(_this) : void 0;
            };
          })(this),
          simpleSheet: false
        });
      }

      TabletopHelper.prototype.getModel = function(key) {
        return this.tabletop.models[key];
      };

      return TabletopHelper;

    })();
    Laugar.tabletop = new TabletopHelper("1aosZztzhSE4RD7xDBOym0kuI-2aCf6P6FTj91X0SpZM", function() {
      return Laugar.mailgun = (function() {
        var key, url;
        key = new Key("mailgun");
        url = new Key("mailgun-url");
        return new MailGun(url.value, key.value);
      })();
    });
    return Laugar.testMail = {
      from: "a.berzosa.iglesias@gmail.com",
      to: "aberigle@uhurus.com",
      subject: "holi",
      text: "hello world!"
    };
  })();

}).call(this);

(function() {
  var CalendarManager, CalorieManager, JsonManager;

  JsonManager = {
    getJsonData: function(callback) {
      var req;
      req = new XMLHttpRequest();
      req.open("GET", "https://tanjoin.github.io/calorie-memo/data.json", true);
      req.onload = callback;
      req.send();
    },
    getData: function(callback) {
      return JsonManager.getJsonData(function() {
        var data;
        data = JSON.parse(this.responseText);
        callback(data.templates);
      });
    }
  };

  CalendarManager = {
    makeUrl: function(content) {
      var url;
      if (content == null) {
        return "";
      }
      url = "https://www.google.com/calendar/event?action=TEMPLATE" + "&text=" + encodeURIComponent(content.name + " [" + content.company + "]") + "&details=" + encodeURIComponent(content.energy + "kcal\n") + "&dates=" + CalendarManager.getUTC(new Date()) + "&trp=false" + "&sprop=" + encodeURIComponent('https://tanjoin.github.io/calorie-memo') + "&sprop=" + 'name:' + encodeURIComponent('calorie-memo');
      return url;
    },
    getUTC: function(date) {
      return date.getUTCFullYear() + CalendarManager.zerofill(date.getUTCMonth() + 1) + CalendarManager.zerofill(date.getUTCDate()) + 'T' + CalendarManager.zerofill(date.getUTCHours()) + CalendarManager.zerofill(date.getUTCMinutes()) + CalendarManager.zerofill(date.getUTCSeconds()) + 'Z';
    },
    zerofill: function(num) {
      return ('0' + num).slice(-2);
    }
  };

  CalorieManager = {
    convertToSalt: function(sodium) {
      return sodium * 2.54 / 1000;
    },
    convertToSodium: function(salt) {
      return salt / 2.54 * 1000;
    },
    makeHtml: function(content) {
      var a, action, card, h4, i, sText, spacer, title;
      card = document.createElement('div');
      card.id = content.id;
      card.className = "card-event mdl-card mdl-shadow--2dp";
      title = document.createElement('div');
      title.className = "mdl-card__title mdl-card--expand";
      h4 = document.createElement('h4');
      h4.innerText = content.name;
      title.appendChild(h4);
      card.appendChild(title);
      sText = document.createElement('div');
      sText.className = "mdl-card__supporting-text";
      sText.innerHtml = content.energy + "kcal<br>";
      sText.innerHtml += "たんぱく質 " + content.protein + content.protein_unit;
      sText.innerHtml += "<br>";
      sText.innerHtml += "脂質 " + content.fat + content.fat_unit;
      sText.innerHtml += "<br>";
      sText.innerHtml += "炭水化物 " + content.carbohydrate + content.carbohydrate_unit;
      sText.innerHtml += "<br>";
      sText.innerHtml += "ナトリウム " + content.na + content.na_unit;
      card.appendChild(sText);
      action = document.createElement('div');
      action.className = "mdl-card__actions mdl-card--border";
      a = document.createElement('a');
      a.className = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect";
      a.innerText = "Add to Calendar";
      action.appendChild(a);
      spacer = document.createElement('div');
      spacer.className = mdl - layout - spacer;
      action.appendChild(spacer);
      i = document.createElement('i');
      i.className = "material-icons";
      i.innerText = "event";
      action.appendChild(i);
      card.appendChild(action);
      return card;
    }
  };

}).call(this);

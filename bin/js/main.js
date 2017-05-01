(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var calorie, getDataUrl, getDetails, getText, getUTC, zerofill;

calorie = require('./calorie');

exports.makeUrl = function(content) {
  var date;
  if (content == null) {
    return "";
  }
  date = getUTC(new Date());
  return "https://www.google.com/calendar/event?action=TEMPLATE" + ("&text=" + (getText(content))) + ("&details=" + (getDetails(content))) + ("&dates=" + date + "/" + date);
};

getUTC = function(date) {
  return date.getUTCFullYear() + zerofill(date.getUTCMonth() + 1) + zerofill(date.getUTCDate()) + 'T' + zerofill(date.getUTCHours()) + zerofill(date.getUTCMinutes()) + zerofill(date.getUTCSeconds()) + 'Z';
};

zerofill = function(num) {
  return ('0' + num).slice(-2);
};

getText = function(content) {
  return encodeURIComponent(content.name + " " + (calorie.toString(content.energy)));
};

getDetails = function(content) {
  return encodeURIComponent(calorie.getDetails(content, false));
};

getDataUrl = function(content) {
  var url;
  url = 'https://tanjoin.github.io/calorie-memo?id=';
  return encodeURIComponent(url + content.id);
};


},{"./calorie":2}],2:[function(require,module,exports){
var toString;

exports.convertToSalt = function(sodium) {
  return sodium * 2.54 / 1000;
};

exports.convertToSodium = function(salt) {
  return salt / 2.54 * 1000;
};

exports.calcCarbohydrate = function(saccharide, dietary_fiber) {
  return saccharide + dietary_fiber;
};

exports.getDetails = function(content, isShowEnergy, isShowVolume) {
  var details;
  if (isShowEnergy == null) {
    isShowEnergy = true;
  }
  if (isShowVolume == null) {
    isShowVolume = true;
  }
  details = "";
  if (content.id != null) {
    details += "ID " + content.id + "\nhttps://tanjo.in/calorie-memo/?id=" + content.id + "\n";
  }
  if ((content.energy != null) && isShowEnergy) {
    details += (toString(content.energy)) + "\n";
  }
  if (content.protein != null) {
    details += "たんぱく質 " + (toString(content.protein)) + "\n";
  }
  if (content.fat != null) {
    details += "脂質 " + (toString(content.fat)) + "\n";
  }
  if (content.carbohydrate != null) {
    details += "炭水化物 " + (toString(content.carbohydrate)) + "\n";
  }
  if (content.saccharide != null) {
    details += "糖質 " + (toString(content.saccharide)) + "\n";
  }
  if (content.dietary_fiber != null) {
    details += "食物繊維 " + (toString(content.dietary_fiber)) + "\n";
  }
  if (content.na != null) {
    details += "Na " + (toString(content.na)) + "\n";
  }
  if (content.salt != null) {
    details += "食塩相当量 " + (toString(content.salt)) + "\n";
  }
  if (content.ca != null) {
    details += "Ca " + (toString(content.ca)) + "\n";
  }
  if (content.mg != null) {
    details += "Mg " + (toString(content.mg)) + "\n";
  }
  if (content.k != null) {
    details += "K " + (toString(content.k)) + "\n";
  }
  if (content.p != null) {
    details += "P " + (toString(content.p)) + "\n";
  }
  if (content.hardness != null) {
    details += "硬度 " + (toString(content.hardness)) + "\n";
  }
  if (content.ph != null) {
    details += "ph " + (toString(content.ph)) + "\n";
  }
  if ((content.volume != null) && isShowVolume) {
    details += "内容量 " + (toString(content.volume)) + "\n";
  }
  if (content.per != null) {
    details += (toString(content.per)) + "あたり\n";
  }
  return details;
};

toString = function(item) {
  var text;
  if (typeof item.value === 'number') {
    text = "" + item.value;
    if (item.about != null) {
      text = "約" + text;
    }
    if (item.unit != null) {
      text += "" + item.unit;
    }
    if (item.under != null) {
      text += "未満";
    }
    if (item.remark != null) {
      text += " (" + item.remark + ")";
    }
    return text;
  } else if (typeof item.value === 'object' && (item.value.max != null) && (item.value.min != null)) {
    text = item.value.min + "〜" + item.value.max;
    if (item.about != null) {
      text = "約" + text;
    }
    if (item.unit != null) {
      text += "" + item.unit;
    }
    if (item.under != null) {
      text += "未満";
    }
    if (item.remark != null) {
      text += " (" + item.remark + ")";
    }
    return text;
  }
  return "";
};

exports.toString = toString;


},{}],3:[function(require,module,exports){
var grids, makeButton, makeCreateButton, makeCreateButtonGrid, makeDiv, makeGrid, makeInput, makeJson, makeLabel, makeSpacer, showResult;

grids = [
  {
    prefix: "id",
    text: "ID",
    hasInput: false,
    radiobtns: null,
    isValue: false
  }, {
    prefix: "name",
    text: "商品名",
    hasInput: true,
    radiobtns: null,
    isValue: false
  }, {
    prefix: "company",
    text: "会社名",
    hasInput: true,
    radiobtns: null,
    isValue: false
  }, {
    prefix: "energy",
    text: "カロリー",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "protein",
    text: "たんぱく質",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "fat",
    text: "脂質",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "carbohydrate",
    text: "炭水化物",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "na",
    text: "ナトリウム",
    hasInput: true,
    radiobtns: ["mg", "g"],
    isValue: true
  }, {
    prefix: "salt",
    text: "食塩相当量",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "volume",
    text: "内容量",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "per",
    text: "○○あたり",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "ca",
    text: "カルシウム",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "mg",
    text: "マグネシウム",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "k",
    text: "カリウム",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }
];

makeJson = function(data) {
  return JSON.stringify(data);
};

exports.initView = function() {
  var contents, grid, i, len;
  contents = document.getElementById('contents-create');
  for (i = 0, len = grids.length; i < len; i++) {
    grid = grids[i];
    contents.appendChild(makeGrid(grid.prefix, grid.text, grid.hasInput, grid.radiobtns));
  }
  contents.appendChild(makeCreateButtonGrid());
  return contents;
};

showResult = function() {
  var grid, i, input, len, obj, result;
  result = document.getElementById('result-create');
  obj = {};
  for (i = 0, len = grids.length; i < len; i++) {
    grid = grids[i];
    if (!grid.hasInput) {
      continue;
    }
    input = document.getElementById(grid.prefix + "-input");
    if ((input.value != null) && input.value.length > 0) {
      if (grid.isValue) {
        obj[grid.prefix] = {};
        obj[grid.prefix]["value"] = parseInt(input.value);
      } else {
        obj[gird.prefix] = input.value;
      }
    }
  }
  return result.innerText = makeJson(obj);
};

makeCreateButtonGrid = function() {
  var btn, grid;
  grid = makeDiv(null, "mdl-grid");
  grid.appendChild(makeSpacer());
  btn = makeCreateButton();
  btn.addEventListener('click', showResult);
  grid.appendChild(btn);
  grid.appendChild(makeSpacer());
  return grid;
};

makeCreateButton = function() {
  return makeButton("create-button", "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent", "作成");
};

makeButton = function(id, className, text) {
  var button;
  button = document.createElement('button');
  if (id != null) {
    button.id = id;
  }
  if (className != null) {
    button.className = className;
  }
  button.innerText = text;
  return button;
};

makeGrid = function(idPrefix, text, hasInput, radiobtns) {
  var cell, grid, input, label, radioCell, textFiled;
  if (hasInput == null) {
    hasInput = true;
  }
  grid = makeDiv(null, "mdl-grid");
  grid.appendChild(makeSpacer());
  cell = makeDiv(null, "mdl-cell mdl-cell--4-col");
  grid.appendChild(cell);
  textFiled = makeDiv(null, "mdl-textfield mdl-js-textfield");
  cell.appendChild(textFiled);
  if (hasInput) {
    input = makeInput(idPrefix + "-input", "mdl-textfield__input", "text");
    input.pattern = "-?[0-9]*(\.[0-9]+)?";
    textFiled.appendChild(input);
  }
  label = makeLabel(null, "mdl-textfield__label", idPrefix + "-input", text);
  textFiled.appendChild(label);
  if (radiobtns != null) {
    radioCell = makeDiv(null, "mdl-cell mdl-cell--4-col");
    grid.appendChild(radioCell);
  } else {
    grid.appendChild(makeDiv(null, "mdl-cell mdl-cell--4-col"));
  }
  grid.appendChild(makeSpacer());
  return grid;
};

makeDiv = function(id, className) {
  var div;
  div = document.createElement('div');
  if (id != null) {
    div.id = id;
  }
  if (className != null) {
    div.className = className;
  }
  return div;
};

makeLabel = function(id, className, htmlFor, text, value) {
  var label;
  label = document.createElement('label');
  if (id != null) {
    label.id = id;
  }
  if (className != null) {
    label.className = className;
  }
  if (htmlFor != null) {
    label.htmlFor = htmlFor;
  }
  if (text != null) {
    label.textContent = text;
  }
  if (value != null) {
    label.value = value;
  }
  return label;
};

makeInput = function(id, className, type) {
  var input;
  input = document.createElement('input');
  if (id != null) {
    input.id = id;
  }
  if (className != null) {
    input.className = className;
  }
  if (type != null) {
    input.type = type;
  }
  return input;
};

makeSpacer = function() {
  return makeDiv(null, "mdl-layout-spacer");
};


},{}],4:[function(require,module,exports){
var getJsonData;

getJsonData = function(callback) {
  var req;
  req = new XMLHttpRequest();
  req.open("GET", "https://tanjo.in/calorie-memo/data.json", true);
  req.onload = callback;
  req.send();
};

exports.getData = function(callback) {
  getJsonData(function() {
    var data;
    data = JSON.parse(this.responseText);
    return callback(data.templates);
  });
};


},{}],5:[function(require,module,exports){
var calorieData, creator, data, didSearchInputTextChanged, view;

data = require('./data');

view = require('./view');

creator = require('./creator');

calorieData = [];

window.onload = function() {
  var create, input, resultDiv;
  resultDiv = document.getElementById('result');
  if (resultDiv != null) {
    data.getData(function(data) {
      var d, i, len;
      calorieData = data;
      for (i = 0, len = calorieData.length; i < len; i++) {
        d = calorieData[i];
        resultDiv.appendChild(view.makeHtml(d));
      }
    });
  }
  input = document.getElementById('search-input');
  if (input != null) {
    input.addEventListener('change', didSearchInputTextChanged);
  }
  create = document.getElementById('contents-create');
  if (create != null) {
    creator.initView();
  }
  new Clipboard('.clipboard');
};

didSearchInputTextChanged = function() {
  var d, i, input, len, list, resultDiv;
  resultDiv = document.getElementById('result');
  input = document.getElementById('search-input');
  if (!((resultDiv != null) && (input != null))) {
    return;
  }
  while (resultDiv.firstChild) {
    resultDiv.removeChild(resultDiv.firstChild);
  }
  list = calorieData;
  if (input.value.length > 0) {
    list = calorieData.filter(function(element, index, array) {
      return element.name.indexOf(input.value) !== -1 || (element.company && element.company.indexOf(input.value) !== -1);
    });
  }
  for (i = 0, len = list.length; i < len; i++) {
    d = list[i];
    resultDiv.appendChild(view.makeHtml(d));
  }
};


},{"./creator":3,"./data":4,"./view":6}],6:[function(require,module,exports){
var calendar, calorie, getSupprtText, makeA, makeChip, makeDiv, makeH4, makeI, makeSpacer;

calendar = require('./calendar');

calorie = require('./calorie');

exports.makeHtml = function(content) {
  var actionDiv, cardDiv, supportTextDiv, title, titleDiv;
  cardDiv = makeDiv(content.id, "card-event mdl-card mdl-shadow--2dp");
  titleDiv = makeDiv(null, "mdl-card__title mdl-card--expand");
  if (content.company != null) {
    titleDiv.appendChild(makeChip(content.company));
  }
  title = "" + content.name;
  if (content.volume != null) {
    title += "" + (calorie.toString(content.volume));
  }
  titleDiv.appendChild(makeH4(title));
  cardDiv.appendChild(titleDiv);
  supportTextDiv = makeDiv(null, "mdl-card__supporting-text");
  supportTextDiv.innerText = getSupprtText(content);
  cardDiv.appendChild(supportTextDiv);
  actionDiv = makeDiv(null, "mdl-card__actions mdl-card--border");
  actionDiv.appendChild(makeA("mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect", "Add to Calendar", calendar.makeUrl(content)));
  actionDiv.appendChild(makeSpacer());
  actionDiv.appendChild(makeI("material-icons", "event"));
  cardDiv.appendChild(actionDiv);
  return cardDiv;
};

makeSpacer = function() {
  return makeDiv(null, "mdl-layout-spacer");
};

exports.makeSpacer = makeSpacer;

makeDiv = function(id, className) {
  var d;
  d = document.createElement('div');
  if (id != null) {
    d.id = id;
  }
  if (className != null) {
    d.className = className;
  }
  return d;
};

makeH4 = function(text) {
  var h4;
  h4 = document.createElement('h4');
  if (text != null) {
    h4.innerText = text;
  }
  return h4;
};

makeA = function(className, text, href) {
  var a;
  a = document.createElement('a');
  if (className != null) {
    a.className = className;
  }
  if (text != null) {
    a.innerText = text;
  }
  if (href != null) {
    a.href = href;
  }
  a.target = "_blank";
  return a;
};

makeI = function(className, text) {
  var i;
  i = document.createElement('i');
  if (className != null) {
    i.className = className;
  }
  if (text != null) {
    i.innerText = text;
  }
  return i;
};

makeChip = function(text) {
  var mdlChipContact;
  mdlChipContact = document.createElement('span');
  mdlChipContact.className = "mdl-chip__contact mdl-color--teal mdl-color-text--white";
  mdlChipContact.innerText = text.substr(0, 1);
  return mdlChipContact;
};

getSupprtText = function(content) {
  return calorie.getDetails(content, true, false);
};


},{"./calendar":1,"./calorie":2}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9jb2ZmZWUvY2FsZW5kYXIuY29mZmVlIiwic3JjL2NvZmZlZS9jYWxvcmllLmNvZmZlZSIsInNyYy9jb2ZmZWUvY3JlYXRvci5jb2ZmZWUiLCJzcmMvY29mZmVlL2RhdGEuY29mZmVlIiwic3JjL2NvZmZlZS9pbmRleC5jb2ZmZWUiLCJzcmMvY29mZmVlL3ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFdBQVI7O0FBRVYsT0FBTyxDQUFDLE9BQVIsR0FBa0IsU0FBQyxPQUFEO0FBQ2hCLE1BQUE7RUFBQSxJQUFPLGVBQVA7QUFDRSxXQUFPLEdBRFQ7O0VBR0EsSUFBQSxHQUFPLE1BQUEsQ0FBTyxJQUFJLElBQUosQ0FBQSxDQUFQO0FBRVAsU0FBTyx1REFBQSxHQUNMLENBQUEsUUFBQSxHQUFRLENBQUMsT0FBQSxDQUFRLE9BQVIsQ0FBRCxDQUFSLENBREssR0FFTCxDQUFBLFdBQUEsR0FBVyxDQUFDLFVBQUEsQ0FBVyxPQUFYLENBQUQsQ0FBWCxDQUZLLEdBR0wsQ0FBQSxTQUFBLEdBQVUsSUFBVixHQUFlLEdBQWYsR0FBa0IsSUFBbEI7QUFUYzs7QUFXbEIsTUFBQSxHQUFTLFNBQUMsSUFBRDtBQUNQLFNBQU8sSUFBSSxDQUFDLGNBQUwsQ0FBQSxDQUFBLEdBQ0wsUUFBQSxDQUFTLElBQUksQ0FBQyxXQUFMLENBQUEsQ0FBQSxHQUFtQixDQUE1QixDQURLLEdBRUwsUUFBQSxDQUFTLElBQUksQ0FBQyxVQUFMLENBQUEsQ0FBVCxDQUZLLEdBR0wsR0FISyxHQUlMLFFBQUEsQ0FBUyxJQUFJLENBQUMsV0FBTCxDQUFBLENBQVQsQ0FKSyxHQUtMLFFBQUEsQ0FBUyxJQUFJLENBQUMsYUFBTCxDQUFB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QUEsY0FBQSxHQUFpQixRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QjtFQUNqQixjQUFjLENBQUMsU0FBZixHQUNFO0VBQ0YsY0FBYyxDQUFDLFNBQWYsR0FBMkIsSUFBSSxDQUFDLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZjtBQUMzQixTQUFPO0FBTEU7O0FBT1gsYUFBQSxHQUFnQixTQUFDLE9BQUQ7QUFDZCxTQUFPLE9BQU8sQ0FBQyxVQUFSLENBQW1CLE9BQW5CLEVBQTRCLElBQTVCLEVBQWtDLEtBQWxDO0FBRE8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2Fsb3JpZSA9IHJlcXVpcmUoJy4vY2Fsb3JpZScpXG5cbmV4cG9ydHMubWFrZVVybCA9IChjb250ZW50KSAtPlxuICB1bmxlc3MgY29udGVudD9cbiAgICByZXR1cm4gXCJcIlxuXG4gIGRhdGUgPSBnZXRVVEMobmV3IERhdGUoKSlcblxuICByZXR1cm4gXCJodHRwczovL3d3dy5nb29nbGUuY29tL2NhbGVuZGFyL2V2ZW50P2FjdGlvbj1URU1QTEFURVwiICtcbiAgICBcIiZ0ZXh0PSN7Z2V0VGV4dChjb250ZW50KX1cIiArXG4gICAgXCImZGV0YWlscz0je2dldERldGFpbHMoY29udGVudCl9XCIgK1xuICAgIFwiJmRhdGVzPSN7ZGF0ZX0vI3tkYXRlfVwiXG5cbmdldFVUQyA9IChkYXRlKSAtPlxuICByZXR1cm4gZGF0ZS5nZXRVVENGdWxsWWVhcigpICtcbiAgICB6ZXJvZmlsbChkYXRlLmdldFVUQ01vbnRoKCkrMSkgK1xuICAgIHplcm9maWxsKGRhdGUuZ2V0VVRDRGF0ZSgpKSArXG4gICAgJ1QnICtcbiAgICB6ZXJvZmlsbChkYXRlLmdldFVUQ0hvdXJzKCkpICtcbiAgICB6ZXJvZmlsbChkYXRlLmdldFVUQ01pbnV0ZXMoKSkgK1xuICAgIHplcm9maWxsKGRhdGUuZ2V0VVRDU2Vjb25kcygpKSArXG4gICAgJ1onXG5cbnplcm9maWxsID0gKG51bSkgLT5cbiAgcmV0dXJuICgnMCcgKyBudW0pLnNsaWNlKC0yKVxuXG5nZXRUZXh0ID0gKGNvbnRlbnQpIC0+XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoXG4gICAgXCIje2NvbnRlbnQubmFtZX0gI3tjYWxvcmllLnRvU3RyaW5nKGNvbnRlbnQuZW5lcmd5KX1cIlxuICApXG5cbmdldERldGFpbHMgPSAoY29udGVudCkgLT5cbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCBjYWxvcmllLmdldERldGFpbHMgY29udGVudCwgZmFsc2VcblxuZ2V0RGF0YVVybCA9IChjb250ZW50KSAtPlxuICB1cmwgPSAnaHR0cHM6Ly90YW5qb2luLmdpdGh1Yi5pby9jYWxvcmllLW1lbW8/aWQ9J1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHVybCArIGNvbnRlbnQuaWQpXG4iLCJleHBvcnRzLmNvbnZlcnRUb1NhbHQgPSAoc29kaXVtKSAtPlxuICByZXR1cm4gc29kaXVtICogMi41NCAvIDEwMDBcblxuZXhwb3J0cy5jb252ZXJ0VG9Tb2RpdW0gPSAoc2FsdCkgLT5cbiAgcmV0dXJuIHNhbHQgLyAyLjU0ICogMTAwMFxuXG5leHBvcnRzLmNhbGNDYXJib2h5ZHJhdGUgPSAoc2FjY2hhcmlkZSwgZGlldGFyeV9maWJlcikgLT5cbiAgcmV0dXJuIHNhY2NoYXJpZGUgKyBkaWV0YXJ5X2ZpYmVyXG5cbmV4cG9ydHMuZ2V0RGV0YWlscyA9IChjb250ZW50LCBpc1Nob3dFbmVyZ3kgPSB0cnVlLCBpc1Nob3dWb2x1bWUgPSB0cnVlKSAtPlxuICBkZXRhaWxzID0gXCJcIlxuICBkZXRhaWxzICs9IFwiSUQgI3tjb250ZW50LmlkfVxcbmh0dHBzOi8vdGFuam8uaW4vY2Fsb3JpZS1tZW1vLz9pZD0je2NvbnRlbnQuaWR9XFxuXCIgaWYgY29udGVudC5pZD9cbiAgZGV0YWlscyArPSBcIiN7dG9TdHJpbmcoY29udGVudC5lbmVyZ3kpfVxcblwiIGlmIGNvbnRlbnQuZW5lcmd5PyBhbmQgaXNTaG93RW5lcmd5XG4gIGRldGFpbHMgKz0gXCLjgZ/jgpPjgbHjgY/os6ogI3t0b1N0cmluZyhjb250ZW50LnByb3RlaW4pfVxcblwiIGlmIGNvbnRlbnQucHJvdGVpbj9cbiAgZGV0YWlscyArPSBcIuiEguizqiAje3RvU3RyaW5nKGNvbnRlbnQuZmF0KX1cXG5cIiBpZiBjb250ZW50LmZhdD9cbiAgZGV0YWlscyArPSBcIueCreawtOWMlueJqSAje3RvU3RyaW5nKGNvbnRlbnQuY2FyYm9oeWRyYXRlKX1cXG5cIiBpZiBjb250ZW50LmNhcmJvaHlkcmF0ZT9cbiAgZGV0YWlscyArPSBcIuezluizqiAje3RvU3RyaW5nKGNvbnRlbnQuc2FjY2hhcmlkZSl9XFxuXCIgaWYgY29udGVudC5zYWNjaGFyaWRlP1xuICBkZXRhaWxzICs9IFwi6aOf54mp57mK57atICN7dG9TdHJpbmcoY29udGVudC5kaWV0YXJ5X2ZpYmVyKX1cXG5cIiBpZiBjb250ZW50LmRpZXRhcnlfZmliZXI/XG4gIGRldGFpbHMgKz0gXCJOYSAje3RvU3RyaW5nKGNvbnRlbnQubmEpfVxcblwiIGlmIGNvbnRlbnQubmE/XG4gIGRldGFpbHMgKz0gXCLpo5/loannm7jlvZPph48gI3t0b1N0cmluZyhjb250ZW50LnNhbHQpfVxcblwiIGlmIGNvbnRlbnQuc2FsdD9cbiAgZGV0YWlscyArPSBcIkNhICN7dG9TdHJpbmcoY29udGVudC5jYSl9XFxuXCIgaWYgY29udGVudC5jYT9cbiAgZGV0YWlscyArPSBcIk1nICN7dG9TdHJpbmcoY29udGVudC5tZyl9XFxuXCIgaWYgY29udGVudC5tZz9cbiAgZGV0YWlscyArPSBcIksgI3t0b1N0cmluZyhjb250ZW50LmspfVxcblwiIGlmIGNvbnRlbnQuaz9cbiAgZGV0YWlscyArPSBcIlAgI3t0b1N0cmluZyhjb250ZW50LnApfVxcblwiIGlmIGNvbnRlbnQucD9cbiAgZGV0YWlscyArPSBcIuehrOW6piAje3RvU3RyaW5nKGNvbnRlbnQuaGFyZG5lc3MpfVxcblwiIGlmIGNvbnRlbnQuaGFyZG5lc3M/XG4gIGRldGFpbHMgKz0gXCJwaCAje3RvU3RyaW5nKGNvbnRlbnQucGgpfVxcblwiIGlmIGNvbnRlbnQucGg/XG4gIGRldGFpbHMgKz0gXCLlhoXlrrnph48gI3t0b1N0cmluZyhjb250ZW50LnZvbHVtZSl9XFxuXCIgaWYgY29udGVudC52b2x1bWU/IGFuZCBpc1Nob3dWb2x1bWVcbiAgZGV0YWlscyArPSBcIiN7dG9TdHJpbmcoY29udGVudC5wZXIpfeOBguOBn+OCilxcblwiIGlmIGNvbnRlbnQucGVyP1xuICByZXR1cm4gZGV0YWlsc1xuXG50b1N0cmluZyA9IChpdGVtKSAtPlxuICBpZiB0eXBlb2YgaXRlbS52YWx1ZSBpcyAnbnVtYmVyJ1xuICAgIHRleHQgPSBcIiN7aXRlbS52YWx1ZX1cIlxuICAgIHRleHQgPSBcIue0hFwiICsgdGV4dCBpZiBpdGVtLmFib3V0P1xuICAgIHRleHQgKz0gXCIje2l0ZW0udW5pdH1cIiBpZiBpdGVtLnVuaXQ/XG4gICAgdGV4dCArPSBcIuacqua6gFwiIGlmIGl0ZW0udW5kZXI/XG4gICAgdGV4dCArPSBcIiAoI3tpdGVtLnJlbWFya30pXCIgaWYgaXRlbS5yZW1hcms/XG4gICAgcmV0dXJuIHRleHRcbiAgZWxzZSBpZiB0eXBlb2YgaXRlbS52YWx1ZSBpcyAnb2JqZWN0JyBhbmQgaXRlbS52YWx1ZS5tYXg/IGFuZCBpdGVtLnZhbHVlLm1pbj9cbiAgICB0ZXh0ID0gXCIje2l0ZW0udmFsdWUubWlufeOAnCN7aXRlbS52YWx1ZS5tYXh9XCJcbiAgICB0ZXh0ID0gXCLntIRcIiArIHRleHQgaWYgaXRlbS5hYm91dD9cbiAgICB0ZXh0ICs9IFwiI3tpdGVtLnVuaXR9XCIgaWYgaXRlbS51bml0P1xuICAgIHRleHQgKz0gXCLmnKrmuoBcIiBpZiBpdGVtLnVuZGVyP1xuICAgIHRleHQgKz0gXCIgKCN7aXRlbS5yZW1hcmt9KVwiIGlmIGl0ZW0ucmVtYXJrP1xuICAgIHJldHVybiB0ZXh0XG4gIHJldHVybiBcIlwiXG5cbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZ1xuIiwiZ3JpZHMgPSBbXG4gIHsgcHJlZml4OiBcImlkXCIsIHRleHQ6IFwiSURcIiwgaGFzSW5wdXQ6IGZhbHNlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IGZhbHNlIH0sXG4gIHsgcHJlZml4OiBcIm5hbWVcIiwgdGV4dDogXCLllYblk4HlkI1cIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogZmFsc2UgfSxcbiAgeyBwcmVmaXg6IFwiY29tcGFueVwiLCB0ZXh0OiBcIuS8muekvuWQjVwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiBmYWxzZSB9LFxuICB7IHByZWZpeDogXCJlbmVyZ3lcIiwgdGV4dDogXCLjgqvjg63jg6rjg7xcIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogdHJ1ZSB9LFxuICB7IHByZWZpeDogXCJwcm90ZWluXCIsIHRleHQ6IFwi44Gf44KT44Gx44GP6LOqXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwiZmF0XCIsIHRleHQ6IFwi6ISC6LOqXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwiY2FyYm9oeWRyYXRlXCIsIHRleHQ6IFwi54Kt5rC05YyW54mpXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwibmFcIiwgdGV4dDogXCLjg4rjg4jjg6rjgqbjg6BcIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogW1wibWdcIiwgXCJnXCJdLCBpc1ZhbHVlOiB0cnVlIH0sXG4gIHsgcHJlZml4OiBcInNhbHRcIiwgdGV4dDogXCLpo5/loannm7jlvZPph49cIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogdHJ1ZSB9LFxuICB7IHByZWZpeDogXCJ2b2x1bWVcIiwgdGV4dDogXCLlhoXlrrnph49cIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogdHJ1ZSB9LFxuICB7IHByZWZpeDogXCJwZXJcIiwgdGV4dDogXCLil4vil4vjgYLjgZ/jgopcIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogdHJ1ZSB9LFxuICB7IHByZWZpeDogXCJjYVwiLCB0ZXh0OiBcIuOCq+ODq+OCt+OCpuODoFwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiB0cnVlIH0sXG4gIHsgcHJlZml4OiBcIm1nXCIsIHRleHQ6IFwi44Oe44Kw44ON44K344Km44OgXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwia1wiLCB0ZXh0OiBcIuOCq+ODquOCpuODoFwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiB0cnVlIH1cbl1cblxubWFrZUpzb24gPSAoZGF0YSkgLT5cbiAgSlNPTi5zdHJpbmdpZnkgZGF0YVxuXG5leHBvcnRzLmluaXRWaWV3ID0gLT5cbiAgY29udGVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAnY29udGVudHMtY3JlYXRlJ1xuXG4gIGZvciBncmlkIGluIGdyaWRzXG4gICAgY29udGVudHMuYXBwZW5kQ2hpbGQgbWFrZUdyaWQoXG4gICAgICBncmlkLnByZWZpeCwgZ3JpZC50ZXh0LCBncmlkLmhhc0lucHV0LCBncmlkLnJhZGlvYnRuc1xuICAgIClcblxuICBjb250ZW50cy5hcHBlbmRDaGlsZCBtYWtlQ3JlYXRlQnV0dG9uR3JpZCgpXG4gIHJldHVybiBjb250ZW50c1xuXG5zaG93UmVzdWx0ID0gLT5cbiAgcmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ3Jlc3VsdC1jcmVhdGUnXG5cbiAgb2JqID0ge31cblxuICBmb3IgZ3JpZCBpbiBncmlkc1xuICAgIHVubGVzcyBncmlkLmhhc0lucHV0XG4gICAgICBjb250aW51ZVxuICAgIGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCIje2dyaWQucHJlZml4fS1pbnB1dFwiXG4gICAgaWYgaW5wdXQudmFsdWU/IGFuZCBpbnB1dC52YWx1ZS5sZW5ndGggPiAwXG4gICAgICBpZiBncmlkLmlzVmFsdWVcbiAgICAgICAgb2JqW2dyaWQucHJlZml4XSA9IHt9XG4gICAgICAgIG9ialtncmlkLnByZWZpeF1bXCJ2YWx1ZVwiXSA9IHBhcnNlSW50IGlucHV0LnZhbHVlXG4gICAgICBlbHNlXG4gICAgICAgIG9ialtnaXJkLnByZWZpeF0gPSBpbnB1dC52YWx1ZVxuXG4gIHJlc3VsdC5pbm5lclRleHQgPSBtYWtlSnNvbiBvYmpcblxubWFrZUNyZWF0ZUJ1dHRvbkdyaWQgPSAtPlxuICBncmlkID0gbWFrZURpdiBudWxsLCBcIm1kbC1ncmlkXCJcbiAgZ3JpZC5hcHBlbmRDaGlsZCBtYWtlU3BhY2VyKClcbiAgYnRuID0gbWFrZUNyZWF0ZUJ1dHRvbigpXG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIHNob3dSZXN1bHRcbiAgZ3JpZC5hcHBlbmRDaGlsZCBidG5cbiAgZ3JpZC5hcHBlbmRDaGlsZCBtYWtlU3BhY2VyKClcbiAgcmV0dXJuIGdyaWRcblxubWFrZUNyZWF0ZUJ1dHRvbiA9IC0+XG4gIHJldHVybiBtYWtlQnV0dG9uKFxuICAgIFwiY3JlYXRlLWJ1dHRvblwiLFxuICAgIFwibWRsLWJ1dHRvbiBtZGwtanMtYnV0dG9uIG1kbC1idXR0b24tLXJhaXNlZCBtZGwtanMtcmlwcGxlLWVmZmVjdCBtZGwtYnV0dG9uLS1hY2NlbnRcIixcbiAgICBcIuS9nOaIkFwiXG4gIClcblxubWFrZUJ1dHRvbiA9IChpZCwgY2xhc3NOYW1lLCB0ZXh0KSAtPlxuICBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdidXR0b24nXG4gIGJ1dHRvbi5pZCA9IGlkIGlmIGlkP1xuICBidXR0b24uY2xhc3NOYW1lID0gY2xhc3NOYW1lIGlmIGNsYXNzTmFtZT9cbiAgYnV0dG9uLmlubmVyVGV4dCA9IHRleHRcbiAgcmV0dXJuIGJ1dHRvblxuXG5tYWtlR3JpZCA9IChpZFByZWZpeCwgdGV4dCwgaGFzSW5wdXQgPSB0cnVlLCByYWRpb2J0bnMpIC0+XG4gIGdyaWQgPSBtYWtlRGl2IG51bGwsIFwibWRsLWdyaWRcIlxuICBncmlkLmFwcGVuZENoaWxkIG1ha2VTcGFjZXIoKVxuXG4gIGNlbGwgPSBtYWtlRGl2IG51bGwsIFwibWRsLWNlbGwgbWRsLWNlbGwtLTQtY29sXCJcbiAgZ3JpZC5hcHBlbmRDaGlsZCBjZWxsXG5cbiAgdGV4dEZpbGVkID0gbWFrZURpdiBudWxsLCBcIm1kbC10ZXh0ZmllbGQgbWRsLWpzLXRleHRmaWVsZFwiXG4gIGNlbGwuYXBwZW5kQ2hpbGQgdGV4dEZpbGVkXG5cbiAgaWYgaGFzSW5wdXRcbiAgICBpbnB1dCA9IG1ha2VJbnB1dCBcIiN7aWRQcmVmaXh9LWlucHV0XCIsIFwibWRsLXRleHRmaWVsZF9faW5wdXRcIiwgXCJ0ZXh0XCJcbiAgICBpbnB1dC5wYXR0ZXJuID0gXCItP1swLTldKihcXC5bMC05XSspP1wiXG4gICAgdGV4dEZpbGVkLmFwcGVuZENoaWxkIGlucHV0XG5cbiAgbGFiZWwgPSBtYWtlTGFiZWwgbnVsbCwgXCJtZGwtdGV4dGZpZWxkX19sYWJlbFwiLCBcIiN7aWRQcmVmaXh9LWlucHV0XCIsIHRleHRcbiAgdGV4dEZpbGVkLmFwcGVuZENoaWxkIGxhYmVsXG5cbiAgaWYgcmFkaW9idG5zP1xuICAgIHJhZGlvQ2VsbCA9IG1ha2VEaXYgbnVsbCwgXCJtZGwtY2VsbCBtZGwtY2VsbC0tNC1jb2xcIlxuICAgIGdyaWQuYXBwZW5kQ2hpbGQgcmFkaW9DZWxsXG4gIGVsc2VcbiAgICBncmlkLmFwcGVuZENoaWxkIG1ha2VEaXYgbnVsbCwgXCJtZGwtY2VsbCBtZGwtY2VsbC0tNC1jb2xcIlxuXG4gIGdyaWQuYXBwZW5kQ2hpbGQgbWFrZVNwYWNlcigpXG5cbiAgcmV0dXJuIGdyaWRcblxubWFrZURpdiA9IChpZCwgY2xhc3NOYW1lKSAtPlxuICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG4gIGRpdi5pZCA9IGlkIGlmIGlkP1xuICBkaXYuY2xhc3NOYW1lID0gY2xhc3NOYW1lIGlmIGNsYXNzTmFtZT9cbiAgcmV0dXJuIGRpdlxuXG5tYWtlTGFiZWwgPSAoaWQsIGNsYXNzTmFtZSwgaHRtbEZvciwgdGV4dCwgdmFsdWUpIC0+XG4gIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnbGFiZWwnXG4gIGxhYmVsLmlkID0gaWQgaWYgaWQ/XG4gIGxhYmVsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZSBpZiBjbGFzc05hbWU/XG4gIGxhYmVsLmh0bWxGb3IgPSBodG1sRm9yIGlmIGh0bWxGb3I/XG4gIGxhYmVsLnRleHRDb250ZW50ID0gdGV4dCBpZiB0ZXh0P1xuICBsYWJlbC52YWx1ZSA9IHZhbHVlIGlmIHZhbHVlP1xuICByZXR1cm4gbGFiZWxcblxubWFrZUlucHV0ID0gKGlkLCBjbGFzc05hbWUsIHR5cGUpIC0+XG4gIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnaW5wdXQnXG4gIGlucHV0LmlkID0gaWQgaWYgaWQ/XG4gIGlucHV0LmNsYXNzTmFtZSA9IGNsYXNzTmFtZSBpZiBjbGFzc05hbWU/XG4gIGlucHV0LnR5cGUgPSB0eXBlIGlmIHR5cGU/XG4gIHJldHVybiBpbnB1dFxuXG5tYWtlU3BhY2VyID0gKCkgLT5cbiAgcmV0dXJuIG1ha2VEaXYgbnVsbCwgXCJtZGwtbGF5b3V0LXNwYWNlclwiXG4iLCJnZXRKc29uRGF0YSA9IChjYWxsYmFjaykgLT5cbiAgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgcmVxLm9wZW4gXCJHRVRcIiwgXCJodHRwczovL3RhbmpvLmluL2NhbG9yaWUtbWVtby9kYXRhLmpzb25cIiwgdHJ1ZVxuICByZXEub25sb2FkID0gY2FsbGJhY2tcbiAgcmVxLnNlbmQoKVxuICByZXR1cm5cblxuZXhwb3J0cy5nZXREYXRhID0gKGNhbGxiYWNrKSAtPlxuICBnZXRKc29uRGF0YSAtPlxuICAgIGRhdGEgPSBKU09OLnBhcnNlIHRoaXMucmVzcG9uc2VUZXh0XG4gICAgY2FsbGJhY2sgZGF0YS50ZW1wbGF0ZXNcbiAgcmV0dXJuXG4iLCJkYXRhID0gcmVxdWlyZSAnLi9kYXRhJ1xudmlldyA9IHJlcXVpcmUgJy4vdmlldydcbmNyZWF0b3IgPSByZXF1aXJlICcuL2NyZWF0b3InXG5cbmNhbG9yaWVEYXRhID0gW11cblxud2luZG93Lm9ubG9hZCA9IC0+XG4gIHJlc3VsdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdyZXN1bHQnXG4gIGlmIHJlc3VsdERpdj9cbiAgICBkYXRhLmdldERhdGEgKGRhdGEpIC0+XG4gICAgICBjYWxvcmllRGF0YSA9IGRhdGFcbiAgICAgIGZvciBkIGluIGNhbG9yaWVEYXRhXG4gICAgICAgIHJlc3VsdERpdi5hcHBlbmRDaGlsZCB2aWV3Lm1ha2VIdG1sIGRcbiAgICAgIHJldHVyblxuXG4gIGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ3NlYXJjaC1pbnB1dCdcbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciAnY2hhbmdlJywgZGlkU2VhcmNoSW5wdXRUZXh0Q2hhbmdlZCBpZiBpbnB1dD9cblxuICBjcmVhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAnY29udGVudHMtY3JlYXRlJ1xuICBjcmVhdG9yLmluaXRWaWV3KCkgaWYgY3JlYXRlP1xuXG4gIG5ldyBDbGlwYm9hcmQgJy5jbGlwYm9hcmQnXG5cbiAgcmV0dXJuXG5cbmRpZFNlYXJjaElucHV0VGV4dENoYW5nZWQgPSAtPlxuICByZXN1bHREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAncmVzdWx0J1xuICBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdzZWFyY2gtaW5wdXQnXG4gIHVubGVzcyByZXN1bHREaXY/IGFuZCBpbnB1dD9cbiAgICByZXR1cm5cbiAgd2hpbGUgcmVzdWx0RGl2LmZpcnN0Q2hpbGRcbiAgICByZXN1bHREaXYucmVtb3ZlQ2hpbGQgcmVzdWx0RGl2LmZpcnN0Q2hpbGRcblxuICBsaXN0ID0gY2Fsb3JpZURhdGFcbiAgaWYgaW5wdXQudmFsdWUubGVuZ3RoID4gMFxuICAgIGxpc3QgPSBjYWxvcmllRGF0YS5maWx0ZXIgKGVsZW1lbnQsIGluZGV4LCBhcnJheSkgLT5cbiAgICAgIHJldHVybiBlbGVtZW50Lm5hbWUuaW5kZXhPZihpbnB1dC52YWx1ZSkgaXNudCAtMSBvclxuICAgICAgICAoZWxlbWVudC5jb21wYW55IGFuZCBlbGVtZW50LmNvbXBhbnkuaW5kZXhPZihpbnB1dC52YWx1ZSkgaXNudCAtMSlcbiAgZm9yIGQgaW4gbGlzdFxuICAgIHJlc3VsdERpdi5hcHBlbmRDaGlsZCB2aWV3Lm1ha2VIdG1sIGRcbiAgcmV0dXJuXG4iLCJjYWxlbmRhciA9IHJlcXVpcmUoJy4vY2FsZW5kYXInKVxuY2Fsb3JpZSA9IHJlcXVpcmUoJy4vY2Fsb3JpZScpXG5cbmV4cG9ydHMubWFrZUh0bWwgPSAoY29udGVudCkgLT5cbiAgY2FyZERpdiA9IG1ha2VEaXYoY29udGVudC5pZCwgXCJjYXJkLWV2ZW50IG1kbC1jYXJkIG1kbC1zaGFkb3ctLTJkcFwiKVxuXG4gIHRpdGxlRGl2ID0gbWFrZURpdihudWxsLCBcIm1kbC1jYXJkX190aXRsZSBtZGwtY2FyZC0tZXhwYW5kXCIpXG4gIHRpdGxlRGl2LmFwcGVuZENoaWxkIG1ha2VDaGlwIGNvbnRlbnQuY29tcGFueSBpZiBjb250ZW50LmNvbXBhbnk/XG4gIHRpdGxlID0gXCIje2NvbnRlbnQubmFtZX1cIlxuICB0aXRsZSArPSBcIiN7Y2Fsb3JpZS50b1N0cmluZyhjb250ZW50LnZvbHVtZSl9XCIgaWYgY29udGVudC52b2x1bWU/XG4gIHRpdGxlRGl2LmFwcGVuZENoaWxkIG1ha2VINCB0aXRsZVxuICBjYXJkRGl2LmFwcGVuZENoaWxkIHRpdGxlRGl2XG5cbiAgc3VwcG9ydFRleHREaXYgPSBtYWtlRGl2KG51bGwsIFwibWRsLWNhcmRfX3N1cHBvcnRpbmctdGV4dFwiKVxuICBzdXBwb3J0VGV4dERpdi5pbm5lclRleHQgPSBnZXRTdXBwcnRUZXh0IGNvbnRlbnRcbiAgY2FyZERpdi5hcHBlbmRDaGlsZCBzdXBwb3J0VGV4dERpdlxuXG4gIGFjdGlvbkRpdiA9IG1ha2VEaXYobnVsbCwgXCJtZGwtY2FyZF9fYWN0aW9ucyBtZGwtY2FyZC0tYm9yZGVyXCIpXG4gIGFjdGlvbkRpdi5hcHBlbmRDaGlsZCBtYWtlQShcbiAgICBcIm1kbC1idXR0b24gbWRsLWJ1dHRvbi0tY29sb3JlZCBtZGwtanMtYnV0dG9uIG1kbC1qcy1yaXBwbGUtZWZmZWN0XCIsXG4gICAgXCJBZGQgdG8gQ2FsZW5kYXJcIixcbiAgICBjYWxlbmRhci5tYWtlVXJsKGNvbnRlbnQpXG4gIClcbiAgYWN0aW9uRGl2LmFwcGVuZENoaWxkIG1ha2VTcGFjZXIoKVxuICBhY3Rpb25EaXYuYXBwZW5kQ2hpbGQgbWFrZUkoXCJtYXRlcmlhbC1pY29uc1wiLCBcImV2ZW50XCIpXG4gIGNhcmREaXYuYXBwZW5kQ2hpbGQgYWN0aW9uRGl2XG5cbiAgcmV0dXJuIGNhcmREaXZcblxubWFrZVNwYWNlciA9IC0+XG4gIHJldHVybiBtYWtlRGl2KG51bGwsIFwibWRsLWxheW91dC1zcGFjZXJcIilcblxuZXhwb3J0cy5tYWtlU3BhY2VyID0gbWFrZVNwYWNlclxuXG5tYWtlRGl2ID0gKGlkLCBjbGFzc05hbWUpIC0+XG4gIGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG4gIGQuaWQgPSBpZCBpZiBpZD9cbiAgZC5jbGFzc05hbWUgPSBjbGFzc05hbWUgaWYgY2xhc3NOYW1lP1xuICByZXR1cm4gZFxuXG5tYWtlSDQgPSAodGV4dCkgLT5cbiAgaDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdoNCdcbiAgaDQuaW5uZXJUZXh0ID0gdGV4dCBpZiB0ZXh0P1xuICByZXR1cm4gaDRcblxubWFrZUEgPSAoY2xhc3NOYW1lLCB0ZXh0LCBocmVmKSAtPlxuICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnYSdcbiAgYS5jbGFzc05hbWUgPSBjbGFzc05hbWUgaWYgY2xhc3NOYW1lP1xuICBhLmlubmVyVGV4dCA9IHRleHQgaWYgdGV4dD9cbiAgYS5ocmVmID0gaHJlZiBpZiBocmVmP1xuICBhLnRhcmdldCA9IFwiX2JsYW5rXCJcbiAgcmV0dXJuIGFcblxubWFrZUkgPSAoY2xhc3NOYW1lLCB0ZXh0KSAtPlxuICBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnaSdcbiAgaS5jbGFzc05hbWUgPSBjbGFzc05hbWUgaWYgY2xhc3NOYW1lP1xuICBpLmlubmVyVGV4dCA9IHRleHQgaWYgdGV4dD9cbiAgcmV0dXJuIGlcblxubWFrZUNoaXAgPSAodGV4dCkgLT5cbiAgbWRsQ2hpcENvbnRhY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzcGFuJ1xuICBtZGxDaGlwQ29udGFjdC5jbGFzc05hbWUgPVxuICAgIFwibWRsLWNoaXBfX2NvbnRhY3QgbWRsLWNvbG9yLS10ZWFsIG1kbC1jb2xvci10ZXh0LS13aGl0ZVwiXG4gIG1kbENoaXBDb250YWN0LmlubmVyVGV4dCA9IHRleHQuc3Vic3RyIDAsIDFcbiAgcmV0dXJuIG1kbENoaXBDb250YWN0XG5cbmdldFN1cHBydFRleHQgPSAoY29udGVudCkgLT5cbiAgcmV0dXJuIGNhbG9yaWUuZ2V0RGV0YWlscyBjb250ZW50LCB0cnVlLCBmYWxzZVxuIl19

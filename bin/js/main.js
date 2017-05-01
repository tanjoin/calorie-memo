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
      return element.name.indexOf(input.value) !== -1 || (element.company && element.company.indexOf(input.value) !== -1) || (element.price_company && element.price_company.indexOf(input.value) !== -1) || (element.remark && element.remark.indexOf(input.value) !== -1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9jb2ZmZWUvY2FsZW5kYXIuY29mZmVlIiwic3JjL2NvZmZlZS9jYWxvcmllLmNvZmZlZSIsInNyYy9jb2ZmZWUvY3JlYXRvci5jb2ZmZWUiLCJzcmMvY29mZmVlL2RhdGEuY29mZmVlIiwic3JjL2NvZmZlZS9pbmRleC5jb2ZmZWUiLCJzcmMvY29mZmVlL3ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFdBQVI7O0FBRVYsT0FBTyxDQUFDLE9BQVIsR0FBa0IsU0FBQyxPQUFEO0FBQ2hCLE1BQUE7RUFBQSxJQUFPLGVBQVA7QUFDRSxXQUFPLEdBRFQ7O0VBR0EsSUFBQSxHQUFPLE1BQUEsQ0FBTyxJQUFJLElBQUosQ0FBQSxDQUFQO0FBRVAsU0FBTyx1REFBQSxHQUNMLENBQUEsUUFBQSxHQUFRLENBQUMsT0FBQSxDQUFRLE9BQVIsQ0FBRCxDQUFSLENBREssR0FFTCxDQUFBLFdBQUEsR0FBVyxDQUFDLFVBQUEsQ0FBVyxPQUFYLENBQUQsQ0FBWCxDQUZLLEdBR0wsQ0FBQSxTQUFBLEdBQVUsSUFBVixHQUFlLEdBQWYsR0FBa0IsSUFBbEI7QUFUYzs7QUFXbEIsTUFBQSxHQUFTLFNBQUMsSUFBRDtBQUNQLFNBQU8sSUFBSSxDQUFDLGNBQUwsQ0FBQSxDQUFBLEdBQ0wsUUFBQSxDQUFTLElBQUksQ0FBQyxXQUFMLENBQUEsQ0FBQSxHQUFtQixDQUE1QixDQURLLEdBRUwsUUFBQSxDQUFTLElBQUksQ0FBQyxVQUFMLENBQUEsQ0FBVCxDQUZLLEdBR0wsR0FISyxHQUlMLFFBQUEsQ0FBUyxJQUFJLENBQUMsV0FBTCxDQUFBLENBQVQsQ0FKSyxHQUtMLFFBQUEsQ0FBUyxJQUFJLENBQUMsYUFBTCxDQUFBLENBQVQsQ0FMSyxHQU1MLFFBQUEsQ0FBUyxJQUFJLENBQUMsYUFBTCxDQUFBLENBQVQsQ0FOSyxHQU9MO0FBUks7O0FBVVQsUUFBQSxHQUFXLFNBQUMsR0FBRDtBQUNULFNBQU8sQ0FBQyxHQUFBLEdBQU0sR0FBUCxDQUFXLENBQUMsS0FBWixDQUFrQixDQUFDLENBQW5CO0FBREU7O0FBR1gsT0FBQSxHQUFVLFNBQUMsT0FBRDtBQUNSLFNBQU8sa0JBQUEsQ0FDRixPQUFPLENBQUMsSUFBVCxHQUFjLEdBQWQsR0FBZ0IsQ0FBQyxPQUFPLENBQUMsUUFBUixDQUFpQixPQUFPLENBQUMsTUFBekIsQ0FBRCxDQURiO0FBREM7O0FBS1YsVUFBQSxHQUFhLFNBQUMsT0FBRDtBQUNYLFNBQU8sa0JBQUEsQ0FBbUIsT0FBTyxDQUFDLFVBQVIsQ0FBbUIsT0FBbkIsRUFBNEIsS0FBNUIsQ0FBbkI7QUFESTs7QUFHYixVQUFBLEdBQWEsU0FBQyxPQUFEO0FBQ1gsTUFBQTtFQUFBLEdBQUEsR0FBTTtBQUNOLFNBQU8sa0JBQUEsQ0FBbUIsR0FBQSxHQUFNLE9BQU8sQ0FBQyxFQUFqQztBQUZJOzs7O0FDbENiLElBQUE7O0FBQUEsT0FBTyxDQUFDLGFBQVIsR0FBd0IsU0FBQyxNQUFEO0FBQ3RCLFNBQU8sTUFBQSxHQUFTLElBQVQsR0FBZ0I7QUFERDs7QUFHeEIsT0FBTyxDQUFDLGVBQVIsR0FBMEIsU0FBQyxJQUFEO0FBQ3hCLFNBQU8sSUFBQSxHQUFPLElBQVAsR0FBYztBQURHOztBQUcxQixPQUFPLENBQUMsZ0JBQVIsR0FBMkIsU0FBQyxVQUFELEVBQWEsYUFBYjtBQUN6QixTQUFPLFVBQUEsR0FBYTtBQURLOztBQUczQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFDLE9BQUQsRUFBVSxZQUFWLEVBQStCLFlBQS9CO0FBQ25CLE1BQUE7O0lBRDZCLGVBQWU7OztJQUFNLGVBQWU7O0VBQ2pFLE9BQUEsR0FBVTtFQUNWLElBQW9GLGtCQUFwRjtJQUFBLE9BQUEsSUFBVyxLQUFBLEdBQU0sT0FBTyxDQUFDLEVBQWQsR0FBaUIsc0NBQWpCLEdBQXVELE9BQU8sQ0FBQyxFQUEvRCxHQUFrRSxLQUE3RTs7RUFDQSxJQUE4Qyx3QkFBQSxJQUFvQixZQUFsRTtJQUFBLE9BQUEsSUFBYSxDQUFDLFFBQUEsQ0FBUyxPQUFPLENBQUMsTUFBakIsQ0FBRCxDQUFBLEdBQTBCLEtBQXZDOztFQUNBLElBQXFELHVCQUFyRDtJQUFBLE9BQUEsSUFBVyxRQUFBLEdBQVEsQ0FBQyxRQUFBLENBQVMsT0FBTyxDQUFDLE9BQWpCLENBQUQsQ0FBUixHQUFtQyxLQUE5Qzs7RUFDQSxJQUE4QyxtQkFBOUM7SUFBQSxPQUFBLElBQVcsS0FBQSxHQUFLLENBQUMsUUFBQSxDQUFTLE9BQU8sQ0FBQyxHQUFqQixDQUFELENBQUwsR0FBNEIsS0FBdkM7O0VBQ0EsSUFBeUQsNEJBQXpEO0lBQUEsT0FBQSxJQUFXLE9BQUEsR0FBTyxDQUFDLFFBQUEsQ0FBUyxPQUFPLENBQUMsWUFBakIsQ0FBRCxDQUFQLEdBQXVDLEtBQWxEOztFQUNBLElBQXFELDBCQUFyRDtJQUFBLE9BQUEsSUFBVyxLQUFBLEdBQUssQ0FBQyxRQUFBLENBQVMsT0FBTyxDQUFDLFVBQWpCLENBQUQsQ0FBTCxHQUFtQyxLQUE5Qzs7RUFDQSxJQUEwRCw2QkFBMUQ7SUFBQSxPQUFBLElBQVcsT0FBQSxHQUFPLENBQUMsUUFBQSxDQUFTLE9BQU8sQ0FBQyxhQUFqQixDQUFELENBQVAsR0FBd0MsS0FBbkQ7O0VBQ0EsSUFBNkMsa0JBQTdDO0lBQUEsT0FBQSxJQUFXLEtBQUEsR0FBSyxDQUFDLFFBQUEsQ0FBUyxPQUFPLENBQUMsRUFBakIsQ0FBRCxDQUFMLEdBQTJCLEtBQXRDOztFQUNBLElBQWtELG9CQUFsRDtJQUFBLE9BQUEsSUFBVyxRQUFBLEdBQVEsQ0FBQyxRQUFBLENBQVMsT0FBTyxDQUFDLElBQWpCLENBQUQsQ0FBUixHQUFnQyxLQUEzQzs7RUFDQSxJQUE2QyxrQkFBN0M7SUFBQSxPQUFBLElBQVcsS0FBQSxHQUFLLENBQUMsUUFBQSxDQUFTLE9BQU8sQ0FBQyxFQUFqQixDQUFELENBQUwsR0FBMkIsS0FBdEM7O0VBQ0EsSUFBNkMsa0JBQTdDO0lBQUEsT0FBQSxJQUFXLEtBQUEsR0FBSyxDQUFDLFFBQUEsQ0FBUyxPQUFPLENBQUMsRUFBakIsQ0FBRCxDQUFMLEdBQTJCLEtBQXRDOztFQUNBLElBQTJDLGlCQUEzQztJQUFBLE9BQUEsSUFBVyxJQUFBLEdBQUksQ0FBQyxRQUFBLENBQVMsT0FBTyxDQUFDLENBQWpCLENBQUQsQ0FBSixHQUF5QixLQUFwQzs7RUFDQSxJQUEyQyxpQkFBM0M7SUFBQSxPQUFBLElBQVcsSUFBQSxHQUFJLENBQUMsUUFBQSxDQUFTLE9BQU8sQ0FBQyxDQUFqQixDQUFELENBQUosR0FBeUIsS0FBcEM7O0VBQ0EsSUFBbUQsd0JBQW5EO0lBQUEsT0FBQSxJQUFXLEtBQUEsR0FBSyxDQUFDLFFBQUEsQ0FBUyxPQUFPLENBQUMsUUFBakIsQ0FBRCxDQUFMLEdBQWlDLEtBQTVDOztFQUNBLElBQTZDLGtCQUE3QztJQUFBLE9BQUEsSUFBVyxLQUFBLEdBQUssQ0FBQyxRQUFBLENBQVMsT0FBTyxDQUFDLEVBQWpCLENBQUQsQ0FBTCxHQUEyQixLQUF0Qzs7RUFDQSxJQUFrRCx3QkFBQSxJQUFvQixZQUF0RTtJQUFBLE9BQUEsSUFBVyxNQUFBLEdBQU0sQ0FBQyxRQUFBLENBQVMsT0FBTyxDQUFDLE1BQWpCLENBQUQsQ0FBTixHQUFnQyxLQUEzQzs7RUFDQSxJQUE4QyxtQkFBOUM7SUFBQSxPQUFBLElBQWEsQ0FBQyxRQUFBLENBQVMsT0FBTyxDQUFDLEdBQWpCLENBQUQsQ0FBQSxHQUF1QixRQUFwQzs7QUFDQSxTQUFPO0FBbkJZOztBQXFCckIsUUFBQSxHQUFXLFNBQUMsSUFBRDtBQUNULE1BQUE7RUFBQSxJQUFHLE9BQU8sSUFBSSxDQUFDLEtBQVosS0FBcUIsUUFBeEI7SUFDRSxJQUFBLEdBQU8sRUFBQSxHQUFHLElBQUksQ0FBQztJQUNmLElBQXFCLGtCQUFyQjtNQUFBLElBQUEsR0FBTyxHQUFBLEdBQU0sS0FBYjs7SUFDQSxJQUEwQixpQkFBMUI7TUFBQSxJQUFBLElBQVEsRUFBQSxHQUFHLElBQUksQ0FBQyxLQUFoQjs7SUFDQSxJQUFnQixrQkFBaEI7TUFBQSxJQUFBLElBQVEsS0FBUjs7SUFDQSxJQUErQixtQkFBL0I7TUFBQSxJQUFBLElBQVEsSUFBQSxHQUFLLElBQUksQ0FBQyxNQUFWLEdBQWlCLElBQXpCOztBQUNBLFdBQU8sS0FOVDtHQUFBLE1BT0ssSUFBRyxPQUFPLElBQUksQ0FBQyxLQUFaLEtBQXFCLFFBQXJCLElBQWtDLHdCQUFsQyxJQUFzRCx3QkFBekQ7SUFDSCxJQUFBLEdBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFaLEdBQWdCLEdBQWhCLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdkMsSUFBcUIsa0JBQXJCO01BQUEsSUFBQSxHQUFPLEdBQUEsR0FBTSxLQUFiOztJQUNBLElBQTBCLGlCQUExQjtNQUFBLElBQUEsSUFBUSxFQUFBLEdBQUcsSUFBSSxDQUFDLEtBQWhCOztJQUNBLElBQWdCLGtCQUFoQjtNQUFBLElBQUEsSUFBUSxLQUFSOztJQUNBLElBQStCLG1CQUEvQjtNQUFBLElBQUEsSUFBUSxJQUFBLEdBQUssSUFBSSxDQUFDLE1BQVYsR0FBaUIsSUFBekI7O0FBQ0EsV0FBTyxLQU5KOztBQU9MLFNBQU87QUFmRTs7QUFpQlgsT0FBTyxDQUFDLFFBQVIsR0FBbUI7Ozs7QUMvQ25CLElBQUE7O0FBQUEsS0FBQSxHQUFRO0VBQ047SUFBRSxNQUFBLEVBQVEsSUFBVjtJQUFnQixJQUFBLEVBQU0sSUFBdEI7SUFBNEIsUUFBQSxFQUFVLEtBQXRDO0lBQTZDLFNBQUEsRUFBVyxJQUF4RDtJQUE4RCxPQUFBLEVBQVMsS0FBdkU7R0FETSxFQUVOO0lBQUUsTUFBQSxFQUFRLE1BQVY7SUFBa0IsSUFBQSxFQUFNLEtBQXhCO0lBQStCLFFBQUEsRUFBVSxJQUF6QztJQUErQyxTQUFBLEVBQVcsSUFBMUQ7SUFBZ0UsT0FBQSxFQUFTLEtBQXpFO0dBRk0sRUFHTjtJQUFFLE1BQUEsRUFBUSxTQUFWO0lBQXFCLElBQUEsRUFBTSxLQUEzQjtJQUFrQyxRQUFBLEVBQVUsSUFBNUM7SUFBa0QsU0FBQSxFQUFXLElBQTdEO0lBQW1FLE9BQUEsRUFBUyxLQUE1RTtHQUhNLEVBSU47SUFBRSxNQUFBLEVBQVEsUUFBVjtJQUFvQixJQUFBLEVBQU0sTUFBMUI7SUFBa0MsUUFBQSxFQUFVLElBQTVDO0lBQWtELFNBQUEsRUFBVyxJQUE3RDtJQUFtRSxPQUFBLEVBQVMsSUFBNUU7R0FKTSxFQUtOO0lBQUUsTUFBQSxFQUFRLFNBQVY7SUFBcUIsSUFBQSxFQUFNLE9BQTNCO0lBQW9DLFFBQUEsRUFBVSxJQUE5QztJQUFvRCxTQUFBLEVBQVcsSUFBL0Q7SUFBcUUsT0FBQSxFQUFTLElBQTlFO0dBTE0sRUFNTjtJQUFFLE1BQUEsRUFBUSxLQUFWO0lBQWlCLElBQUEsRUFBTSxJQUF2QjtJQUE2QixRQUFBLEVBQVUsSUFBdkM7SUFBNkMsU0FBQSxFQUFXLElBQXhEO0lBQThELE9BQUEsRUFBUyxJQUF2RTtHQU5NLEVBT047SUFBRSxNQUFBLEVBQVEsY0FBVjtJQUEwQixJQUFBLEVBQU0sTUFBaEM7SUFBd0MsUUFBQSxFQUFVLElBQWxEO0lBQXdELFNBQUEsRUFBVyxJQUFuRTtJQUF5RSxPQUFBLEVBQVMsSUFBbEY7R0FQTSxFQVFOO0lBQUUsTUFBQSxFQUFRLElBQVY7SUFBZ0IsSUFBQSxFQUFNLE9BQXRCO0lBQStCLFFBQUEsRUFBVSxJQUF6QztJQUErQyxTQUFBLEVBQVcsQ0FBQyxJQUFELEVBQU8sR0FBUCxDQUExRDtJQUF1RSxPQUFBLEVBQVMsSUFBaEY7R0FSTSxFQVNOO0lBQUUsTUFBQSxFQUFRLE1BQVY7SUFBa0IsSUFBQSxFQUFNLE9BQXhCO0lBQWlDLFFBQUEsRUFBVSxJQUEzQztJQUFpRCxTQUFBLEVBQVcsSUFBNUQ7SUFBa0UsT0FBQSxFQUFTLElBQTNFO0dBVE0sRUFVTjtJQUFFLE1BQUEsRUFBUSxRQUFWO0lBQW9CLElBQUEsRUFBTSxLQUExQjtJQUFpQyxRQUFBLEVBQVUsSUFBM0M7SUFBaUQsU0FBQSxFQUFXLElBQTVEO0lBQWtFLE9BQUEsRUFBUyxJQUEzRTtHQVZNLEVBV047SUFBRSxNQUFBLEVBQVEsS0FBVjtJQUFpQixJQUFBLEVBQU0sT0FBdkI7SUFBZ0MsUUFBQSxFQUFVLElBQTFDO0lBQWdELFNBQUEsRUFBVyxJQUEzRDtJQUFpRSxPQUFBLEVBQVMsSUFBMUU7R0FYTSxFQVlOO0lBQUUsTUFBQSxFQUFRLElBQVY7SUFBZ0IsSUFBQSxFQUFNLE9BQXRCO0lBQStCLFFBQUEsRUFBVSxJQUF6QztJQUErQyxTQUFBLEVBQVcsSUFBMUQ7SUFBZ0UsT0FBQSxFQUFTLElBQXpFO0dBWk0sRUFhTjtJQUFFLE1BQUEsRUFBUSxJQUFWO0lBQWdCLElBQUEsRUFBTSxRQUF0QjtJQUFnQyxRQUFBLEVBQVUsSUFBMUM7SUFBZ0QsU0FBQSxFQUFXLElBQTNEO0lBQWlFLE9BQUEsRUFBUyxJQUExRTtHQWJNLEVBY047SUFBRSxNQUFBLEVBQVEsR0FBVjtJQUFlLElBQUEsRUFBTSxNQUFyQjtJQUE2QixRQUFBLEVBQVUsSUFBdkM7SUFBNkMsU0FBQSxFQUFXLElBQXhEO0lBQThELE9BQUEsRUFBUyxJQUF2RTtHQWRNOzs7QUFpQlIsUUFBQSxHQUFXLFNBQUMsSUFBRDtTQUNULElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZjtBQURTOztBQUdYLE9BQU8sQ0FBQyxRQUFSLEdBQW1CLFNBQUE7QUFDakIsTUFBQTtFQUFBLFFBQUEsR0FBVyxRQUFRLENBQUMsY0FBVCxDQUF3QixpQkFBeEI7QUFFWCxPQUFBLHVDQUFBOztJQUNFLFFBQVEsQ0FBQyxXQUFULENBQXFCLFFBQUEsQ0FDbkIsSUFBSSxDQUFDLE1BRGMsRUFDTixJQUFJLENBQUMsSUFEQyxFQUNLLElBQUksQ0FBQyxRQURWLEVBQ29CLElBQUksQ0FBQyxTQUR6QixDQUFyQjtBQURGO0VBS0EsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsb0JBQUEsQ0FBQSxDQUFyQjtBQUNBLFNBQU87QUFUVTs7QUFXbkIsVUFBQSxHQUFhLFNBQUE7QUFDWCxNQUFBO0VBQUEsTUFBQSxHQUFTLFFBQVEsQ0FBQyxjQUFULENBQXdCLGVBQXhCO0VBRVQsR0FBQSxHQUFNO0FBRU4sT0FBQSx1Q0FBQTs7SUFDRSxJQUFBLENBQU8sSUFBSSxDQUFDLFFBQVo7QUFDRSxlQURGOztJQUVBLEtBQUEsR0FBUSxRQUFRLENBQUMsY0FBVCxDQUEyQixJQUFJLENBQUMsTUFBTixHQUFhLFFBQXZDO0lBQ1IsSUFBRyxxQkFBQSxJQUFpQixLQUFLLENBQUMsS0FBSyxDQUFDLE1BQVosR0FBcUIsQ0FBekM7TUFDRSxJQUFHLElBQUksQ0FBQyxPQUFSO1FBQ0UsR0FBSSxDQUFBLElBQUksQ0FBQyxNQUFMLENBQUosR0FBbUI7UUFDbkIsR0FBSSxDQUFBLElBQUksQ0FBQyxNQUFMLENBQWEsQ0FBQSxPQUFBLENBQWpCLEdBQTRCLFFBQUEsQ0FBUyxLQUFLLENBQUMsS0FBZixFQUY5QjtPQUFBLE1BQUE7UUFJRSxHQUFJLENBQUEsSUFBSSxDQUFDLE1BQUwsQ0FBSixHQUFtQixLQUFLLENBQUMsTUFKM0I7T0FERjs7QUFKRjtTQVdBLE1BQU0sQ0FBQyxTQUFQLEdBQW1CLFFBQUEsQ0FBUyxHQUFUO0FBaEJSOztBQWtCYixvQkFBQSxHQUF1QixTQUFBO0FBQ3JCLE1BQUE7RUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLElBQVIsRUFBYyxVQUFkO0VBQ1AsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsVUFBQSxDQUFBLENBQWpCO0VBQ0EsR0FBQSxHQUFNLGdCQUFBLENBQUE7RUFDTixHQUFHLENBQUMsZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsVUFBOUI7RUFDQSxJQUFJLENBQUMsV0FBTCxDQUFpQixHQUFqQjtFQUNBLElBQUksQ0FBQyxXQUFMLENBQWlCLFVBQUEsQ0FBQSxDQUFqQjtBQUNBLFNBQU87QUFQYzs7QUFTdkIsZ0JBQUEsR0FBbUIsU0FBQTtBQUNqQixTQUFPLFVBQUEsQ0FDTCxlQURLLEVBRUwscUZBRkssRUFHTCxJQUhLO0FBRFU7O0FBT25CLFVBQUEsR0FBYSxTQUFDLEVBQUQsRUFBSyxTQUFMLEVBQWdCLElBQWhCO0FBQ1gsTUFBQTtFQUFBLE1BQUEsR0FBUyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QjtFQUNULElBQWtCLFVBQWxCO0lBQUEsTUFBTSxDQUFDLEVBQVAsR0FBWSxHQUFaOztFQUNBLElBQWdDLGlCQUFoQztJQUFBLE1BQU0sQ0FBQyxTQUFQLEdBQW1CLFVBQW5COztFQUNBLE1BQU0sQ0FBQyxTQUFQLEdBQW1CO0FBQ25CLFNBQU87QUFMSTs7QUFPYixRQUFBLEdBQVcsU0FBQyxRQUFELEVBQVcsSUFBWCxFQUFpQixRQUFqQixFQUFrQyxTQUFsQztBQUNULE1BQUE7O0lBRDBCLFdBQVc7O0VBQ3JDLElBQUEsR0FBTyxPQUFBLENBQVEsSUFBUixFQUFjLFVBQWQ7RUFDUCxJQUFJLENBQUMsV0FBTCxDQUFpQixVQUFBLENBQUEsQ0FBakI7RUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLElBQVIsRUFBYywwQkFBZDtFQUNQLElBQUksQ0FBQyxXQUFMLENBQWlCLElBQWpCO0VBRUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxJQUFSLEVBQWMsZ0NBQWQ7RUFDWixJQUFJLENBQUMsV0FBTCxDQUFpQixTQUFqQjtFQUVBLElBQUcsUUFBSDtJQUNFLEtBQUEsR0FBUSxTQUFBLENBQWEsUUFBRCxHQUFVLFFBQXRCLEVBQStCLHNCQUEvQixFQUF1RCxNQUF2RDtJQUNSLEtBQUssQ0FBQyxPQUFOLEdBQWdCO0lBQ2hCLFNBQVMsQ0FBQyxXQUFWLENBQXNCLEtBQXRCLEVBSEY7O0VBS0EsS0FBQSxHQUFRLFNBQUEsQ0FBVSxJQUFWLEVBQWdCLHNCQUFoQixFQUEyQyxRQUFELEdBQVUsUUFBcEQsRUFBNkQsSUFBN0Q7RUFDUixTQUFTLENBQUMsV0FBVixDQUFzQixLQUF0QjtFQUVBLElBQUcsaUJBQUg7SUFDRSxTQUFBLEdBQVksT0FBQSxDQUFRLElBQVIsRUFBYywwQkFBZDtJQUNaLElBQUksQ0FBQyxXQUFMLENBQWlCLFNBQWpCLEVBRkY7R0FBQSxNQUFBO0lBSUUsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsT0FBQSxDQUFRLElBQVIsRUFBYywwQkFBZCxDQUFqQixFQUpGOztFQU1BLElBQUksQ0FBQyxXQUFMLENBQWlCLFVBQUEsQ0FBQSxDQUFqQjtBQUVBLFNBQU87QUExQkU7O0FBNEJYLE9BQUEsR0FBVSxTQUFDLEVBQUQsRUFBSyxTQUFMO0FBQ1IsTUFBQTtFQUFBLEdBQUEsR0FBTSxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QjtFQUNOLElBQWUsVUFBZjtJQUFBLEdBQUcsQ0FBQyxFQUFKLEdBQVMsR0FBVDs7RUFDQSxJQUE2QixpQkFBN0I7SUFBQSxHQUFHLENBQUMsU0FBSixHQUFnQixVQUFoQjs7QUFDQSxTQUFPO0FBSkM7O0FBTVYsU0FBQSxHQUFZLFNBQUMsRUFBRCxFQUFLLFNBQUwsRUFBZ0IsT0FBaEIsRUFBeUIsSUFBekIsRUFBK0IsS0FBL0I7QUFDVixNQUFBO0VBQUEsS0FBQSxHQUFRLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCO0VBQ1IsSUFBaUIsVUFBakI7SUFBQSxLQUFLLENBQUMsRUFBTixHQUFXLEdBQVg7O0VBQ0EsSUFBK0IsaUJBQS9CO0lBQUEsS0FBSyxDQUFDLFNBQU4sR0FBa0IsVUFBbEI7O0VBQ0EsSUFBMkIsZUFBM0I7SUFBQSxLQUFLLENBQUMsT0FBTixHQUFnQixRQUFoQjs7RUFDQSxJQUE0QixZQUE1QjtJQUFBLEtBQUssQ0FBQyxXQUFOLEdBQW9CLEtBQXBCOztFQUNBLElBQXVCLGFBQXZCO0lBQUEsS0FBSyxDQUFDLEtBQU4sR0FBYyxNQUFkOztBQUNBLFNBQU87QUFQRzs7QUFTWixTQUFBLEdBQVksU0FBQyxFQUFELEVBQUssU0FBTCxFQUFnQixJQUFoQjtBQUNWLE1BQUE7RUFBQSxLQUFBLEdBQVEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkI7RUFDUixJQUFpQixVQUFqQjtJQUFBLEtBQUssQ0FBQyxFQUFOLEdBQVcsR0FBWDs7RUFDQSxJQUErQixpQkFBL0I7SUFBQSxLQUFLLENBQUMsU0FBTixHQUFrQixVQUFsQjs7RUFDQSxJQUFxQixZQUFyQjtJQUFBLEtBQUssQ0FBQyxJQUFOLEdBQWEsS0FBYjs7QUFDQSxTQUFPO0FBTEc7O0FBT1osVUFBQSxHQUFhLFNBQUE7QUFDWCxTQUFPLE9BQUEsQ0FBUSxJQUFSLEVBQWMsbUJBQWQ7QUFESTs7OztBQzFIYixJQUFBOztBQUFBLFdBQUEsR0FBYyxTQUFDLFFBQUQ7QUFDWixNQUFBO0VBQUEsR0FBQSxHQUFNLElBQUksY0FBSixDQUFBO0VBQ04sR0FBRyxDQUFDLElBQUosQ0FBUyxLQUFULEVBQWdCLHlDQUFoQixFQUEyRCxJQUEzRDtFQUNBLEdBQUcsQ0FBQyxNQUFKLEdBQWE7RUFDYixHQUFHLENBQUMsSUFBSixDQUFBO0FBSlk7O0FBT2QsT0FBTyxDQUFDLE9BQVIsR0FBa0IsU0FBQyxRQUFEO0VBQ2hCLFdBQUEsQ0FBWSxTQUFBO0FBQ1YsUUFBQTtJQUFBLElBQUEsR0FBTyxJQUFJLENBQUMsS0FBTCxDQUFXLElBQUksQ0FBQyxZQUFoQjtXQUNQLFFBQUEsQ0FBUyxJQUFJLENBQUMsU0FBZDtFQUZVLENBQVo7QUFEZ0I7Ozs7QUNQbEIsSUFBQTs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFFBQVI7O0FBQ1AsSUFBQSxHQUFPLE9BQUEsQ0FBUSxRQUFSOztBQUNQLE9BQUEsR0FBVSxPQUFBLENBQVEsV0FBUjs7QUFFVixXQUFBLEdBQWM7O0FBRWQsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsU0FBQTtBQUNkLE1BQUE7RUFBQSxTQUFBLEdBQVksUUFBUSxDQUFDLGNBQVQsQ0FBd0IsUUFBeEI7RUFDWixJQUFHLGlCQUFIO0lBQ0UsSUFBSSxDQUFDLE9BQUwsQ0FBYSxTQUFDLElBQUQ7QUFDWCxVQUFBO01BQUEsV0FBQSxHQUFjO0FBQ2QsV0FBQSw2Q0FBQTs7UUFDRSxTQUFTLENBQUMsV0FBVixDQUFzQixJQUFJLENBQUMsUUFBTCxDQUFjLENBQWQsQ0FBdEI7QUFERjtJQUZXLENBQWIsRUFERjs7RUFPQSxLQUFBLEdBQVEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEI7RUFDUixJQUE4RCxhQUE5RDtJQUFBLEtBQUssQ0FBQyxnQkFBTixDQUF1QixRQUF2QixFQUFpQyx5QkFBakMsRUFBQTs7RUFFQSxNQUFBLEdBQVMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsaUJBQXhCO0VBQ1QsSUFBc0IsY0FBdEI7SUFBQSxPQUFPLENBQUMsUUFBUixDQUFBLEVBQUE7O0VBRUEsSUFBSSxTQUFKLENBQWMsWUFBZDtBQWZjOztBQW1CaEIseUJBQUEsR0FBNEIsU0FBQTtBQUMxQixNQUFBO0VBQUEsU0FBQSxHQUFZLFFBQVEsQ0FBQyxjQUFULENBQXdCLFFBQXhCO0VBQ1osS0FBQSxHQUFRLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCO0VBQ1IsSUFBQSxDQUFBLENBQU8sbUJBQUEsSUFBZSxlQUF0QixDQUFBO0FBQ0UsV0FERjs7QUFFQSxTQUFNLFNBQVMsQ0FBQyxVQUFoQjtJQUNFLFNBQVMsQ0FBQyxXQUFWLENBQXNCLFNBQVMsQ0FBQyxVQUFoQztFQURGO0VBR0EsSUFBQSxHQUFPO0VBQ1AsSUFBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQVosR0FBcUIsQ0FBeEI7SUFDRSxJQUFBLEdBQU8sV0FBVyxDQUFDLE1BQVosQ0FBbUIsU0FBQyxPQUFELEVBQVUsS0FBVixFQUFpQixLQUFqQjtBQUN4QixhQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBYixDQUFxQixLQUFLLENBQUMsS0FBM0IsQ0FBQSxLQUF1QyxDQUFDLENBQXhDLElBQ0wsQ0FBQyxPQUFPLENBQUMsT0FBUixJQUFvQixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQWhCLENBQXdCLEtBQUssQ0FBQyxLQUE5QixDQUFBLEtBQTBDLENBQUMsQ0FBaEUsQ0FESyxJQUVMLENBQUMsT0FBTyxDQUFDLGFBQVIsSUFBMEIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUF0QixDQUE4QixLQUFLLENBQUMsS0FBcEMsQ0FBQSxLQUFnRCxDQUFDLENBQTVFLENBRkssSUFHTCxDQUFDLE9BQU8sQ0FBQyxNQUFSLElBQW1CLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBZixDQUF1QixLQUFLLENBQUMsS0FBN0IsQ0FBQSxLQUF5QyxDQUFDLENBQTlEO0lBSnNCLENBQW5CLEVBRFQ7O0FBTUEsT0FBQSxzQ0FBQTs7SUFDRSxTQUFTLENBQUMsV0FBVixDQUFzQixJQUFJLENBQUMsUUFBTCxDQUFjLENBQWQsQ0FBdEI7QUFERjtBQWYwQjs7OztBQ3pCNUIsSUFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFlBQVI7O0FBQ1gsT0FBQSxHQUFVLE9BQUEsQ0FBUSxXQUFSOztBQUVWLE9BQU8sQ0FBQyxRQUFSLEdBQW1CLFNBQUMsT0FBRDtBQUNqQixNQUFBO0VBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxPQUFPLENBQUMsRUFBaEIsRUFBb0IscUNBQXBCO0VBRVYsUUFBQSxHQUFXLE9BQUEsQ0FBUSxJQUFSLEVBQWMsa0NBQWQ7RUFDWCxJQUFpRCx1QkFBakQ7SUFBQSxRQUFRLENBQUMsV0FBVCxDQUFxQixRQUFBLENBQVMsT0FBTyxDQUFDLE9BQWpCLENBQXJCLEVBQUE7O0VBQ0EsS0FBQSxHQUFRLEVBQUEsR0FBRyxPQUFPLENBQUM7RUFDbkIsSUFBa0Qsc0JBQWxEO0lBQUEsS0FBQSxJQUFTLEVBQUEsR0FBRSxDQUFDLE9BQU8sQ0FBQyxRQUFSLENBQWlCLE9BQU8sQ0FBQyxNQUF6QixDQUFELEVBQVg7O0VBQ0EsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBQSxDQUFPLEtBQVAsQ0FBckI7RUFDQSxPQUFPLENBQUMsV0FBUixDQUFvQixRQUFwQjtFQUVBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLElBQVIsRUFBYywyQkFBZDtFQUNqQixjQUFjLENBQUMsU0FBZixHQUEyQixhQUFBLENBQWMsT0FBZDtFQUMzQixPQUFPLENBQUMsV0FBUixDQUFvQixjQUFwQjtFQUVBLFNBQUEsR0FBWSxPQUFBLENBQVEsSUFBUixFQUFjLG9DQUFkO0VBQ1osU0FBUyxDQUFDLFdBQVYsQ0FBc0IsS0FBQSxDQUNwQixtRUFEb0IsRUFFcEIsaUJBRm9CLEVBR3BCLFFBQVEsQ0FBQyxPQUFULENBQWlCLE9BQWpCLENBSG9CLENBQXRCO0VBS0EsU0FBUyxDQUFDLFdBQVYsQ0FBc0IsVUFBQSxDQUFBLENBQXRCO0VBQ0EsU0FBUyxDQUFDLFdBQVYsQ0FBc0IsS0FBQSxDQUFNLGdCQUFOLEVBQXdCLE9BQXhCLENBQXRCO0VBQ0EsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsU0FBcEI7QUFFQSxTQUFPO0FBeEJVOztBQTBCbkIsVUFBQSxHQUFhLFNBQUE7QUFDWCxTQUFPLE9BQUEsQ0FBUSxJQUFSLEVBQWMsbUJBQWQ7QUFESTs7QUFHYixPQUFPLENBQUMsVUFBUixHQUFxQjs7QUFFckIsT0FBQSxHQUFVLFNBQUMsRUFBRCxFQUFLLFNBQUw7QUFDUixNQUFBO0VBQUEsQ0FBQSxHQUFJLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCO0VBQ0osSUFBYSxVQUFiO0lBQUEsQ0FBQyxDQUFDLEVBQUYsR0FBTyxHQUFQOztFQUNBLElBQTJCLGlCQUEzQjtJQUFBLENBQUMsQ0FBQyxTQUFGLEdBQWMsVUFBZDs7QUFDQSxTQUFPO0FBSkM7O0FBTVYsTUFBQSxHQUFTLFNBQUMsSUFBRDtBQUNQLE1BQUE7RUFBQSxFQUFBLEdBQUssUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkI7RUFDTCxJQUF1QixZQUF2QjtJQUFBLEVBQUUsQ0FBQyxTQUFILEdBQWUsS0FBZjs7QUFDQSxTQUFPO0FBSEE7O0FBS1QsS0FBQSxHQUFRLFNBQUMsU0FBRCxFQUFZLElBQVosRUFBa0IsSUFBbEI7QUFDTixNQUFBO0VBQUEsQ0FBQSxHQUFJLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCO0VBQ0osSUFBMkIsaUJBQTNCO0lBQUEsQ0FBQyxDQUFDLFNBQUYsR0FBYyxVQUFkOztFQUNBLElBQXNCLFlBQXRCO0lBQUEsQ0FBQyxDQUFDLFNBQUYsR0FBYyxLQUFkOztFQUNBLElBQWlCLFlBQWpCO0lBQUEsQ0FBQyxDQUFDLElBQUYsR0FBUyxLQUFUOztFQUNBLENBQUMsQ0FBQyxNQUFGLEdBQVc7QUFDWCxTQUFPO0FBTkQ7O0FBUVIsS0FBQSxHQUFRLFNBQUMsU0FBRCxFQUFZLElBQVo7QUFDTixNQUFBO0VBQUEsQ0FBQSxHQUFJLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCO0VBQ0osSUFBMkIsaUJBQTNCO0lBQUEsQ0FBQyxDQUFDLFNBQUYsR0FBYyxVQUFkOztFQUNBLElBQXNCLFlBQXRCO0lBQUEsQ0FBQyxDQUFDLFNBQUYsR0FBYyxLQUFkOztBQUNBLFNBQU87QUFKRDs7QUFNUixRQUFBLEdBQVcsU0FBQyxJQUFEO0FBQ1QsTUFBQTtFQUFBLGNBQUEsR0FBaUIsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkI7RUFDakIsY0FBYyxDQUFDLFNBQWYsR0FDRTtFQUNGLGNBQWMsQ0FBQyxTQUFmLEdBQTJCLElBQUksQ0FBQyxNQUFMLENBQVksQ0FBWixFQUFlLENBQWY7QUFDM0IsU0FBTztBQUxFOztBQU9YLGFBQUEsR0FBZ0IsU0FBQyxPQUFEO0FBQ2QsU0FBTyxPQUFPLENBQUMsVUFBUixDQUFtQixPQUFuQixFQUE0QixJQUE1QixFQUFrQyxLQUFsQztBQURPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNhbG9yaWUgPSByZXF1aXJlKCcuL2NhbG9yaWUnKVxuXG5leHBvcnRzLm1ha2VVcmwgPSAoY29udGVudCkgLT5cbiAgdW5sZXNzIGNvbnRlbnQ/XG4gICAgcmV0dXJuIFwiXCJcblxuICBkYXRlID0gZ2V0VVRDKG5ldyBEYXRlKCkpXG5cbiAgcmV0dXJuIFwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9jYWxlbmRhci9ldmVudD9hY3Rpb249VEVNUExBVEVcIiArXG4gICAgXCImdGV4dD0je2dldFRleHQoY29udGVudCl9XCIgK1xuICAgIFwiJmRldGFpbHM9I3tnZXREZXRhaWxzKGNvbnRlbnQpfVwiICtcbiAgICBcIiZkYXRlcz0je2RhdGV9LyN7ZGF0ZX1cIlxuXG5nZXRVVEMgPSAoZGF0ZSkgLT5cbiAgcmV0dXJuIGRhdGUuZ2V0VVRDRnVsbFllYXIoKSArXG4gICAgemVyb2ZpbGwoZGF0ZS5nZXRVVENNb250aCgpKzEpICtcbiAgICB6ZXJvZmlsbChkYXRlLmdldFVUQ0RhdGUoKSkgK1xuICAgICdUJyArXG4gICAgemVyb2ZpbGwoZGF0ZS5nZXRVVENIb3VycygpKSArXG4gICAgemVyb2ZpbGwoZGF0ZS5nZXRVVENNaW51dGVzKCkpICtcbiAgICB6ZXJvZmlsbChkYXRlLmdldFVUQ1NlY29uZHMoKSkgK1xuICAgICdaJ1xuXG56ZXJvZmlsbCA9IChudW0pIC0+XG4gIHJldHVybiAoJzAnICsgbnVtKS5zbGljZSgtMilcblxuZ2V0VGV4dCA9IChjb250ZW50KSAtPlxuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgIFwiI3tjb250ZW50Lm5hbWV9ICN7Y2Fsb3JpZS50b1N0cmluZyhjb250ZW50LmVuZXJneSl9XCJcbiAgKVxuXG5nZXREZXRhaWxzID0gKGNvbnRlbnQpIC0+XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQgY2Fsb3JpZS5nZXREZXRhaWxzIGNvbnRlbnQsIGZhbHNlXG5cbmdldERhdGFVcmwgPSAoY29udGVudCkgLT5cbiAgdXJsID0gJ2h0dHBzOi8vdGFuam9pbi5naXRodWIuaW8vY2Fsb3JpZS1tZW1vP2lkPSdcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh1cmwgKyBjb250ZW50LmlkKVxuIiwiZXhwb3J0cy5jb252ZXJ0VG9TYWx0ID0gKHNvZGl1bSkgLT5cbiAgcmV0dXJuIHNvZGl1bSAqIDIuNTQgLyAxMDAwXG5cbmV4cG9ydHMuY29udmVydFRvU29kaXVtID0gKHNhbHQpIC0+XG4gIHJldHVybiBzYWx0IC8gMi41NCAqIDEwMDBcblxuZXhwb3J0cy5jYWxjQ2FyYm9oeWRyYXRlID0gKHNhY2NoYXJpZGUsIGRpZXRhcnlfZmliZXIpIC0+XG4gIHJldHVybiBzYWNjaGFyaWRlICsgZGlldGFyeV9maWJlclxuXG5leHBvcnRzLmdldERldGFpbHMgPSAoY29udGVudCwgaXNTaG93RW5lcmd5ID0gdHJ1ZSwgaXNTaG93Vm9sdW1lID0gdHJ1ZSkgLT5cbiAgZGV0YWlscyA9IFwiXCJcbiAgZGV0YWlscyArPSBcIklEICN7Y29udGVudC5pZH1cXG5odHRwczovL3RhbmpvLmluL2NhbG9yaWUtbWVtby8/aWQ9I3tjb250ZW50LmlkfVxcblwiIGlmIGNvbnRlbnQuaWQ/XG4gIGRldGFpbHMgKz0gXCIje3RvU3RyaW5nKGNvbnRlbnQuZW5lcmd5KX1cXG5cIiBpZiBjb250ZW50LmVuZXJneT8gYW5kIGlzU2hvd0VuZXJneVxuICBkZXRhaWxzICs9IFwi44Gf44KT44Gx44GP6LOqICN7dG9TdHJpbmcoY29udGVudC5wcm90ZWluKX1cXG5cIiBpZiBjb250ZW50LnByb3RlaW4/XG4gIGRldGFpbHMgKz0gXCLohILos6ogI3t0b1N0cmluZyhjb250ZW50LmZhdCl9XFxuXCIgaWYgY29udGVudC5mYXQ/XG4gIGRldGFpbHMgKz0gXCLngq3msLTljJbniakgI3t0b1N0cmluZyhjb250ZW50LmNhcmJvaHlkcmF0ZSl9XFxuXCIgaWYgY29udGVudC5jYXJib2h5ZHJhdGU/XG4gIGRldGFpbHMgKz0gXCLns5bos6ogI3t0b1N0cmluZyhjb250ZW50LnNhY2NoYXJpZGUpfVxcblwiIGlmIGNvbnRlbnQuc2FjY2hhcmlkZT9cbiAgZGV0YWlscyArPSBcIumjn+eJqee5iue2rSAje3RvU3RyaW5nKGNvbnRlbnQuZGlldGFyeV9maWJlcil9XFxuXCIgaWYgY29udGVudC5kaWV0YXJ5X2ZpYmVyP1xuICBkZXRhaWxzICs9IFwiTmEgI3t0b1N0cmluZyhjb250ZW50Lm5hKX1cXG5cIiBpZiBjb250ZW50Lm5hP1xuICBkZXRhaWxzICs9IFwi6aOf5aGp55u45b2T6YePICN7dG9TdHJpbmcoY29udGVudC5zYWx0KX1cXG5cIiBpZiBjb250ZW50LnNhbHQ/XG4gIGRldGFpbHMgKz0gXCJDYSAje3RvU3RyaW5nKGNvbnRlbnQuY2EpfVxcblwiIGlmIGNvbnRlbnQuY2E/XG4gIGRldGFpbHMgKz0gXCJNZyAje3RvU3RyaW5nKGNvbnRlbnQubWcpfVxcblwiIGlmIGNvbnRlbnQubWc/XG4gIGRldGFpbHMgKz0gXCJLICN7dG9TdHJpbmcoY29udGVudC5rKX1cXG5cIiBpZiBjb250ZW50Lms/XG4gIGRldGFpbHMgKz0gXCJQICN7dG9TdHJpbmcoY29udGVudC5wKX1cXG5cIiBpZiBjb250ZW50LnA/XG4gIGRldGFpbHMgKz0gXCLnoazluqYgI3t0b1N0cmluZyhjb250ZW50LmhhcmRuZXNzKX1cXG5cIiBpZiBjb250ZW50LmhhcmRuZXNzP1xuICBkZXRhaWxzICs9IFwicGggI3t0b1N0cmluZyhjb250ZW50LnBoKX1cXG5cIiBpZiBjb250ZW50LnBoP1xuICBkZXRhaWxzICs9IFwi5YaF5a656YePICN7dG9TdHJpbmcoY29udGVudC52b2x1bWUpfVxcblwiIGlmIGNvbnRlbnQudm9sdW1lPyBhbmQgaXNTaG93Vm9sdW1lXG4gIGRldGFpbHMgKz0gXCIje3RvU3RyaW5nKGNvbnRlbnQucGVyKX3jgYLjgZ/jgopcXG5cIiBpZiBjb250ZW50LnBlcj9cbiAgcmV0dXJuIGRldGFpbHNcblxudG9TdHJpbmcgPSAoaXRlbSkgLT5cbiAgaWYgdHlwZW9mIGl0ZW0udmFsdWUgaXMgJ251bWJlcidcbiAgICB0ZXh0ID0gXCIje2l0ZW0udmFsdWV9XCJcbiAgICB0ZXh0ID0gXCLntIRcIiArIHRleHQgaWYgaXRlbS5hYm91dD9cbiAgICB0ZXh0ICs9IFwiI3tpdGVtLnVuaXR9XCIgaWYgaXRlbS51bml0P1xuICAgIHRleHQgKz0gXCLmnKrmuoBcIiBpZiBpdGVtLnVuZGVyP1xuICAgIHRleHQgKz0gXCIgKCN7aXRlbS5yZW1hcmt9KVwiIGlmIGl0ZW0ucmVtYXJrP1xuICAgIHJldHVybiB0ZXh0XG4gIGVsc2UgaWYgdHlwZW9mIGl0ZW0udmFsdWUgaXMgJ29iamVjdCcgYW5kIGl0ZW0udmFsdWUubWF4PyBhbmQgaXRlbS52YWx1ZS5taW4/XG4gICAgdGV4dCA9IFwiI3tpdGVtLnZhbHVlLm1pbn3jgJwje2l0ZW0udmFsdWUubWF4fVwiXG4gICAgdGV4dCA9IFwi57SEXCIgKyB0ZXh0IGlmIGl0ZW0uYWJvdXQ/XG4gICAgdGV4dCArPSBcIiN7aXRlbS51bml0fVwiIGlmIGl0ZW0udW5pdD9cbiAgICB0ZXh0ICs9IFwi5pyq5rqAXCIgaWYgaXRlbS51bmRlcj9cbiAgICB0ZXh0ICs9IFwiICgje2l0ZW0ucmVtYXJrfSlcIiBpZiBpdGVtLnJlbWFyaz9cbiAgICByZXR1cm4gdGV4dFxuICByZXR1cm4gXCJcIlxuXG5leHBvcnRzLnRvU3RyaW5nID0gdG9TdHJpbmdcbiIsImdyaWRzID0gW1xuICB7IHByZWZpeDogXCJpZFwiLCB0ZXh0OiBcIklEXCIsIGhhc0lucHV0OiBmYWxzZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiBmYWxzZSB9LFxuICB7IHByZWZpeDogXCJuYW1lXCIsIHRleHQ6IFwi5ZWG5ZOB5ZCNXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IGZhbHNlIH0sXG4gIHsgcHJlZml4OiBcImNvbXBhbnlcIiwgdGV4dDogXCLkvJrnpL7lkI1cIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogZmFsc2UgfSxcbiAgeyBwcmVmaXg6IFwiZW5lcmd5XCIsIHRleHQ6IFwi44Kr44Ot44Oq44O8XCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwicHJvdGVpblwiLCB0ZXh0OiBcIuOBn+OCk+OBseOBj+izqlwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiB0cnVlIH0sXG4gIHsgcHJlZml4OiBcImZhdFwiLCB0ZXh0OiBcIuiEguizqlwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiB0cnVlIH0sXG4gIHsgcHJlZml4OiBcImNhcmJvaHlkcmF0ZVwiLCB0ZXh0OiBcIueCreawtOWMlueJqVwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiB0cnVlIH0sXG4gIHsgcHJlZml4OiBcIm5hXCIsIHRleHQ6IFwi44OK44OI44Oq44Km44OgXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IFtcIm1nXCIsIFwiZ1wiXSwgaXNWYWx1ZTogdHJ1ZSB9LFxuICB7IHByZWZpeDogXCJzYWx0XCIsIHRleHQ6IFwi6aOf5aGp55u45b2T6YePXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwidm9sdW1lXCIsIHRleHQ6IFwi5YaF5a656YePXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwicGVyXCIsIHRleHQ6IFwi4peL4peL44GC44Gf44KKXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwiY2FcIiwgdGV4dDogXCLjgqvjg6vjgrfjgqbjg6BcIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogdHJ1ZSB9LFxuICB7IHByZWZpeDogXCJtZ1wiLCB0ZXh0OiBcIuODnuOCsOODjeOCt+OCpuODoFwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiB0cnVlIH0sXG4gIHsgcHJlZml4OiBcImtcIiwgdGV4dDogXCLjgqvjg6rjgqbjg6BcIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogdHJ1ZSB9XG5dXG5cbm1ha2VKc29uID0gKGRhdGEpIC0+XG4gIEpTT04uc3RyaW5naWZ5IGRhdGFcblxuZXhwb3J0cy5pbml0VmlldyA9IC0+XG4gIGNvbnRlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ2NvbnRlbnRzLWNyZWF0ZSdcblxuICBmb3IgZ3JpZCBpbiBncmlkc1xuICAgIGNvbnRlbnRzLmFwcGVuZENoaWxkIG1ha2VHcmlkKFxuICAgICAgZ3JpZC5wcmVmaXgsIGdyaWQudGV4dCwgZ3JpZC5oYXNJbnB1dCwgZ3JpZC5yYWRpb2J0bnNcbiAgICApXG5cbiAgY29udGVudHMuYXBwZW5kQ2hpbGQgbWFrZUNyZWF0ZUJ1dHRvbkdyaWQoKVxuICByZXR1cm4gY29udGVudHNcblxuc2hvd1Jlc3VsdCA9IC0+XG4gIHJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdyZXN1bHQtY3JlYXRlJ1xuXG4gIG9iaiA9IHt9XG5cbiAgZm9yIGdyaWQgaW4gZ3JpZHNcbiAgICB1bmxlc3MgZ3JpZC5oYXNJbnB1dFxuICAgICAgY29udGludWVcbiAgICBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiI3tncmlkLnByZWZpeH0taW5wdXRcIlxuICAgIGlmIGlucHV0LnZhbHVlPyBhbmQgaW5wdXQudmFsdWUubGVuZ3RoID4gMFxuICAgICAgaWYgZ3JpZC5pc1ZhbHVlXG4gICAgICAgIG9ialtncmlkLnByZWZpeF0gPSB7fVxuICAgICAgICBvYmpbZ3JpZC5wcmVmaXhdW1widmFsdWVcIl0gPSBwYXJzZUludCBpbnB1dC52YWx1ZVxuICAgICAgZWxzZVxuICAgICAgICBvYmpbZ2lyZC5wcmVmaXhdID0gaW5wdXQudmFsdWVcblxuICByZXN1bHQuaW5uZXJUZXh0ID0gbWFrZUpzb24gb2JqXG5cbm1ha2VDcmVhdGVCdXR0b25HcmlkID0gLT5cbiAgZ3JpZCA9IG1ha2VEaXYgbnVsbCwgXCJtZGwtZ3JpZFwiXG4gIGdyaWQuYXBwZW5kQ2hpbGQgbWFrZVNwYWNlcigpXG4gIGJ0biA9IG1ha2VDcmVhdGVCdXR0b24oKVxuICBidG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCBzaG93UmVzdWx0XG4gIGdyaWQuYXBwZW5kQ2hpbGQgYnRuXG4gIGdyaWQuYXBwZW5kQ2hpbGQgbWFrZVNwYWNlcigpXG4gIHJldHVybiBncmlkXG5cbm1ha2VDcmVhdGVCdXR0b24gPSAtPlxuICByZXR1cm4gbWFrZUJ1dHRvbihcbiAgICBcImNyZWF0ZS1idXR0b25cIixcbiAgICBcIm1kbC1idXR0b24gbWRsLWpzLWJ1dHRvbiBtZGwtYnV0dG9uLS1yYWlzZWQgbWRsLWpzLXJpcHBsZS1lZmZlY3QgbWRsLWJ1dHRvbi0tYWNjZW50XCIsXG4gICAgXCLkvZzmiJBcIlxuICApXG5cbm1ha2VCdXR0b24gPSAoaWQsIGNsYXNzTmFtZSwgdGV4dCkgLT5cbiAgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnYnV0dG9uJ1xuICBidXR0b24uaWQgPSBpZCBpZiBpZD9cbiAgYnV0dG9uLmNsYXNzTmFtZSA9IGNsYXNzTmFtZSBpZiBjbGFzc05hbWU/XG4gIGJ1dHRvbi5pbm5lclRleHQgPSB0ZXh0XG4gIHJldHVybiBidXR0b25cblxubWFrZUdyaWQgPSAoaWRQcmVmaXgsIHRleHQsIGhhc0lucHV0ID0gdHJ1ZSwgcmFkaW9idG5zKSAtPlxuICBncmlkID0gbWFrZURpdiBudWxsLCBcIm1kbC1ncmlkXCJcbiAgZ3JpZC5hcHBlbmRDaGlsZCBtYWtlU3BhY2VyKClcblxuICBjZWxsID0gbWFrZURpdiBudWxsLCBcIm1kbC1jZWxsIG1kbC1jZWxsLS00LWNvbFwiXG4gIGdyaWQuYXBwZW5kQ2hpbGQgY2VsbFxuXG4gIHRleHRGaWxlZCA9IG1ha2VEaXYgbnVsbCwgXCJtZGwtdGV4dGZpZWxkIG1kbC1qcy10ZXh0ZmllbGRcIlxuICBjZWxsLmFwcGVuZENoaWxkIHRleHRGaWxlZFxuXG4gIGlmIGhhc0lucHV0XG4gICAgaW5wdXQgPSBtYWtlSW5wdXQgXCIje2lkUHJlZml4fS1pbnB1dFwiLCBcIm1kbC10ZXh0ZmllbGRfX2lucHV0XCIsIFwidGV4dFwiXG4gICAgaW5wdXQucGF0dGVybiA9IFwiLT9bMC05XSooXFwuWzAtOV0rKT9cIlxuICAgIHRleHRGaWxlZC5hcHBlbmRDaGlsZCBpbnB1dFxuXG4gIGxhYmVsID0gbWFrZUxhYmVsIG51bGwsIFwibWRsLXRleHRmaWVsZF9fbGFiZWxcIiwgXCIje2lkUHJlZml4fS1pbnB1dFwiLCB0ZXh0XG4gIHRleHRGaWxlZC5hcHBlbmRDaGlsZCBsYWJlbFxuXG4gIGlmIHJhZGlvYnRucz9cbiAgICByYWRpb0NlbGwgPSBtYWtlRGl2IG51bGwsIFwibWRsLWNlbGwgbWRsLWNlbGwtLTQtY29sXCJcbiAgICBncmlkLmFwcGVuZENoaWxkIHJhZGlvQ2VsbFxuICBlbHNlXG4gICAgZ3JpZC5hcHBlbmRDaGlsZCBtYWtlRGl2IG51bGwsIFwibWRsLWNlbGwgbWRsLWNlbGwtLTQtY29sXCJcblxuICBncmlkLmFwcGVuZENoaWxkIG1ha2VTcGFjZXIoKVxuXG4gIHJldHVybiBncmlkXG5cbm1ha2VEaXYgPSAoaWQsIGNsYXNzTmFtZSkgLT5cbiAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuICBkaXYuaWQgPSBpZCBpZiBpZD9cbiAgZGl2LmNsYXNzTmFtZSA9IGNsYXNzTmFtZSBpZiBjbGFzc05hbWU/XG4gIHJldHVybiBkaXZcblxubWFrZUxhYmVsID0gKGlkLCBjbGFzc05hbWUsIGh0bWxGb3IsIHRleHQsIHZhbHVlKSAtPlxuICBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2xhYmVsJ1xuICBsYWJlbC5pZCA9IGlkIGlmIGlkP1xuICBsYWJlbC5jbGFzc05hbWUgPSBjbGFzc05hbWUgaWYgY2xhc3NOYW1lP1xuICBsYWJlbC5odG1sRm9yID0gaHRtbEZvciBpZiBodG1sRm9yP1xuICBsYWJlbC50ZXh0Q29udGVudCA9IHRleHQgaWYgdGV4dD9cbiAgbGFiZWwudmFsdWUgPSB2YWx1ZSBpZiB2YWx1ZT9cbiAgcmV0dXJuIGxhYmVsXG5cbm1ha2VJbnB1dCA9IChpZCwgY2xhc3NOYW1lLCB0eXBlKSAtPlxuICBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2lucHV0J1xuICBpbnB1dC5pZCA9IGlkIGlmIGlkP1xuICBpbnB1dC5jbGFzc05hbWUgPSBjbGFzc05hbWUgaWYgY2xhc3NOYW1lP1xuICBpbnB1dC50eXBlID0gdHlwZSBpZiB0eXBlP1xuICByZXR1cm4gaW5wdXRcblxubWFrZVNwYWNlciA9ICgpIC0+XG4gIHJldHVybiBtYWtlRGl2IG51bGwsIFwibWRsLWxheW91dC1zcGFjZXJcIlxuIiwiZ2V0SnNvbkRhdGEgPSAoY2FsbGJhY2spIC0+XG4gIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gIHJlcS5vcGVuIFwiR0VUXCIsIFwiaHR0cHM6Ly90YW5qby5pbi9jYWxvcmllLW1lbW8vZGF0YS5qc29uXCIsIHRydWVcbiAgcmVxLm9ubG9hZCA9IGNhbGxiYWNrXG4gIHJlcS5zZW5kKClcbiAgcmV0dXJuXG5cbmV4cG9ydHMuZ2V0RGF0YSA9IChjYWxsYmFjaykgLT5cbiAgZ2V0SnNvbkRhdGEgLT5cbiAgICBkYXRhID0gSlNPTi5wYXJzZSB0aGlzLnJlc3BvbnNlVGV4dFxuICAgIGNhbGxiYWNrIGRhdGEudGVtcGxhdGVzXG4gIHJldHVyblxuIiwiZGF0YSA9IHJlcXVpcmUgJy4vZGF0YSdcbnZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5jcmVhdG9yID0gcmVxdWlyZSAnLi9jcmVhdG9yJ1xuXG5jYWxvcmllRGF0YSA9IFtdXG5cbndpbmRvdy5vbmxvYWQgPSAtPlxuICByZXN1bHREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAncmVzdWx0J1xuICBpZiByZXN1bHREaXY/XG4gICAgZGF0YS5nZXREYXRhIChkYXRhKSAtPlxuICAgICAgY2Fsb3JpZURhdGEgPSBkYXRhXG4gICAgICBmb3IgZCBpbiBjYWxvcmllRGF0YVxuICAgICAgICByZXN1bHREaXYuYXBwZW5kQ2hpbGQgdmlldy5tYWtlSHRtbCBkXG4gICAgICByZXR1cm5cblxuICBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdzZWFyY2gtaW5wdXQnXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgJ2NoYW5nZScsIGRpZFNlYXJjaElucHV0VGV4dENoYW5nZWQgaWYgaW5wdXQ/XG5cbiAgY3JlYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ2NvbnRlbnRzLWNyZWF0ZSdcbiAgY3JlYXRvci5pbml0VmlldygpIGlmIGNyZWF0ZT9cblxuICBuZXcgQ2xpcGJvYXJkICcuY2xpcGJvYXJkJ1xuXG4gIHJldHVyblxuXG5kaWRTZWFyY2hJbnB1dFRleHRDaGFuZ2VkID0gLT5cbiAgcmVzdWx0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ3Jlc3VsdCdcbiAgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAnc2VhcmNoLWlucHV0J1xuICB1bmxlc3MgcmVzdWx0RGl2PyBhbmQgaW5wdXQ/XG4gICAgcmV0dXJuXG4gIHdoaWxlIHJlc3VsdERpdi5maXJzdENoaWxkXG4gICAgcmVzdWx0RGl2LnJlbW92ZUNoaWxkIHJlc3VsdERpdi5maXJzdENoaWxkXG5cbiAgbGlzdCA9IGNhbG9yaWVEYXRhXG4gIGlmIGlucHV0LnZhbHVlLmxlbmd0aCA+IDBcbiAgICBsaXN0ID0gY2Fsb3JpZURhdGEuZmlsdGVyIChlbGVtZW50LCBpbmRleCwgYXJyYXkpIC0+XG4gICAgICByZXR1cm4gZWxlbWVudC5uYW1lLmluZGV4T2YoaW5wdXQudmFsdWUpIGlzbnQgLTEgb3JcbiAgICAgICAgKGVsZW1lbnQuY29tcGFueSBhbmQgZWxlbWVudC5jb21wYW55LmluZGV4T2YoaW5wdXQudmFsdWUpIGlzbnQgLTEpIG9yXG4gICAgICAgIChlbGVtZW50LnByaWNlX2NvbXBhbnkgYW5kIGVsZW1lbnQucHJpY2VfY29tcGFueS5pbmRleE9mKGlucHV0LnZhbHVlKSBpc250IC0xKSBvclxuICAgICAgICAoZWxlbWVudC5yZW1hcmsgYW5kIGVsZW1lbnQucmVtYXJrLmluZGV4T2YoaW5wdXQudmFsdWUpIGlzbnQgLTEpXG4gIGZvciBkIGluIGxpc3RcbiAgICByZXN1bHREaXYuYXBwZW5kQ2hpbGQgdmlldy5tYWtlSHRtbCBkXG4gIHJldHVyblxuIiwiY2FsZW5kYXIgPSByZXF1aXJlKCcuL2NhbGVuZGFyJylcbmNhbG9yaWUgPSByZXF1aXJlKCcuL2NhbG9yaWUnKVxuXG5leHBvcnRzLm1ha2VIdG1sID0gKGNvbnRlbnQpIC0+XG4gIGNhcmREaXYgPSBtYWtlRGl2KGNvbnRlbnQuaWQsIFwiY2FyZC1ldmVudCBtZGwtY2FyZCBtZGwtc2hhZG93LS0yZHBcIilcblxuICB0aXRsZURpdiA9IG1ha2VEaXYobnVsbCwgXCJtZGwtY2FyZF9fdGl0bGUgbWRsLWNhcmQtLWV4cGFuZFwiKVxuICB0aXRsZURpdi5hcHBlbmRDaGlsZCBtYWtlQ2hpcCBjb250ZW50LmNvbXBhbnkgaWYgY29udGVudC5jb21wYW55P1xuICB0aXRsZSA9IFwiI3tjb250ZW50Lm5hbWV9XCJcbiAgdGl0bGUgKz0gXCIje2NhbG9yaWUudG9TdHJpbmcoY29udGVudC52b2x1bWUpfVwiIGlmIGNvbnRlbnQudm9sdW1lP1xuICB0aXRsZURpdi5hcHBlbmRDaGlsZCBtYWtlSDQgdGl0bGVcbiAgY2FyZERpdi5hcHBlbmRDaGlsZCB0aXRsZURpdlxuXG4gIHN1cHBvcnRUZXh0RGl2ID0gbWFrZURpdihudWxsLCBcIm1kbC1jYXJkX19zdXBwb3J0aW5nLXRleHRcIilcbiAgc3VwcG9ydFRleHREaXYuaW5uZXJUZXh0ID0gZ2V0U3VwcHJ0VGV4dCBjb250ZW50XG4gIGNhcmREaXYuYXBwZW5kQ2hpbGQgc3VwcG9ydFRleHREaXZcblxuICBhY3Rpb25EaXYgPSBtYWtlRGl2KG51bGwsIFwibWRsLWNhcmRfX2FjdGlvbnMgbWRsLWNhcmQtLWJvcmRlclwiKVxuICBhY3Rpb25EaXYuYXBwZW5kQ2hpbGQgbWFrZUEoXG4gICAgXCJtZGwtYnV0dG9uIG1kbC1idXR0b24tLWNvbG9yZWQgbWRsLWpzLWJ1dHRvbiBtZGwtanMtcmlwcGxlLWVmZmVjdFwiLFxuICAgIFwiQWRkIHRvIENhbGVuZGFyXCIsXG4gICAgY2FsZW5kYXIubWFrZVVybChjb250ZW50KVxuICApXG4gIGFjdGlvbkRpdi5hcHBlbmRDaGlsZCBtYWtlU3BhY2VyKClcbiAgYWN0aW9uRGl2LmFwcGVuZENoaWxkIG1ha2VJKFwibWF0ZXJpYWwtaWNvbnNcIiwgXCJldmVudFwiKVxuICBjYXJkRGl2LmFwcGVuZENoaWxkIGFjdGlvbkRpdlxuXG4gIHJldHVybiBjYXJkRGl2XG5cbm1ha2VTcGFjZXIgPSAtPlxuICByZXR1cm4gbWFrZURpdihudWxsLCBcIm1kbC1sYXlvdXQtc3BhY2VyXCIpXG5cbmV4cG9ydHMubWFrZVNwYWNlciA9IG1ha2VTcGFjZXJcblxubWFrZURpdiA9IChpZCwgY2xhc3NOYW1lKSAtPlxuICBkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuICBkLmlkID0gaWQgaWYgaWQ/XG4gIGQuY2xhc3NOYW1lID0gY2xhc3NOYW1lIGlmIGNsYXNzTmFtZT9cbiAgcmV0dXJuIGRcblxubWFrZUg0ID0gKHRleHQpIC0+XG4gIGg0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnaDQnXG4gIGg0LmlubmVyVGV4dCA9IHRleHQgaWYgdGV4dD9cbiAgcmV0dXJuIGg0XG5cbm1ha2VBID0gKGNsYXNzTmFtZSwgdGV4dCwgaHJlZikgLT5cbiAgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2EnXG4gIGEuY2xhc3NOYW1lID0gY2xhc3NOYW1lIGlmIGNsYXNzTmFtZT9cbiAgYS5pbm5lclRleHQgPSB0ZXh0IGlmIHRleHQ/XG4gIGEuaHJlZiA9IGhyZWYgaWYgaHJlZj9cbiAgYS50YXJnZXQgPSBcIl9ibGFua1wiXG4gIHJldHVybiBhXG5cbm1ha2VJID0gKGNsYXNzTmFtZSwgdGV4dCkgLT5cbiAgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2knXG4gIGkuY2xhc3NOYW1lID0gY2xhc3NOYW1lIGlmIGNsYXNzTmFtZT9cbiAgaS5pbm5lclRleHQgPSB0ZXh0IGlmIHRleHQ/XG4gIHJldHVybiBpXG5cbm1ha2VDaGlwID0gKHRleHQpIC0+XG4gIG1kbENoaXBDb250YWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnc3BhbidcbiAgbWRsQ2hpcENvbnRhY3QuY2xhc3NOYW1lID1cbiAgICBcIm1kbC1jaGlwX19jb250YWN0IG1kbC1jb2xvci0tdGVhbCBtZGwtY29sb3ItdGV4dC0td2hpdGVcIlxuICBtZGxDaGlwQ29udGFjdC5pbm5lclRleHQgPSB0ZXh0LnN1YnN0ciAwLCAxXG4gIHJldHVybiBtZGxDaGlwQ29udGFjdFxuXG5nZXRTdXBwcnRUZXh0ID0gKGNvbnRlbnQpIC0+XG4gIHJldHVybiBjYWxvcmllLmdldERldGFpbHMgY29udGVudCwgdHJ1ZSwgZmFsc2VcbiJdfQ==

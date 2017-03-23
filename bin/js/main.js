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

exports.getDetails = function(content, isShowEnergy, isShowVolume) {
  var details;
  if (isShowEnergy == null) {
    isShowEnergy = true;
  }
  if (isShowVolume == null) {
    isShowVolume = true;
  }
  details = "";
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
  if ((content.volume != null) && isShowVolume) {
    details += "内容量 " + (toString(content.volume)) + "\n";
  }
  if (content.per != null) {
    details += (toString(content.per)) + "あたり\n";
  }
  return details;
};

toString = function(item) {
  if (typeof item.value === 'number') {
    return "" + item.value + item.unit;
  } else if (typeof item.value === 'object' && (item.value.max != null) && (item.value.min != null)) {
    return item.value.min + "〜" + item.value.max + item.unit;
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
      resultDiv.appendChild(view.makeSpacer());
      for (i = 0, len = calorieData.length; i < len; i++) {
        d = calorieData[i];
        resultDiv.appendChild(view.makeHtml(d));
      }
      resultDiv.appendChild(view.makeSpacer());
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
      return element.name.indexOf(input.value) !== -1 || element.company.indexOf(input.value) !== -1;
    });
  }
  resultDiv.appendChild(view.makeSpacer());
  for (i = 0, len = list.length; i < len; i++) {
    d = list[i];
    resultDiv.appendChild(view.makeHtml(d));
  }
  return resultDiv.appendChild(view.makeSpacer());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9jb2ZmZWUvY2FsZW5kYXIuY29mZmVlIiwic3JjL2NvZmZlZS9jYWxvcmllLmNvZmZlZSIsInNyYy9jb2ZmZWUvY3JlYXRvci5jb2ZmZWUiLCJzcmMvY29mZmVlL2RhdGEuY29mZmVlIiwic3JjL2NvZmZlZS9pbmRleC5jb2ZmZWUiLCJzcmMvY29mZmVlL3ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFdBQVI7O0FBRVYsT0FBTyxDQUFDLE9BQVIsR0FBa0IsU0FBQyxPQUFEO0FBQ2hCLE1BQUE7RUFBQSxJQUFPLGVBQVA7QUFDRSxXQUFPLEdBRFQ7O0VBR0EsSUFBQSxHQUFPLE1BQUEsQ0FBTyxJQUFJLElBQUosQ0FBQSxDQUFQO0FBRVAsU0FBTyx1REFBQSxHQUNMLENBQUEsUUFBQSxHQUFRLENBQUMsT0FBQSxDQUFRLE9BQVIsQ0FBRCxDQUFSLENBREssR0FFTCxDQUFBLFdBQUEsR0FBVyxDQUFDLFVBQUEsQ0FBVyxPQUFYLENBQUQsQ0FBWCxDQUZLLEdBR0wsQ0FBQSxTQUFBLEdBQVUsSUFBVixHQUFlLEdBQWYsR0FBa0IsSUFBbEI7QUFUYzs7QUFXbEIsTUFBQSxHQUFTLFNBQUMsSUFBRDtBQUNQLFNBQU8sSUFBSSxDQUFDLGNBQUwsQ0FBQSxDQUFBLEdBQ0wsUUFBQSxDQUFTLElBQUksQ0FBQyxXQUFMLENBQUEsQ0FBQSxHQUFtQixDQUE1QixDQURLLEdBRUwsUUFBQSxDQUFTLElBQUksQ0FBQyxVQUFMLENBQUEsQ0FBVCxDQUZLLEdBR0wsR0FISyxHQUlMLFFBQUEsQ0FBUyxJQUFJLENBQUMsV0FBTCxDQUFBLENBQVQsQ0FKSyxHQUtMLFFBQUEsQ0FBUyxJQUFJLENBQUMsYUFBTCxDQUFBLENBQVQsQ0FMSyxHQU1MLFFBQUEsQ0FBUyxJQUFJLENBQUMsYUFBTCxDQUFBLENBQVQsQ0FOSyxHQU9MO0FBUks7O0FBVVQsUUFBQSxHQUFXLFNBQUMsR0FBRDtBQUNULFNBQU8sQ0FBQyxHQUFBLEdBQU0sR0FBUCxDQUFXLENBQUMsS0FBWixDQUFrQixDQUFDLENBQW5CO0FBREU7O0FBR1gsT0FBQSxHQUFVLFNBQUMsT0FBRDtBQUNSLFNBQU8sa0JBQUEsQ0FDRixPQUFPLENBQUMsSUFBVCxHQUFjLEdBQWQsR0FBZ0IsQ0FBQyxPQUFPLENBQUMsUUFBUixDQUFpQixPQUFPLENBQUMsTUFBekIsQ0FBRCxDQURiO0FBREM7O0FBS1YsVUFBQSxHQUFhLFNBQUMsT0FBRDtBQUNYLFNBQU8sa0JBQUEsQ0FBbUIsT0FBTyxDQUFDLFVBQVIsQ0FBbUIsT0FBbkIsRUFBNEIsS0FBNUIsQ0FBbkI7QUFESTs7QUFHYixVQUFBLEdBQWEsU0FBQyxPQUFEO0FBQ1gsTUFBQTtFQUFBLEdBQUEsR0FBTTtBQUNOLFNBQU8sa0JBQUEsQ0FBbUIsR0FBQSxHQUFNLE9BQU8sQ0FBQyxFQUFqQztBQUZJOzs7O0FDbENiLElBQUE7O0FBQUEsT0FBTyxDQUFDLGFBQVIsR0FBd0IsU0FBQyxNQUFEO0FBQ3RCLFNBQU8sTUFBQSxHQUFTLElBQVQsR0FBZ0I7QUFERDs7QUFHeEIsT0FBTyxDQUFDLGVBQVIsR0FBMEIsU0FBQyxJQUFEO0FBQ3hCLFNBQU8sSUFBQSxHQUFPLElBQVAsR0FBYztBQURHOztBQUcxQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFDLE9BQUQsRUFBVSxZQUFWLEVBQStCLFlBQS9CO0FBQ25CLE1BQUE7O0lBRDZCLGVBQWU7OztJQUFNLGVBQWU7O0VBQ2pFLE9BQUEsR0FBVTtFQUNWLElBQThDLHdCQUFBLElBQW9CLFlBQWxFO0lBQUEsT0FBQSxJQUFhLENBQUMsUUFBQSxDQUFTLE9BQU8sQ0FBQyxNQUFqQixDQUFELENBQUEsR0FBMEIsS0FBdkM7O0VBQ0EsSUFBcUQsdUJBQXJEO0lBQUEsT0FBQSxJQUFXLFFBQUEsR0FBUSxDQUFDLFFBQUEsQ0FBUyxPQUFPLENBQUMsT0FBakIsQ0FBRCxDQUFSLEdBQW1DLEtBQTlDOztFQUNBLElBQThDLG1CQUE5QztJQUFBLE9BQUEsSUFBVyxLQUFBLEdBQUssQ0FBQyxRQUFBLENBQVMsT0FBTyxDQUFDLEdBQWpCLENBQUQsQ0FBTCxHQUE0QixLQUF2Qzs7RUFDQSxJQUF5RCw0QkFBekQ7SUFBQSxPQUFBLElBQVcsT0FBQSxHQUFPLENBQUMsUUFBQSxDQUFTLE9BQU8sQ0FBQyxZQUFqQixDQUFELENBQVAsR0FBdUMsS0FBbEQ7O0VBQ0EsSUFBNkMsa0JBQTdDO0lBQUEsT0FBQSxJQUFXLEtBQUEsR0FBSyxDQUFDLFFBQUEsQ0FBUyxPQUFPLENBQUMsRUFBakIsQ0FBRCxDQUFMLEdBQTJCLEtBQXRDOztFQUNBLElBQWtELG9CQUFsRDtJQUFBLE9BQUEsSUFBVyxRQUFBLEdBQVEsQ0FBQyxRQUFBLENBQVMsT0FBTyxDQUFDLElBQWpCLENBQUQsQ0FBUixHQUFnQyxLQUEzQzs7RUFDQSxJQUE2QyxrQkFBN0M7SUFBQSxPQUFBLElBQVcsS0FBQSxHQUFLLENBQUMsUUFBQSxDQUFTLE9BQU8sQ0FBQyxFQUFqQixDQUFELENBQUwsR0FBMkIsS0FBdEM7O0VBQ0EsSUFBNkMsa0JBQTdDO0lBQUEsT0FBQSxJQUFXLEtBQUEsR0FBSyxDQUFDLFFBQUEsQ0FBUyxPQUFPLENBQUMsRUFBakIsQ0FBRCxDQUFMLEdBQTJCLEtBQXRDOztFQUNBLElBQTJDLGlCQUEzQztJQUFBLE9BQUEsSUFBVyxJQUFBLEdBQUksQ0FBQyxRQUFBLENBQVMsT0FBTyxDQUFDLENBQWpCLENBQUQsQ0FBSixHQUF5QixLQUFwQzs7RUFDQSxJQUFrRCx3QkFBQSxJQUFvQixZQUF0RTtJQUFBLE9BQUEsSUFBVyxNQUFBLEdBQU0sQ0FBQyxRQUFBLENBQVMsT0FBTyxDQUFDLE1BQWpCLENBQUQsQ0FBTixHQUFnQyxLQUEzQzs7RUFDQSxJQUE4QyxtQkFBOUM7SUFBQSxPQUFBLElBQWEsQ0FBQyxRQUFBLENBQVMsT0FBTyxDQUFDLEdBQWpCLENBQUQsQ0FBQSxHQUF1QixRQUFwQzs7QUFDQSxTQUFPO0FBYlk7O0FBZXJCLFFBQUEsR0FBVyxTQUFDLElBQUQ7RUFDVCxJQUFHLE9BQU8sSUFBSSxDQUFDLEtBQVosS0FBcUIsUUFBeEI7QUFDRSxXQUFPLEVBQUEsR0FBRyxJQUFJLENBQUMsS0FBUixHQUFnQixJQUFJLENBQUMsS0FEOUI7R0FBQSxNQUVLLElBQUcsT0FBTyxJQUFJLENBQUMsS0FBWixLQUFxQixRQUFyQixJQUFrQyx3QkFBbEMsSUFBc0Qsd0JBQXpEO0FBQ0gsV0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQVosR0FBZ0IsR0FBaEIsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUE5QixHQUFvQyxJQUFJLENBQUMsS0FEL0M7O0FBRUwsU0FBTztBQUxFOztBQU9YLE9BQU8sQ0FBQyxRQUFSLEdBQW1COzs7O0FDNUJuQixJQUFBOztBQUFBLEtBQUEsR0FBUTtFQUNOO0lBQUUsTUFBQSxFQUFRLElBQVY7SUFBZ0IsSUFBQSxFQUFNLElBQXRCO0lBQTRCLFFBQUEsRUFBVSxLQUF0QztJQUE2QyxTQUFBLEVBQVcsSUFBeEQ7SUFBOEQsT0FBQSxFQUFTLEtBQXZFO0dBRE0sRUFFTjtJQUFFLE1BQUEsRUFBUSxNQUFWO0lBQWtCLElBQUEsRUFBTSxLQUF4QjtJQUErQixRQUFBLEVBQVUsSUFBekM7SUFBK0MsU0FBQSxFQUFXLElBQTFEO0lBQWdFLE9BQUEsRUFBUyxLQUF6RTtHQUZNLEVBR047SUFBRSxNQUFBLEVBQVEsU0FBVjtJQUFxQixJQUFBLEVBQU0sS0FBM0I7SUFBa0MsUUFBQSxFQUFVLElBQTVDO0lBQWtELFNBQUEsRUFBVyxJQUE3RDtJQUFtRSxPQUFBLEVBQVMsS0FBNUU7R0FITSxFQUlOO0lBQUUsTUFBQSxFQUFRLFFBQVY7SUFBb0IsSUFBQSxFQUFNLE1BQTFCO0lBQWtDLFFBQUEsRUFBVSxJQUE1QztJQUFrRCxTQUFBLEVBQVcsSUFBN0Q7SUFBbUUsT0FBQSxFQUFTLElBQTVFO0dBSk0sRUFLTjtJQUFFLE1BQUEsRUFBUSxTQUFWO0lBQXFCLElBQUEsRUFBTSxPQUEzQjtJQUFvQyxRQUFBLEVBQVUsSUFBOUM7SUFBb0QsU0FBQSxFQUFXLElBQS9EO0lBQXFFLE9BQUEsRUFBUyxJQUE5RTtHQUxNLEVBTU47SUFBRSxNQUFBLEVBQVEsS0FBVjtJQUFpQixJQUFBLEVBQU0sSUFBdkI7SUFBNkIsUUFBQSxFQUFVLElBQXZDO0lBQTZDLFNBQUEsRUFBVyxJQUF4RDtJQUE4RCxPQUFBLEVBQVMsSUFBdkU7R0FOTSxFQU9OO0lBQUUsTUFBQSxFQUFRLGNBQVY7SUFBMEIsSUFBQSxFQUFNLE1BQWhDO0lBQXdDLFFBQUEsRUFBVSxJQUFsRDtJQUF3RCxTQUFBLEVBQVcsSUFBbkU7SUFBeUUsT0FBQSxFQUFTLElBQWxGO0dBUE0sRUFRTjtJQUFFLE1BQUEsRUFBUSxJQUFWO0lBQWdCLElBQUEsRUFBTSxPQUF0QjtJQUErQixRQUFBLEVBQVUsSUFBekM7SUFBK0MsU0FBQSxFQUFXLENBQUMsSUFBRCxFQUFPLEdBQVAsQ0FBMUQ7SUFBdUUsT0FBQSxFQUFTLElBQWhGO0dBUk0sRUFTTjtJQUFFLE1BQUEsRUFBUSxNQUFWO0lBQWtCLElBQUEsRUFBTSxPQUF4QjtJQUFpQyxRQUFBLEVBQVUsSUFBM0M7SUFBaUQsU0FBQSxFQUFXLElBQTVEO0lBQWtFLE9BQUEsRUFBUyxJQUEzRTtHQVRNLEVBVU47SUFBRSxNQUFBLEVBQVEsUUFBVjtJQUFvQixJQUFBLEVBQU0sS0FBMUI7SUFBaUMsUUFBQSxFQUFVLElBQTNDO0lBQWlELFNBQUEsRUFBVyxJQUE1RDtJQUFrRSxPQUFBLEVBQVMsSUFBM0U7R0FWTSxFQVdOO0lBQUUsTUFBQSxFQUFRLEtBQVY7SUFBaUIsSUFBQSxFQUFNLE9BQXZCO0lBQWdDLFFBQUEsRUFBVSxJQUExQztJQUFnRCxTQUFBLEVBQVcsSUFBM0Q7SUFBaUUsT0FBQSxFQUFTLElBQTFFO0dBWE0sRUFZTjtJQUFFLE1BQUEsRUFBUSxJQUFWO0lBQWdCLElBQUEsRUFBTSxPQUF0QjtJQUErQixRQUFBLEVBQVUsSUFBekM7SUFBK0MsU0FBQSxFQUFXLElBQTFEO0lBQWdFLE9BQUEsRUFBUyxJQUF6RTtHQVpNLEVBYU47SUFBRSxNQUFBLEVBQVEsSUFBVjtJQUFnQixJQUFBLEVBQU0sUUFBdEI7SUFBZ0MsUUFBQSxFQUFVLElBQTFDO0lBQWdELFNBQUEsRUFBVyxJQUEzRDtJQUFpRSxPQUFBLEVBQVMsSUFBMUU7R0FiTSxFQWNOO0lBQUUsTUFBQSxFQUFRLEdBQVY7SUFBZSxJQUFBLEVBQU0sTUFBckI7SUFBNkIsUUFBQSxFQUFVLElBQXZDO0lBQTZDLFNBQUEsRUFBVyxJQUF4RDtJQUE4RCxPQUFBLEVBQVMsSUFBdkU7R0FkTTs7O0FBaUJSLFFBQUEsR0FBVyxTQUFDLElBQUQ7U0FDVCxJQUFJLENBQUMsU0FBTCxDQUFlLElBQWY7QUFEUzs7QUFHWCxPQUFPLENBQUMsUUFBUixHQUFtQixTQUFBO0FBQ2pCLE1BQUE7RUFBQSxRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsaUJBQXhCO0FBRVgsT0FBQSx1Q0FBQTs7SUFDRSxRQUFRLENBQUMsV0FBVCxDQUFxQixRQUFBLENBQ25CLElBQUksQ0FBQyxNQURjLEVBQ04sSUFBSSxDQUFDLElBREMsRUFDSyxJQUFJLENBQUMsUUFEVixFQUNvQixJQUFJLENBQUMsU0FEekIsQ0FBckI7QUFERjtFQUtBLFFBQVEsQ0FBQyxXQUFULENBQXFCLG9CQUFBLENBQUEsQ0FBckI7QUFDQSxTQUFPO0FBVFU7O0FBV25CLFVBQUEsR0FBYSxTQUFBO0FBQ1gsTUFBQTtFQUFBLE1BQUEsR0FBUyxRQUFRLENBQUMsY0FBVCxDQUF3QixlQUF4QjtFQUVULEdBQUEsR0FBTTtBQUVOLE9BQUEsdUNBQUE7O0lBQ0UsSUFBQSxDQUFPLElBQUksQ0FBQyxRQUFaO0FBQ0UsZUFERjs7SUFFQSxLQUFBLEdBQVEsUUFBUSxDQUFDLGNBQVQsQ0FBMkIsSUFBSSxDQUFDLE1BQU4sR0FBYSxRQUF2QztJQUNSLElBQUcscUJBQUEsSUFBaUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFaLEdBQXFCLENBQXpDO01BQ0UsSUFBRyxJQUFJLENBQUMsT0FBUjtRQUNFLEdBQUksQ0FBQSxJQUFJLENBQUMsTUFBTCxDQUFKLEdBQW1CO1FBQ25CLEdBQUksQ0FBQSxJQUFJLENBQUMsTUFBTCxDQUFhLENBQUEsT0FBQSxDQUFqQixHQUE0QixRQUFBLENBQVMsS0FBSyxDQUFDLEtBQWYsRUFGOUI7T0FBQSxNQUFBO1FBSUUsR0FBSSxDQUFBLElBQUksQ0FBQyxNQUFMLENBQUosR0FBbUIsS0FBSyxDQUFDLE1BSjNCO09BREY7O0FBSkY7U0FXQSxNQUFNLENBQUMsU0FBUCxHQUFtQixRQUFBLENBQVMsR0FBVDtBQWhCUjs7QUFrQmIsb0JBQUEsR0FBdUIsU0FBQTtBQUNyQixNQUFBO0VBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxJQUFSLEVBQWMsVUFBZDtFQUNQLElBQUksQ0FBQyxXQUFMLENBQWlCLFVBQUEsQ0FBQSxDQUFqQjtFQUNBLEdBQUEsR0FBTSxnQkFBQSxDQUFBO0VBQ04sR0FBRyxDQUFDLGdCQUFKLENBQXFCLE9BQXJCLEVBQThCLFVBQTlCO0VBQ0EsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsR0FBakI7RUFDQSxJQUFJLENBQUMsV0FBTCxDQUFpQixVQUFBLENBQUEsQ0FBakI7QUFDQSxTQUFPO0FBUGM7O0FBU3ZCLGdCQUFBLEdBQW1CLFNBQUE7QUFDakIsU0FBTyxVQUFBLENBQ0wsZUFESyxFQUVMLHFGQUZLLEVBR0wsSUFISztBQURVOztBQU9uQixVQUFBLEdBQWEsU0FBQyxFQUFELEVBQUssU0FBTCxFQUFnQixJQUFoQjtBQUNYLE1BQUE7RUFBQSxNQUFBLEdBQVMsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkI7RUFDVCxJQUFrQixVQUFsQjtJQUFBLE1BQU0sQ0FBQyxFQUFQLEdBQVksR0FBWjs7RUFDQSxJQUFnQyxpQkFBaEM7SUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixVQUFuQjs7RUFDQSxNQUFNLENBQUMsU0FBUCxHQUFtQjtBQUNuQixTQUFPO0FBTEk7O0FBT2IsUUFBQSxHQUFXLFNBQUMsUUFBRCxFQUFXLElBQVgsRUFBaUIsUUFBakIsRUFBa0MsU0FBbEM7QUFDVCxNQUFBOztJQUQwQixXQUFXOztFQUNyQyxJQUFBLEdBQU8sT0FBQSxDQUFRLElBQVIsRUFBYyxVQUFkO0VBQ1AsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsVUFBQSxDQUFBLENBQWpCO0VBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxJQUFSLEVBQWMsMEJBQWQ7RUFDUCxJQUFJLENBQUMsV0FBTCxDQUFpQixJQUFqQjtFQUVBLFNBQUEsR0FBWSxPQUFBLENBQVEsSUFBUixFQUFjLGdDQUFkO0VBQ1osSUFBSSxDQUFDLFdBQUwsQ0FBaUIsU0FBakI7RUFFQSxJQUFHLFFBQUg7SUFDRSxLQUFBLEdBQVEsU0FBQSxDQUFhLFFBQUQsR0FBVSxRQUF0QixFQUErQixzQkFBL0IsRUFBdUQsTUFBdkQ7SUFDUixLQUFLLENBQUMsT0FBTixHQUFnQjtJQUNoQixTQUFTLENBQUMsV0FBVixDQUFzQixLQUF0QixFQUhGOztFQUtBLEtBQUEsR0FBUSxTQUFBLENBQVUsSUFBVixFQUFnQixzQkFBaEIsRUFBMkMsUUFBRCxHQUFVLFFBQXBELEVBQTZELElBQTdEO0VBQ1IsU0FBUyxDQUFDLFdBQVYsQ0FBc0IsS0FBdEI7RUFFQSxJQUFHLGlCQUFIO0lBQ0UsU0FBQSxHQUFZLE9BQUEsQ0FBUSxJQUFSLEVBQWMsMEJBQWQ7SUFDWixJQUFJLENBQUMsV0FBTCxDQUFpQixTQUFqQixFQUZGO0dBQUEsTUFBQTtJQUlFLElBQUksQ0FBQyxXQUFMLENBQWlCLE9BQUEsQ0FBUSxJQUFSLEVBQWMsMEJBQWQsQ0FBakIsRUFKRjs7RUFNQSxJQUFJLENBQUMsV0FBTCxDQUFpQixVQUFBLENBQUEsQ0FBakI7QUFFQSxTQUFPO0FBMUJFOztBQTRCWCxPQUFBLEdBQVUsU0FBQyxFQUFELEVBQUssU0FBTDtBQUNSLE1BQUE7RUFBQSxHQUFBLEdBQU0sUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkI7RUFDTixJQUFlLFVBQWY7SUFBQSxHQUFHLENBQUMsRUFBSixHQUFTLEdBQVQ7O0VBQ0EsSUFBNkIsaUJBQTdCO0lBQUEsR0FBRyxDQUFDLFNBQUosR0FBZ0IsVUFBaEI7O0FBQ0EsU0FBTztBQUpDOztBQU1WLFNBQUEsR0FBWSxTQUFDLEVBQUQsRUFBSyxTQUFMLEVBQWdCLE9BQWhCLEVBQXlCLElBQXpCLEVBQStCLEtBQS9CO0FBQ1YsTUFBQTtFQUFBLEtBQUEsR0FBUSxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QjtFQUNSLElBQWlCLFVBQWpCO0lBQUEsS0FBSyxDQUFDLEVBQU4sR0FBVyxHQUFYOztFQUNBLElBQStCLGlCQUEvQjtJQUFBLEtBQUssQ0FBQyxTQUFOLEdBQWtCLFVBQWxCOztFQUNBLElBQTJCLGVBQTNCO0lBQUEsS0FBSyxDQUFDLE9BQU4sR0FBZ0IsUUFBaEI7O0VBQ0EsSUFBNEIsWUFBNUI7SUFBQSxLQUFLLENBQUMsV0FBTixHQUFvQixLQUFwQjs7RUFDQSxJQUF1QixhQUF2QjtJQUFBLEtBQUssQ0FBQyxLQUFOLEdBQWMsTUFBZDs7QUFDQSxTQUFPO0FBUEc7O0FBU1osU0FBQSxHQUFZLFNBQUMsRUFBRCxFQUFLLFNBQUwsRUFBZ0IsSUFBaEI7QUFDVixNQUFBO0VBQUEsS0FBQSxHQUFRLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCO0VBQ1IsSUFBaUIsVUFBakI7SUFBQSxLQUFLLENBQUMsRUFBTixHQUFXLEdBQVg7O0VBQ0EsSUFBK0IsaUJBQS9CO0lBQUEsS0FBSyxDQUFDLFNBQU4sR0FBa0IsVUFBbEI7O0VBQ0EsSUFBcUIsWUFBckI7SUFBQSxLQUFLLENBQUMsSUFBTixHQUFhLEtBQWI7O0FBQ0EsU0FBTztBQUxHOztBQU9aLFVBQUEsR0FBYSxTQUFBO0FBQ1gsU0FBTyxPQUFBLENBQVEsSUFBUixFQUFjLG1CQUFkO0FBREk7Ozs7QUMxSGIsSUFBQTs7QUFBQSxXQUFBLEdBQWMsU0FBQyxRQUFEO0FBQ1osTUFBQTtFQUFBLEdBQUEsR0FBTSxJQUFJLGNBQUosQ0FBQTtFQUNOLEdBQUcsQ0FBQyxJQUFKLENBQVMsS0FBVCxFQUFnQix5Q0FBaEIsRUFBMkQsSUFBM0Q7RUFDQSxHQUFHLENBQUMsTUFBSixHQUFhO0VBQ2IsR0FBRyxDQUFDLElBQUosQ0FBQTtBQUpZOztBQU9kLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLFNBQUMsUUFBRDtFQUNoQixXQUFBLENBQVksU0FBQTtBQUNWLFFBQUE7SUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFJLENBQUMsWUFBaEI7V0FDUCxRQUFBLENBQVMsSUFBSSxDQUFDLFNBQWQ7RUFGVSxDQUFaO0FBRGdCOzs7O0FDUGxCLElBQUE7O0FBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxRQUFSOztBQUNQLElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUjs7QUFDUCxPQUFBLEdBQVUsT0FBQSxDQUFRLFdBQVI7O0FBRVYsV0FBQSxHQUFjOztBQUVkLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLFNBQUE7QUFDZCxNQUFBO0VBQUEsU0FBQSxHQUFZLFFBQVEsQ0FBQyxjQUFULENBQXdCLFFBQXhCO0VBQ1osSUFBRyxpQkFBSDtJQUNFLElBQUksQ0FBQyxPQUFMLENBQWEsU0FBQyxJQUFEO0FBQ1gsVUFBQTtNQUFBLFdBQUEsR0FBYztNQUNkLFNBQVMsQ0FBQyxXQUFWLENBQXNCLElBQUksQ0FBQyxVQUFMLENBQUEsQ0FBdEI7QUFDQSxXQUFBLDZDQUFBOztRQUNFLFNBQVMsQ0FBQyxXQUFWLENBQXNCLElBQUksQ0FBQyxRQUFMLENBQWMsQ0FBZCxDQUF0QjtBQURGO01BRUEsU0FBUyxDQUFDLFdBQVYsQ0FBc0IsSUFBSSxDQUFDLFVBQUwsQ0FBQSxDQUF0QjtJQUxXLENBQWIsRUFERjs7RUFTQSxLQUFBLEdBQVEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEI7RUFDUixJQUE4RCxhQUE5RDtJQUFBLEtBQUssQ0FBQyxnQkFBTixDQUF1QixRQUF2QixFQUFpQyx5QkFBakMsRUFBQTs7RUFFQSxNQUFBLEdBQVMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsaUJBQXhCO0VBQ1QsSUFBc0IsY0FBdEI7SUFBQSxPQUFPLENBQUMsUUFBUixDQUFBLEVBQUE7O0VBRUEsSUFBSSxTQUFKLENBQWMsWUFBZDtBQWpCYzs7QUFxQmhCLHlCQUFBLEdBQTRCLFNBQUE7QUFDMUIsTUFBQTtFQUFBLFNBQUEsR0FBWSxRQUFRLENBQUMsY0FBVCxDQUF3QixRQUF4QjtFQUNaLEtBQUEsR0FBUSxRQUFRLENBQUMsY0FBVCxDQUF3QixjQUF4QjtFQUNSLElBQUEsQ0FBQSxDQUFPLG1CQUFBLElBQWUsZUFBdEIsQ0FBQTtBQUNFLFdBREY7O0FBRUEsU0FBTSxTQUFTLENBQUMsVUFBaEI7SUFDRSxTQUFTLENBQUMsV0FBVixDQUFzQixTQUFTLENBQUMsVUFBaEM7RUFERjtFQUdBLElBQUEsR0FBTztFQUNQLElBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFaLEdBQXFCLENBQXhCO0lBQ0UsSUFBQSxHQUFPLFdBQVcsQ0FBQyxNQUFaLENBQW1CLFNBQUMsT0FBRCxFQUFVLEtBQVYsRUFBaUIsS0FBakI7QUFDeEIsYUFBTyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQWIsQ0FBcUIsS0FBSyxDQUFDLEtBQTNCLENBQUEsS0FBdUMsQ0FBQyxDQUF4QyxJQUNMLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBaEIsQ0FBd0IsS0FBSyxDQUFDLEtBQTlCLENBQUEsS0FBMEMsQ0FBQztJQUZyQixDQUFuQixFQURUOztFQUtBLFNBQVMsQ0FBQyxXQUFWLENBQXNCLElBQUksQ0FBQyxVQUFMLENBQUEsQ0FBdEI7QUFFQSxPQUFBLHNDQUFBOztJQUNFLFNBQVMsQ0FBQyxXQUFWLENBQXNCLElBQUksQ0FBQyxRQUFMLENBQWMsQ0FBZCxDQUF0QjtBQURGO1NBRUEsU0FBUyxDQUFDLFdBQVYsQ0FBc0IsSUFBSSxDQUFDLFVBQUwsQ0FBQSxDQUF0QjtBQWxCMEI7Ozs7QUMzQjVCLElBQUE7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxZQUFSOztBQUNYLE9BQUEsR0FBVSxPQUFBLENBQVEsV0FBUjs7QUFFVixPQUFPLENBQUMsUUFBUixHQUFtQixTQUFDLE9BQUQ7QUFDakIsTUFBQTtFQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsT0FBTyxDQUFDLEVBQWhCLEVBQW9CLHFDQUFwQjtFQUVWLFFBQUEsR0FBVyxPQUFBLENBQVEsSUFBUixFQUFjLGtDQUFkO0VBQ1gsSUFBaUQsdUJBQWpEO0lBQUEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsUUFBQSxDQUFTLE9BQU8sQ0FBQyxPQUFqQixDQUFyQixFQUFBOztFQUNBLEtBQUEsR0FBUSxFQUFBLEdBQUcsT0FBTyxDQUFDO0VBQ25CLElBQWtELHNCQUFsRDtJQUFBLEtBQUEsSUFBUyxFQUFBLEdBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUixDQUFpQixPQUFPLENBQUMsTUFBekIsQ0FBRCxFQUFYOztFQUNBLFFBQVEsQ0FBQyxXQUFULENBQXFCLE1BQUEsQ0FBTyxLQUFQLENBQXJCO0VBQ0EsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsUUFBcEI7RUFFQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSxJQUFSLEVBQWMsMkJBQWQ7RUFDakIsY0FBYyxDQUFDLFNBQWYsR0FBMkIsYUFBQSxDQUFjLE9BQWQ7RUFDM0IsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsY0FBcEI7RUFFQSxTQUFBLEdBQVksT0FBQSxDQUFRLElBQVIsRUFBYyxvQ0FBZDtFQUNaLFNBQVMsQ0FBQyxXQUFWLENBQXNCLEtBQUEsQ0FDcEIsbUVBRG9CLEVBRXBCLGlCQUZvQixFQUdwQixRQUFRLENBQUMsT0FBVCxDQUFpQixPQUFqQixDQUhvQixDQUF0QjtFQUtBLFNBQVMsQ0FBQyxXQUFWLENBQXNCLFVBQUEsQ0FBQSxDQUF0QjtFQUNBLFNBQVMsQ0FBQyxXQUFWLENBQXNCLEtBQUEsQ0FBTSxnQkFBTixFQUF3QixPQUF4QixDQUF0QjtFQUNBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLFNBQXBCO0FBRUEsU0FBTztBQXhCVTs7QUEwQm5CLFVBQUEsR0FBYSxTQUFBO0FBQ1gsU0FBTyxPQUFBLENBQVEsSUFBUixFQUFjLG1CQUFkO0FBREk7O0FBR2IsT0FBTyxDQUFDLFVBQVIsR0FBcUI7O0FBRXJCLE9BQUEsR0FBVSxTQUFDLEVBQUQsRUFBSyxTQUFMO0FBQ1IsTUFBQTtFQUFBLENBQUEsR0FBSSxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QjtFQUNKLElBQWEsVUFBYjtJQUFBLENBQUMsQ0FBQyxFQUFGLEdBQU8sR0FBUDs7RUFDQSxJQUEyQixpQkFBM0I7SUFBQSxDQUFDLENBQUMsU0FBRixHQUFjLFVBQWQ7O0FBQ0EsU0FBTztBQUpDOztBQU1WLE1BQUEsR0FBUyxTQUFDLElBQUQ7QUFDUCxNQUFBO0VBQUEsRUFBQSxHQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCO0VBQ0wsSUFBdUIsWUFBdkI7SUFBQSxFQUFFLENBQUMsU0FBSCxHQUFlLEtBQWY7O0FBQ0EsU0FBTztBQUhBOztBQUtULEtBQUEsR0FBUSxTQUFDLFNBQUQsRUFBWSxJQUFaLEVBQWtCLElBQWxCO0FBQ04sTUFBQTtFQUFBLENBQUEsR0FBSSxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QjtFQUNKLElBQTJCLGlCQUEzQjtJQUFBLENBQUMsQ0FBQyxTQUFGLEdBQWMsVUFBZDs7RUFDQSxJQUFzQixZQUF0QjtJQUFBLENBQUMsQ0FBQyxTQUFGLEdBQWMsS0FBZDs7RUFDQSxJQUFpQixZQUFqQjtJQUFBLENBQUMsQ0FBQyxJQUFGLEdBQVMsS0FBVDs7RUFDQSxDQUFDLENBQUMsTUFBRixHQUFXO0FBQ1gsU0FBTztBQU5EOztBQVFSLEtBQUEsR0FBUSxTQUFDLFNBQUQsRUFBWSxJQUFaO0FBQ04sTUFBQTtFQUFBLENBQUEsR0FBSSxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QjtFQUNKLElBQTJCLGlCQUEzQjtJQUFBLENBQUMsQ0FBQyxTQUFGLEdBQWMsVUFBZDs7RUFDQSxJQUFzQixZQUF0QjtJQUFBLENBQUMsQ0FBQyxTQUFGLEdBQWMsS0FBZDs7QUFDQSxTQUFPO0FBSkQ7O0FBTVIsUUFBQSxHQUFXLFNBQUMsSUFBRDtBQUNULE1BQUE7RUFBQSxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCO0VBQ2pCLGNBQWMsQ0FBQyxTQUFmLEdBQ0U7RUFDRixjQUFjLENBQUMsU0FBZixHQUEyQixJQUFJLENBQUMsTUFBTCxDQUFZLENBQVosRUFBZSxDQUFmO0FBQzNCLFNBQU87QUFMRTs7QUFPWCxhQUFBLEdBQWdCLFNBQUMsT0FBRDtBQUNkLFNBQU8sT0FBTyxDQUFDLFVBQVIsQ0FBbUIsT0FBbkIsRUFBNEIsSUFBNUIsRUFBa0MsS0FBbEM7QUFETyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjYWxvcmllID0gcmVxdWlyZSgnLi9jYWxvcmllJylcblxuZXhwb3J0cy5tYWtlVXJsID0gKGNvbnRlbnQpIC0+XG4gIHVubGVzcyBjb250ZW50P1xuICAgIHJldHVybiBcIlwiXG5cbiAgZGF0ZSA9IGdldFVUQyhuZXcgRGF0ZSgpKVxuXG4gIHJldHVybiBcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vY2FsZW5kYXIvZXZlbnQ/YWN0aW9uPVRFTVBMQVRFXCIgK1xuICAgIFwiJnRleHQ9I3tnZXRUZXh0KGNvbnRlbnQpfVwiICtcbiAgICBcIiZkZXRhaWxzPSN7Z2V0RGV0YWlscyhjb250ZW50KX1cIiArXG4gICAgXCImZGF0ZXM9I3tkYXRlfS8je2RhdGV9XCJcblxuZ2V0VVRDID0gKGRhdGUpIC0+XG4gIHJldHVybiBkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgK1xuICAgIHplcm9maWxsKGRhdGUuZ2V0VVRDTW9udGgoKSsxKSArXG4gICAgemVyb2ZpbGwoZGF0ZS5nZXRVVENEYXRlKCkpICtcbiAgICAnVCcgK1xuICAgIHplcm9maWxsKGRhdGUuZ2V0VVRDSG91cnMoKSkgK1xuICAgIHplcm9maWxsKGRhdGUuZ2V0VVRDTWludXRlcygpKSArXG4gICAgemVyb2ZpbGwoZGF0ZS5nZXRVVENTZWNvbmRzKCkpICtcbiAgICAnWidcblxuemVyb2ZpbGwgPSAobnVtKSAtPlxuICByZXR1cm4gKCcwJyArIG51bSkuc2xpY2UoLTIpXG5cbmdldFRleHQgPSAoY29udGVudCkgLT5cbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChcbiAgICBcIiN7Y29udGVudC5uYW1lfSAje2NhbG9yaWUudG9TdHJpbmcoY29udGVudC5lbmVyZ3kpfVwiXG4gIClcblxuZ2V0RGV0YWlscyA9IChjb250ZW50KSAtPlxuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50IGNhbG9yaWUuZ2V0RGV0YWlscyBjb250ZW50LCBmYWxzZVxuXG5nZXREYXRhVXJsID0gKGNvbnRlbnQpIC0+XG4gIHVybCA9ICdodHRwczovL3RhbmpvaW4uZ2l0aHViLmlvL2NhbG9yaWUtbWVtbz9pZD0nXG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodXJsICsgY29udGVudC5pZClcbiIsImV4cG9ydHMuY29udmVydFRvU2FsdCA9IChzb2RpdW0pIC0+XG4gIHJldHVybiBzb2RpdW0gKiAyLjU0IC8gMTAwMFxuXG5leHBvcnRzLmNvbnZlcnRUb1NvZGl1bSA9IChzYWx0KSAtPlxuICByZXR1cm4gc2FsdCAvIDIuNTQgKiAxMDAwXG5cbmV4cG9ydHMuZ2V0RGV0YWlscyA9IChjb250ZW50LCBpc1Nob3dFbmVyZ3kgPSB0cnVlLCBpc1Nob3dWb2x1bWUgPSB0cnVlKSAtPlxuICBkZXRhaWxzID0gXCJcIlxuICBkZXRhaWxzICs9IFwiI3t0b1N0cmluZyhjb250ZW50LmVuZXJneSl9XFxuXCIgaWYgY29udGVudC5lbmVyZ3k/IGFuZCBpc1Nob3dFbmVyZ3lcbiAgZGV0YWlscyArPSBcIuOBn+OCk+OBseOBj+izqiAje3RvU3RyaW5nKGNvbnRlbnQucHJvdGVpbil9XFxuXCIgaWYgY29udGVudC5wcm90ZWluP1xuICBkZXRhaWxzICs9IFwi6ISC6LOqICN7dG9TdHJpbmcoY29udGVudC5mYXQpfVxcblwiIGlmIGNvbnRlbnQuZmF0P1xuICBkZXRhaWxzICs9IFwi54Kt5rC05YyW54mpICN7dG9TdHJpbmcoY29udGVudC5jYXJib2h5ZHJhdGUpfVxcblwiIGlmIGNvbnRlbnQuY2FyYm9oeWRyYXRlP1xuICBkZXRhaWxzICs9IFwiTmEgI3t0b1N0cmluZyhjb250ZW50Lm5hKX1cXG5cIiBpZiBjb250ZW50Lm5hP1xuICBkZXRhaWxzICs9IFwi6aOf5aGp55u45b2T6YePICN7dG9TdHJpbmcoY29udGVudC5zYWx0KX1cXG5cIiBpZiBjb250ZW50LnNhbHQ/XG4gIGRldGFpbHMgKz0gXCJDYSAje3RvU3RyaW5nKGNvbnRlbnQuY2EpfVxcblwiIGlmIGNvbnRlbnQuY2E/XG4gIGRldGFpbHMgKz0gXCJNZyAje3RvU3RyaW5nKGNvbnRlbnQubWcpfVxcblwiIGlmIGNvbnRlbnQubWc/XG4gIGRldGFpbHMgKz0gXCJLICN7dG9TdHJpbmcoY29udGVudC5rKX1cXG5cIiBpZiBjb250ZW50Lms/XG4gIGRldGFpbHMgKz0gXCLlhoXlrrnph48gI3t0b1N0cmluZyhjb250ZW50LnZvbHVtZSl9XFxuXCIgaWYgY29udGVudC52b2x1bWU/IGFuZCBpc1Nob3dWb2x1bWVcbiAgZGV0YWlscyArPSBcIiN7dG9TdHJpbmcoY29udGVudC5wZXIpfeOBguOBn+OCilxcblwiIGlmIGNvbnRlbnQucGVyP1xuICByZXR1cm4gZGV0YWlsc1xuXG50b1N0cmluZyA9IChpdGVtKSAtPlxuICBpZiB0eXBlb2YgaXRlbS52YWx1ZSBpcyAnbnVtYmVyJ1xuICAgIHJldHVybiBcIiN7aXRlbS52YWx1ZX0je2l0ZW0udW5pdH1cIlxuICBlbHNlIGlmIHR5cGVvZiBpdGVtLnZhbHVlIGlzICdvYmplY3QnIGFuZCBpdGVtLnZhbHVlLm1heD8gYW5kIGl0ZW0udmFsdWUubWluP1xuICAgIHJldHVybiBcIiN7aXRlbS52YWx1ZS5taW5944CcI3tpdGVtLnZhbHVlLm1heH0je2l0ZW0udW5pdH1cIlxuICByZXR1cm4gXCJcIlxuXG5leHBvcnRzLnRvU3RyaW5nID0gdG9TdHJpbmdcbiIsImdyaWRzID0gW1xuICB7IHByZWZpeDogXCJpZFwiLCB0ZXh0OiBcIklEXCIsIGhhc0lucHV0OiBmYWxzZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiBmYWxzZSB9LFxuICB7IHByZWZpeDogXCJuYW1lXCIsIHRleHQ6IFwi5ZWG5ZOB5ZCNXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IGZhbHNlIH0sXG4gIHsgcHJlZml4OiBcImNvbXBhbnlcIiwgdGV4dDogXCLkvJrnpL7lkI1cIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogZmFsc2UgfSxcbiAgeyBwcmVmaXg6IFwiZW5lcmd5XCIsIHRleHQ6IFwi44Kr44Ot44Oq44O8XCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwicHJvdGVpblwiLCB0ZXh0OiBcIuOBn+OCk+OBseOBj+izqlwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiB0cnVlIH0sXG4gIHsgcHJlZml4OiBcImZhdFwiLCB0ZXh0OiBcIuiEguizqlwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiB0cnVlIH0sXG4gIHsgcHJlZml4OiBcImNhcmJvaHlkcmF0ZVwiLCB0ZXh0OiBcIueCreawtOWMlueJqVwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiB0cnVlIH0sXG4gIHsgcHJlZml4OiBcIm5hXCIsIHRleHQ6IFwi44OK44OI44Oq44Km44OgXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IFtcIm1nXCIsIFwiZ1wiXSwgaXNWYWx1ZTogdHJ1ZSB9LFxuICB7IHByZWZpeDogXCJzYWx0XCIsIHRleHQ6IFwi6aOf5aGp55u45b2T6YePXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwidm9sdW1lXCIsIHRleHQ6IFwi5YaF5a656YePXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwicGVyXCIsIHRleHQ6IFwi4peL4peL44GC44Gf44KKXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwiY2FcIiwgdGV4dDogXCLjgqvjg6vjgrfjgqbjg6BcIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogdHJ1ZSB9LFxuICB7IHByZWZpeDogXCJtZ1wiLCB0ZXh0OiBcIuODnuOCsOODjeOCt+OCpuODoFwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiB0cnVlIH0sXG4gIHsgcHJlZml4OiBcImtcIiwgdGV4dDogXCLjgqvjg6rjgqbjg6BcIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogdHJ1ZSB9XG5dXG5cbm1ha2VKc29uID0gKGRhdGEpIC0+XG4gIEpTT04uc3RyaW5naWZ5IGRhdGFcblxuZXhwb3J0cy5pbml0VmlldyA9IC0+XG4gIGNvbnRlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ2NvbnRlbnRzLWNyZWF0ZSdcblxuICBmb3IgZ3JpZCBpbiBncmlkc1xuICAgIGNvbnRlbnRzLmFwcGVuZENoaWxkIG1ha2VHcmlkKFxuICAgICAgZ3JpZC5wcmVmaXgsIGdyaWQudGV4dCwgZ3JpZC5oYXNJbnB1dCwgZ3JpZC5yYWRpb2J0bnNcbiAgICApXG5cbiAgY29udGVudHMuYXBwZW5kQ2hpbGQgbWFrZUNyZWF0ZUJ1dHRvbkdyaWQoKVxuICByZXR1cm4gY29udGVudHNcblxuc2hvd1Jlc3VsdCA9IC0+XG4gIHJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdyZXN1bHQtY3JlYXRlJ1xuXG4gIG9iaiA9IHt9XG5cbiAgZm9yIGdyaWQgaW4gZ3JpZHNcbiAgICB1bmxlc3MgZ3JpZC5oYXNJbnB1dFxuICAgICAgY29udGludWVcbiAgICBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIFwiI3tncmlkLnByZWZpeH0taW5wdXRcIlxuICAgIGlmIGlucHV0LnZhbHVlPyBhbmQgaW5wdXQudmFsdWUubGVuZ3RoID4gMFxuICAgICAgaWYgZ3JpZC5pc1ZhbHVlXG4gICAgICAgIG9ialtncmlkLnByZWZpeF0gPSB7fVxuICAgICAgICBvYmpbZ3JpZC5wcmVmaXhdW1widmFsdWVcIl0gPSBwYXJzZUludCBpbnB1dC52YWx1ZVxuICAgICAgZWxzZVxuICAgICAgICBvYmpbZ2lyZC5wcmVmaXhdID0gaW5wdXQudmFsdWVcblxuICByZXN1bHQuaW5uZXJUZXh0ID0gbWFrZUpzb24gb2JqXG5cbm1ha2VDcmVhdGVCdXR0b25HcmlkID0gLT5cbiAgZ3JpZCA9IG1ha2VEaXYgbnVsbCwgXCJtZGwtZ3JpZFwiXG4gIGdyaWQuYXBwZW5kQ2hpbGQgbWFrZVNwYWNlcigpXG4gIGJ0biA9IG1ha2VDcmVhdGVCdXR0b24oKVxuICBidG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCBzaG93UmVzdWx0XG4gIGdyaWQuYXBwZW5kQ2hpbGQgYnRuXG4gIGdyaWQuYXBwZW5kQ2hpbGQgbWFrZVNwYWNlcigpXG4gIHJldHVybiBncmlkXG5cbm1ha2VDcmVhdGVCdXR0b24gPSAtPlxuICByZXR1cm4gbWFrZUJ1dHRvbihcbiAgICBcImNyZWF0ZS1idXR0b25cIixcbiAgICBcIm1kbC1idXR0b24gbWRsLWpzLWJ1dHRvbiBtZGwtYnV0dG9uLS1yYWlzZWQgbWRsLWpzLXJpcHBsZS1lZmZlY3QgbWRsLWJ1dHRvbi0tYWNjZW50XCIsXG4gICAgXCLkvZzmiJBcIlxuICApXG5cbm1ha2VCdXR0b24gPSAoaWQsIGNsYXNzTmFtZSwgdGV4dCkgLT5cbiAgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnYnV0dG9uJ1xuICBidXR0b24uaWQgPSBpZCBpZiBpZD9cbiAgYnV0dG9uLmNsYXNzTmFtZSA9IGNsYXNzTmFtZSBpZiBjbGFzc05hbWU/XG4gIGJ1dHRvbi5pbm5lclRleHQgPSB0ZXh0XG4gIHJldHVybiBidXR0b25cblxubWFrZUdyaWQgPSAoaWRQcmVmaXgsIHRleHQsIGhhc0lucHV0ID0gdHJ1ZSwgcmFkaW9idG5zKSAtPlxuICBncmlkID0gbWFrZURpdiBudWxsLCBcIm1kbC1ncmlkXCJcbiAgZ3JpZC5hcHBlbmRDaGlsZCBtYWtlU3BhY2VyKClcblxuICBjZWxsID0gbWFrZURpdiBudWxsLCBcIm1kbC1jZWxsIG1kbC1jZWxsLS00LWNvbFwiXG4gIGdyaWQuYXBwZW5kQ2hpbGQgY2VsbFxuXG4gIHRleHRGaWxlZCA9IG1ha2VEaXYgbnVsbCwgXCJtZGwtdGV4dGZpZWxkIG1kbC1qcy10ZXh0ZmllbGRcIlxuICBjZWxsLmFwcGVuZENoaWxkIHRleHRGaWxlZFxuXG4gIGlmIGhhc0lucHV0XG4gICAgaW5wdXQgPSBtYWtlSW5wdXQgXCIje2lkUHJlZml4fS1pbnB1dFwiLCBcIm1kbC10ZXh0ZmllbGRfX2lucHV0XCIsIFwidGV4dFwiXG4gICAgaW5wdXQucGF0dGVybiA9IFwiLT9bMC05XSooXFwuWzAtOV0rKT9cIlxuICAgIHRleHRGaWxlZC5hcHBlbmRDaGlsZCBpbnB1dFxuXG4gIGxhYmVsID0gbWFrZUxhYmVsIG51bGwsIFwibWRsLXRleHRmaWVsZF9fbGFiZWxcIiwgXCIje2lkUHJlZml4fS1pbnB1dFwiLCB0ZXh0XG4gIHRleHRGaWxlZC5hcHBlbmRDaGlsZCBsYWJlbFxuXG4gIGlmIHJhZGlvYnRucz9cbiAgICByYWRpb0NlbGwgPSBtYWtlRGl2IG51bGwsIFwibWRsLWNlbGwgbWRsLWNlbGwtLTQtY29sXCJcbiAgICBncmlkLmFwcGVuZENoaWxkIHJhZGlvQ2VsbFxuICBlbHNlXG4gICAgZ3JpZC5hcHBlbmRDaGlsZCBtYWtlRGl2IG51bGwsIFwibWRsLWNlbGwgbWRsLWNlbGwtLTQtY29sXCJcblxuICBncmlkLmFwcGVuZENoaWxkIG1ha2VTcGFjZXIoKVxuXG4gIHJldHVybiBncmlkXG5cbm1ha2VEaXYgPSAoaWQsIGNsYXNzTmFtZSkgLT5cbiAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuICBkaXYuaWQgPSBpZCBpZiBpZD9cbiAgZGl2LmNsYXNzTmFtZSA9IGNsYXNzTmFtZSBpZiBjbGFzc05hbWU/XG4gIHJldHVybiBkaXZcblxubWFrZUxhYmVsID0gKGlkLCBjbGFzc05hbWUsIGh0bWxGb3IsIHRleHQsIHZhbHVlKSAtPlxuICBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2xhYmVsJ1xuICBsYWJlbC5pZCA9IGlkIGlmIGlkP1xuICBsYWJlbC5jbGFzc05hbWUgPSBjbGFzc05hbWUgaWYgY2xhc3NOYW1lP1xuICBsYWJlbC5odG1sRm9yID0gaHRtbEZvciBpZiBodG1sRm9yP1xuICBsYWJlbC50ZXh0Q29udGVudCA9IHRleHQgaWYgdGV4dD9cbiAgbGFiZWwudmFsdWUgPSB2YWx1ZSBpZiB2YWx1ZT9cbiAgcmV0dXJuIGxhYmVsXG5cbm1ha2VJbnB1dCA9IChpZCwgY2xhc3NOYW1lLCB0eXBlKSAtPlxuICBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2lucHV0J1xuICBpbnB1dC5pZCA9IGlkIGlmIGlkP1xuICBpbnB1dC5jbGFzc05hbWUgPSBjbGFzc05hbWUgaWYgY2xhc3NOYW1lP1xuICBpbnB1dC50eXBlID0gdHlwZSBpZiB0eXBlP1xuICByZXR1cm4gaW5wdXRcblxubWFrZVNwYWNlciA9ICgpIC0+XG4gIHJldHVybiBtYWtlRGl2IG51bGwsIFwibWRsLWxheW91dC1zcGFjZXJcIlxuIiwiZ2V0SnNvbkRhdGEgPSAoY2FsbGJhY2spIC0+XG4gIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gIHJlcS5vcGVuIFwiR0VUXCIsIFwiaHR0cHM6Ly90YW5qby5pbi9jYWxvcmllLW1lbW8vZGF0YS5qc29uXCIsIHRydWVcbiAgcmVxLm9ubG9hZCA9IGNhbGxiYWNrXG4gIHJlcS5zZW5kKClcbiAgcmV0dXJuXG5cbmV4cG9ydHMuZ2V0RGF0YSA9IChjYWxsYmFjaykgLT5cbiAgZ2V0SnNvbkRhdGEgLT5cbiAgICBkYXRhID0gSlNPTi5wYXJzZSB0aGlzLnJlc3BvbnNlVGV4dFxuICAgIGNhbGxiYWNrIGRhdGEudGVtcGxhdGVzXG4gIHJldHVyblxuIiwiZGF0YSA9IHJlcXVpcmUgJy4vZGF0YSdcbnZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5jcmVhdG9yID0gcmVxdWlyZSAnLi9jcmVhdG9yJ1xuXG5jYWxvcmllRGF0YSA9IFtdXG5cbndpbmRvdy5vbmxvYWQgPSAtPlxuICByZXN1bHREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAncmVzdWx0J1xuICBpZiByZXN1bHREaXY/XG4gICAgZGF0YS5nZXREYXRhIChkYXRhKSAtPlxuICAgICAgY2Fsb3JpZURhdGEgPSBkYXRhXG4gICAgICByZXN1bHREaXYuYXBwZW5kQ2hpbGQgdmlldy5tYWtlU3BhY2VyKClcbiAgICAgIGZvciBkIGluIGNhbG9yaWVEYXRhXG4gICAgICAgIHJlc3VsdERpdi5hcHBlbmRDaGlsZCB2aWV3Lm1ha2VIdG1sIGRcbiAgICAgIHJlc3VsdERpdi5hcHBlbmRDaGlsZCB2aWV3Lm1ha2VTcGFjZXIoKVxuICAgICAgcmV0dXJuXG5cbiAgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAnc2VhcmNoLWlucHV0J1xuICBpbnB1dC5hZGRFdmVudExpc3RlbmVyICdjaGFuZ2UnLCBkaWRTZWFyY2hJbnB1dFRleHRDaGFuZ2VkIGlmIGlucHV0P1xuXG4gIGNyZWF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdjb250ZW50cy1jcmVhdGUnXG4gIGNyZWF0b3IuaW5pdFZpZXcoKSBpZiBjcmVhdGU/XG5cbiAgbmV3IENsaXBib2FyZCAnLmNsaXBib2FyZCdcblxuICByZXR1cm5cblxuZGlkU2VhcmNoSW5wdXRUZXh0Q2hhbmdlZCA9IC0+XG4gIHJlc3VsdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdyZXN1bHQnXG4gIGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ3NlYXJjaC1pbnB1dCdcbiAgdW5sZXNzIHJlc3VsdERpdj8gYW5kIGlucHV0P1xuICAgIHJldHVyblxuICB3aGlsZSByZXN1bHREaXYuZmlyc3RDaGlsZFxuICAgIHJlc3VsdERpdi5yZW1vdmVDaGlsZCByZXN1bHREaXYuZmlyc3RDaGlsZFxuXG4gIGxpc3QgPSBjYWxvcmllRGF0YVxuICBpZiBpbnB1dC52YWx1ZS5sZW5ndGggPiAwXG4gICAgbGlzdCA9IGNhbG9yaWVEYXRhLmZpbHRlciAoZWxlbWVudCwgaW5kZXgsIGFycmF5KSAtPlxuICAgICAgcmV0dXJuIGVsZW1lbnQubmFtZS5pbmRleE9mKGlucHV0LnZhbHVlKSBpc250IC0xIG9yXG4gICAgICAgIGVsZW1lbnQuY29tcGFueS5pbmRleE9mKGlucHV0LnZhbHVlKSBpc250IC0xXG5cbiAgcmVzdWx0RGl2LmFwcGVuZENoaWxkIHZpZXcubWFrZVNwYWNlcigpXG5cbiAgZm9yIGQgaW4gbGlzdFxuICAgIHJlc3VsdERpdi5hcHBlbmRDaGlsZCB2aWV3Lm1ha2VIdG1sIGRcbiAgcmVzdWx0RGl2LmFwcGVuZENoaWxkIHZpZXcubWFrZVNwYWNlcigpXG4iLCJjYWxlbmRhciA9IHJlcXVpcmUoJy4vY2FsZW5kYXInKVxuY2Fsb3JpZSA9IHJlcXVpcmUoJy4vY2Fsb3JpZScpXG5cbmV4cG9ydHMubWFrZUh0bWwgPSAoY29udGVudCkgLT5cbiAgY2FyZERpdiA9IG1ha2VEaXYoY29udGVudC5pZCwgXCJjYXJkLWV2ZW50IG1kbC1jYXJkIG1kbC1zaGFkb3ctLTJkcFwiKVxuXG4gIHRpdGxlRGl2ID0gbWFrZURpdihudWxsLCBcIm1kbC1jYXJkX190aXRsZSBtZGwtY2FyZC0tZXhwYW5kXCIpXG4gIHRpdGxlRGl2LmFwcGVuZENoaWxkIG1ha2VDaGlwIGNvbnRlbnQuY29tcGFueSBpZiBjb250ZW50LmNvbXBhbnk/XG4gIHRpdGxlID0gXCIje2NvbnRlbnQubmFtZX1cIlxuICB0aXRsZSArPSBcIiN7Y2Fsb3JpZS50b1N0cmluZyhjb250ZW50LnZvbHVtZSl9XCIgaWYgY29udGVudC52b2x1bWU/XG4gIHRpdGxlRGl2LmFwcGVuZENoaWxkIG1ha2VINCB0aXRsZVxuICBjYXJkRGl2LmFwcGVuZENoaWxkIHRpdGxlRGl2XG5cbiAgc3VwcG9ydFRleHREaXYgPSBtYWtlRGl2KG51bGwsIFwibWRsLWNhcmRfX3N1cHBvcnRpbmctdGV4dFwiKVxuICBzdXBwb3J0VGV4dERpdi5pbm5lclRleHQgPSBnZXRTdXBwcnRUZXh0IGNvbnRlbnRcbiAgY2FyZERpdi5hcHBlbmRDaGlsZCBzdXBwb3J0VGV4dERpdlxuXG4gIGFjdGlvbkRpdiA9IG1ha2VEaXYobnVsbCwgXCJtZGwtY2FyZF9fYWN0aW9ucyBtZGwtY2FyZC0tYm9yZGVyXCIpXG4gIGFjdGlvbkRpdi5hcHBlbmRDaGlsZCBtYWtlQShcbiAgICBcIm1kbC1idXR0b24gbWRsLWJ1dHRvbi0tY29sb3JlZCBtZGwtanMtYnV0dG9uIG1kbC1qcy1yaXBwbGUtZWZmZWN0XCIsXG4gICAgXCJBZGQgdG8gQ2FsZW5kYXJcIixcbiAgICBjYWxlbmRhci5tYWtlVXJsKGNvbnRlbnQpXG4gIClcbiAgYWN0aW9uRGl2LmFwcGVuZENoaWxkIG1ha2VTcGFjZXIoKVxuICBhY3Rpb25EaXYuYXBwZW5kQ2hpbGQgbWFrZUkoXCJtYXRlcmlhbC1pY29uc1wiLCBcImV2ZW50XCIpXG4gIGNhcmREaXYuYXBwZW5kQ2hpbGQgYWN0aW9uRGl2XG5cbiAgcmV0dXJuIGNhcmREaXZcblxubWFrZVNwYWNlciA9IC0+XG4gIHJldHVybiBtYWtlRGl2KG51bGwsIFwibWRsLWxheW91dC1zcGFjZXJcIilcblxuZXhwb3J0cy5tYWtlU3BhY2VyID0gbWFrZVNwYWNlclxuXG5tYWtlRGl2ID0gKGlkLCBjbGFzc05hbWUpIC0+XG4gIGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG4gIGQuaWQgPSBpZCBpZiBpZD9cbiAgZC5jbGFzc05hbWUgPSBjbGFzc05hbWUgaWYgY2xhc3NOYW1lP1xuICByZXR1cm4gZFxuXG5tYWtlSDQgPSAodGV4dCkgLT5cbiAgaDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdoNCdcbiAgaDQuaW5uZXJUZXh0ID0gdGV4dCBpZiB0ZXh0P1xuICByZXR1cm4gaDRcblxubWFrZUEgPSAoY2xhc3NOYW1lLCB0ZXh0LCBocmVmKSAtPlxuICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnYSdcbiAgYS5jbGFzc05hbWUgPSBjbGFzc05hbWUgaWYgY2xhc3NOYW1lP1xuICBhLmlubmVyVGV4dCA9IHRleHQgaWYgdGV4dD9cbiAgYS5ocmVmID0gaHJlZiBpZiBocmVmP1xuICBhLnRhcmdldCA9IFwiX2JsYW5rXCJcbiAgcmV0dXJuIGFcblxubWFrZUkgPSAoY2xhc3NOYW1lLCB0ZXh0KSAtPlxuICBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnaSdcbiAgaS5jbGFzc05hbWUgPSBjbGFzc05hbWUgaWYgY2xhc3NOYW1lP1xuICBpLmlubmVyVGV4dCA9IHRleHQgaWYgdGV4dD9cbiAgcmV0dXJuIGlcblxubWFrZUNoaXAgPSAodGV4dCkgLT5cbiAgbWRsQ2hpcENvbnRhY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzcGFuJ1xuICBtZGxDaGlwQ29udGFjdC5jbGFzc05hbWUgPVxuICAgIFwibWRsLWNoaXBfX2NvbnRhY3QgbWRsLWNvbG9yLS10ZWFsIG1kbC1jb2xvci10ZXh0LS13aGl0ZVwiXG4gIG1kbENoaXBDb250YWN0LmlubmVyVGV4dCA9IHRleHQuc3Vic3RyIDAsIDFcbiAgcmV0dXJuIG1kbENoaXBDb250YWN0XG5cbmdldFN1cHBydFRleHQgPSAoY29udGVudCkgLT5cbiAgcmV0dXJuIGNhbG9yaWUuZ2V0RGV0YWlscyBjb250ZW50LCB0cnVlLCBmYWxzZVxuIl19

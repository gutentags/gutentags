
var ObservableObject = require("collections/observable-object");
require("collections/observable-array");

module.exports = Repetition;
function Repetition(body, scope, Iteration) {
    this.body = body;
    this.scope = scope;
    this.iterations = [];
    this.Iteration = Iteration;
    this._values = [];
    this._values.observeRangeChange(this, "values");
}

Object.defineProperty(Repetition.prototype, "values", {
    get: function () {
        return this._values;
    },
    set: function (values) {
        this._values.swap(0, this._values.length, values);
    }
});

Repetition.prototype.handleValuesRangeChange = function (plus, minus, index) {
    var scope = this.scope;
    var body = this.body;
    var document = this.body.ownerDocument;

    this.iterations.slice(index, index + minus.length)
    .forEach(function (iteration, offset) {
        body.removeChild(iteration.body);
        iteration.value = null;
        iteration.index = null;
        iteration.body = null;
    }, this);

    var nextIteration = this.iterations[index + 1];
    var nextSibling = nextIteration && nextIteration.body;

    this.iterations.swap(index, minus.length, plus.map(function (value, offset) {
        var childNode = document.createBody();
        var iteration = new this.Iteration(childNode, scope);
        iteration.value = value;
        iteration.index = index + offset;
        iteration.body = childNode;
        body.insertBefore(childNode, nextSibling);
        return iteration;
    }, this));

    this.updateIndexes(index);
};

Repetition.prototype.updateIndexes = function (index) {
    for (var length = this.iterations.length; index < length; index++) {
        this.iterations[index].index = index;
    }
};

Repetition.prototype.redraw = function (region) {
    this.iterations.forEach(function (iteration) {
        iteration.redraw(region);
    }, this);
};


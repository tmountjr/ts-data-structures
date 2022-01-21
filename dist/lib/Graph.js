"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
var Stack_1 = require("./Stack");
var LinkedList_1 = require("./LinkedList");
var GraphNode = /** @class */ (function () {
    function GraphNode(id) {
        this.id = id;
        this.adjacent = new LinkedList_1.LinkedList();
    }
    return GraphNode;
}());
var Graph = /** @class */ (function () {
    function Graph() {
        this.nodeLookup = new Map();
    }
    Graph.prototype.getNode = function (id) {
        var toReturn = this.nodeLookup.get(id);
        if (toReturn)
            return toReturn;
        throw new Error('No matching node with given ID found.');
    };
    Graph.prototype.addNode = function (id) {
        var newNode = new GraphNode(id);
        this.nodeLookup.set(id, newNode);
    };
    Graph.prototype.addEdge = function (source, destination, bidirectional) {
        if (bidirectional === void 0) { bidirectional = true; }
        var s = this.getNode(source);
        var d = this.getNode(destination);
        s.adjacent.add(d);
        if (bidirectional)
            d.adjacent.add(s);
    };
    Graph.prototype.hasPathDFSRecursion = function (source, destination) {
        var s = this.getNode(source);
        var d = this.getNode(destination);
        var visited = new Set();
        var recurse = function (source, destination, visited) {
            var e_1, _a;
            if (visited.has(source.id))
                return false;
            visited.add(source.id);
            if (source === destination)
                return true;
            try {
                for (var _b = __values(source.adjacent), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value.data;
                    if (recurse(child, destination, visited))
                        return true;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return false;
        };
        return recurse(s, d, visited);
    };
    Graph.prototype.hasPathDFSIteration = function (source, destination) {
        var e_2, _a;
        var s = this.getNode(source);
        var d = this.getNode(destination);
        var visited = new Set();
        var stack = new Stack_1.Stack();
        stack.push(s);
        visited.add(s.id);
        while (stack.size > 0) {
            var popped = stack.pop();
            if (!popped)
                throw new Error('Bad stack.');
            var t = popped.data;
            if (t === d)
                return true;
            try {
                for (var _b = (e_2 = void 0, __values(t.adjacent)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value.data;
                    if (!visited.has(child.id)) {
                        visited.add(child.id);
                        stack.push(child);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return false;
    };
    Graph.prototype.hasPathBFSIteration = function (source, destination) {
        var e_3, _a;
        var s = this.getNode(source);
        var d = this.getNode(destination);
        var nextToVisit = new LinkedList_1.LinkedList();
        var visited = new Set();
        nextToVisit.add(s);
        while (nextToVisit.size > 0) {
            var node = nextToVisit.shift().data;
            if (node === d)
                return true;
            if (visited.has(node.id))
                continue;
            visited.add(node.id);
            try {
                for (var _b = (e_3 = void 0, __values(node.adjacent)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var neighbor = _c.value.data;
                    nextToVisit.add(neighbor);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return false;
    };
    Graph.prototype.bfsDistance = function (source, destination, weight) {
        var e_4, _a;
        if (weight === void 0) { weight = 1; }
        var s = this.getNode(source);
        var d = this.getNode(destination);
        var nextToVisit = new LinkedList_1.LinkedList();
        var visited = new Set();
        var edges = new Map();
        nextToVisit.add(s);
        visited.add(s);
        edges.set(source, 0);
        while (nextToVisit.size > 0) {
            var current = nextToVisit.shift().data;
            if (current === d) {
                var edgeDestination = edges.get(destination);
                if (!edgeDestination) {
                    throw new Error('Edge count for destination does not exist.');
                }
                return weight * edgeDestination;
            }
            try {
                for (var _b = (e_4 = void 0, __values(current.adjacent)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var neighbor = _c.value.data;
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        nextToVisit.add(neighbor);
                        var edge = edges.get(current.id);
                        if (!edge)
                            throw new Error('Edge count for current node does not exist.');
                        edges.set(neighbor.id, edge + 1);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        return -1;
    };
    return Graph;
}());
exports.Graph = Graph;
//# sourceMappingURL=Graph.js.map
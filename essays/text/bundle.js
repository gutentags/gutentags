global=this;(function(modules){var bundle={};for(var i=0;i<modules.length;i++){var module=modules[i];modules[i]=new Module(module[0],module[1],module[2],module[3]);bundle[module[0]]=bundle[module[1]]||{};bundle[module[0]][module[1]]=module}function Module(name,id,map,factory){this.name=name;this.id=id;this.map=map;this.factory=factory}Module.prototype.getExports=function(){var module=this;if(module.exports===void 0){module.exports={};var require=function(id){var index=module.map[id];var dependency=modules[index];if(!dependency)throw new Error("Bundle is missing a dependency: "+id);return dependency.getExports()};module.exports=module.factory(require,module.exports,module)||module.exports}return module.exports};Module.prototype.bundle=bundle;return modules[0].getExports()})(function(global){return[["gutentags","essays/text/index",{"../../dom-body":2,"../../scope":4,"./essay.html":3},function(require,exports,module){"use strict";var Document=require("../../dom-body");var Scope=require("../../scope");var Essay=require("./essay.html");var scope=new Scope;var document=new Document(window.document.body);var essay=new Essay(document.documentElement,scope);essay.greeting.value="Guten Tag, Welt!";var toggle=true;setInterval(function(){toggle=!toggle;if(toggle){essay.greeting.value="Guten Tag, Welt!"}else{essay.greeting.value=null}},1e3)}],["gutentags","dom",{},function(require,exports,module){"use strict";module.exports=Document;function Document(){this.doctype=null;this.documentElement=null}Document.prototype.nodeType=9;Document.prototype.Node=Node;Document.prototype.Element=Element;Document.prototype.TextNode=TextNode;Document.prototype.Comment=Comment;Document.prototype.Attr=Attr;Document.prototype.NamedNodeMap=NamedNodeMap;Document.prototype.createTextNode=function(text){return new this.TextNode(this,text)};Document.prototype.createComment=function(text){return new this.Comment(this,text)};Document.prototype.createElement=function(type){return new this.Element(this,type)};Document.prototype.createAttribute=function(name){return new this.Attr(this,name)};function Node(document){this.ownerDocument=document;this.parentNode=null;this.firstChild=null;this.lastChild=null;this.previousSibling=null;this.nextSibling=null}Node.prototype.appendChild=function appendChild(childNode){return this.insertBefore(childNode,null)};Node.prototype.insertBefore=function insertBefore(childNode,nextSibling){if(!childNode){throw new Error("Can't insert null child")}if(childNode.ownerDocument!==this.ownerDocument){throw new Error("Can't insert child from foreign document")}if(childNode.parentNode){childNode.parentNode.removeChild(childNode)}var previousSibling;if(nextSibling){previousSibling=nextSibling.previousSibling}else{previousSibling=this.lastChild}if(previousSibling){previousSibling.nextSibling=childNode}if(nextSibling){nextSibling.previousSibling=childNode}childNode.nextSibling=nextSibling;childNode.previousSibling=previousSibling;childNode.parentNode=this;if(!nextSibling){this.lastChild=childNode}if(!previousSibling){this.firstChild=childNode}};Node.prototype.removeChild=function removeChild(childNode){if(!childNode){throw new Error("Can't remove null child")}var parentNode=childNode.parentNode;if(parentNode!==this){throw new Error("Can't remove node that is not a child of parent")}if(childNode===parentNode.firstChild){parentNode.firstChild=childNode.nextSibling}if(childNode===parentNode.lastChild){parentNode.lastChild=childNode.previousSibling}if(childNode.previousSibling){childNode.previousSibling.nextSibling=childNode.nextSibling}if(childNode.nextSibling){childNode.nextSibling.previousSibling=childNode.previousSibling}childNode.previousSibling=null;childNode.parentNode=null;childNode.nextSibling=null;return childNode};function TextNode(document,text){Node.call(this,document);this.data=text}TextNode.prototype=Object.create(Node.prototype);TextNode.prototype.constructor=TextNode;TextNode.prototype.nodeType=3;function Comment(document,text){Node.call(this,document);this.data=text}Comment.prototype=Object.create(Node.prototype);Comment.prototype.constructor=Comment;Comment.prototype.nodeType=8;function Element(document,type){Node.call(this,document);this.tagName=type;this.attributes=new this.ownerDocument.NamedNodeMap}Element.prototype=Object.create(Node.prototype);Element.prototype.constructor=Element;Element.prototype.nodeType=1;Element.prototype.hasAttribute=function(name){var attr=this.attributes.getNamedItem(name);return!!attr};Element.prototype.getAttribute=function(name){var attr=this.attributes.getNamedItem(name);return attr?attr.value:null};Element.prototype.setAttribute=function(name,value){var attr=this.ownerDocument.createAttribute(name);attr.value=value;this.attributes.setNamedItem(attr)};Element.prototype.removeAttribute=function(name){this.attributes.removeNamedItem(name)};function Attr(ownerDocument,name){this.ownerDocument=ownerDocument;this.name=name;this.value=null}Attr.prototype.nodeType=2;function NamedNodeMap(){this.length=0}NamedNodeMap.prototype.getNamedItem=function(name){return this[name]};NamedNodeMap.prototype.setNamedItem=function(attr){var name=attr.name;var previousAttr=this[name];if(!previousAttr){this[this.length]=attr;this.length++;previousAttr=null}this[name]=attr;return previousAttr};NamedNodeMap.prototype.removeNamedItem=function(name){var name=attr.name;var attr=this[name];if(!attr){throw new Error("Not found")}var index=Array.prototype.indexOf.call(this,attr);delete this[name];delete this[index];this.length--};NamedNodeMap.prototype.item=function(index){return this[index]}}],["gutentags","dom-body",{"./dom":1},function(require,exports,module){"use strict";var BaseDocument=require("./dom");var BaseNode=BaseDocument.prototype.Node;var BaseElement=BaseDocument.prototype.Element;var BaseTextNode=BaseDocument.prototype.TextNode;module.exports=Document;function Document(actualNode){Node.call(this,this);this.actualNode=actualNode;this.actualDocument=actualNode.ownerDocument;this.documentElement=this.createBody();this.documentElement.parentNode=this;actualNode.appendChild(this.documentElement.actualNode);this.firstChild=this.documentElement;this.lastChild=this.documentElement}Document.prototype=Object.create(BaseDocument.prototype);Document.prototype.Node=Node;Document.prototype.Element=Element;Document.prototype.TextNode=TextNode;Document.prototype.Body=Body;Document.prototype.createBody=function(){return new this.Body(this)};Document.prototype.getActualElement=function(){return this.actualNode};function Node(document){BaseNode.call(this,document);this.actualNode=null}Node.prototype=Object.create(BaseNode.prototype);Node.prototype.constructor=Node;Node.prototype.insertBefore=function insertBefore(childNode,nextSibling){if(nextSibling&&nextSibling.parentNode!==this){throw new Error("Can't insert before node that is not a child of parent")}BaseNode.prototype.insertBefore.call(this,childNode,nextSibling);var actualNextSibling=nextSibling&&nextSibling.getActualFirstNode();this.getActualElement().insertBefore(childNode.actualNode,actualNextSibling||null);childNode.inject();return childNode};Node.prototype.removeChild=function removeChild(childNode){if(!childNode){throw new Error("Can't remove child "+childNode)}childNode.extract();this.getActualElement().removeChild(childNode.actualNode);BaseNode.prototype.removeChild.call(this,childNode)};Node.prototype.setAttribute=function setAttribute(key,value){this.actualNode.setAttribute(key,value)};Node.prototype.getAttribute=function getAttribute(key){this.actualNode.getAttribute(key)};Node.prototype.hasAttribute=function hasAttribute(key){this.actualNode.hasAttribute(key)};Node.prototype.removeAttribute=function removeAttribute(key){this.actualNode.removeAttribute(key)};Node.prototype.inject=function injectNode(){};Node.prototype.extract=function extractNode(){};Node.prototype.getActualElement=function(){return this.actualNode};Node.prototype.getActualFirstNode=function(){return this.actualNode};Object.defineProperty(Node.prototype,"innerHTML",{get:function(){return this.actualNode.innerHTML}});function Element(document,type){BaseNode.call(this,document);this.tagName=type;this.actualNode=document.actualDocument.createElement(type)}Element.prototype=Object.create(Node.prototype);Element.prototype.constructor=Element;Element.prototype.nodeType=1;function TextNode(document,text){Node.call(this,document);this.actualNode=document.actualDocument.createTextNode(text)}TextNode.prototype=Object.create(Node.prototype);TextNode.prototype.constructor=TextNode;TextNode.prototype.nodeType=3;Object.defineProperty(TextNode.prototype,"data",{set:function(data){this.actualNode.data=data},get:function(){return this.actualNode.data}});function Body(document){Node.call(this,document);this.actualNode=document.actualDocument.createTextNode("");this.actualFirstChild=null;this.actualBody=document.actualDocument.createElement("NOBODY")}Body.prototype=Object.create(Node.prototype);Body.prototype.constructor=Body;Body.prototype.nodeType=13;Body.prototype.extract=function extract(){var body=this.actualBody;var lastChild=this.actualNode;var parentNode=this.parentNode.getActualElement();var at=this.getActualFirstNode();var next;while(at&&at!==lastChild){next=at.nextSibling;if(body){body.appendChild(at)}else{parentNode.removeChild(at)}at=next}};Body.prototype.inject=function inject(){if(!this.parentNode){throw new Error("Can't inject without a parent node")}var body=this.actualBody;var lastChild=this.actualNode;var parentNode=this.parentNode.getActualElement();var at=body.firstChild;var next;while(at){next=at.nextSibling;parentNode.insertBefore(at,lastChild);at=next}};Body.prototype.getActualElement=function(){if(this.parentNode){return this.parentNode.getActualElement()}else{return this.actualBody}};Body.prototype.getActualFirstNode=function(){if(this.firstChild){return this.firstChild.getActualFirstNode()}};Object.defineProperty(Body.prototype,"innerHTML",{get:function(){if(this.parentNode){this.extract();var html=this.actualBody.innerHTML;this.inject();return html}else{return this.actualBody.innerHTML}},set:function(html){if(this.parentNode){this.extract();this.actualBody.innerHTML=html;this.inject();return html}else{this.actualBody.innerHTML=html}}})}],["gutentags","essays/text/essay.html",{"../../text.html":6},function(require,exports,module){"use strict";var $TEXT=require("../../text.html");var $THIS=function GutentagsEssaysTextEssay(body,argumentScope,$ARGUMENT){var document=body.ownerDocument;var scope=this.scope=argumentScope.root.nest(this);scope.argumentScope=argumentScope;scope.this=this;var parent=body,parents=[],node,component,componentScope,argument;parent.appendChild(document.createTextNode(" "));node=document.createBody();parent.appendChild(node);parents[parents.length]=parent;parent=node;node={};node.innerText="—";componentScope=scope;component=new $TEXT(parent,componentScope,node,"greeting");node=parent;parent=parents[parents.length-1];parents.length--;if(scope.this.add){scope.this.add(component,"greeting",scope)}else{scope.this["greeting"]=component}parent.appendChild(document.createTextNode(" "))};module.exports=$THIS}],["gutentags","scope",{},function(require,exports,module){"use strict";module.exports=Scope;function Scope(){this.root=this}Scope.prototype=Object.create(null);Scope.prototype.nest=function(){var child=Object.create(this);child.parent=this;return child}}],["gutentags","text",{},function(require,exports,module){"use strict";module.exports=Text;function Text(body,scope,argument){var node=body.ownerDocument.createTextNode("");body.appendChild(node);this.node=node;this.defaultText=argument.innerText;this._value=null}Object.defineProperty(Text.prototype,"value",{get:function(){return this._value},set:function(value){this._value=value;if(value==null){this.node.data=this.defaultText}else{this.node.data=""+value}}})}],["gutentags","text.html",{"./text":5},function(require,exports,module){"use strict";module.exports=require("./text")}]]}(this));
/*****************************************************************
 * Copyright (c) 2017 HanyangRaon. All Rights Reserved.
 * 
 * Author : kei
 * Create Date : 2017. 1. 11.
 * DESC : 라이브러리 최상위. 네임스페이스용 K 객체 선언 및 라이브러리 호출
*****************************************************************/
"use strict";

// K 객체 선언.
Object.defineProperty(this, "K", {
	value : {}
});

// 객체 ID값 설정.
Object.defineProperty(K, "ID", {
	value : "jsHnroK"
});

K.loadedAllScript = false; // 하위 스크립트 호출 플래그

// 하위 라이브러리 자동추가
(function() {
	/* properties */
	var hnroScriptElement = document.getElementById(K.ID);
	var parentElement = hnroScriptElement.parentElement;
	var libScripts = [ "object", "number", "window", "endMarker" ];
	var libScriptsLength = libScripts.length;
	var i, nextScriptElement, frontUrl;
	
	/* 요소의 다음 노드 중 script 노드를 탐색 */
	var findNextScriptElement = function(element) {
		var nextElem = element.nextSibling;
		if (!!nextElem && nextElem.nodeName !== "SCRIPT") {
			nextElem = findNextScriptElement(nextElem);
		}
		return nextElem;
	};
	
	/* 라이브러리 파일 script element 생성 */
	var createScriptElement = function(frontUrl, jsFileName) {
		var scriptElement = document.createElement("script");
		scriptElement.type = "text/javascript";
		scriptElement.src = frontUrl + jsFileName + ".js";
		return scriptElement;
	};
	
	/* 라이브러리 스크립트의 위치 정보 획득 */
	frontUrl = hnroScriptElement.src;
	frontUrl = frontUrl.substr(0, frontUrl.lastIndexOf("/") + 1) + "libs/";
	
	/* 라이브러리 스크립트 부착 기준이 될 script 노드 탐색 */
	nextScriptElement = findNextScriptElement(hnroScriptElement);
	
	/* 라이브러리 스크립트 추가 */
	if (!nextScriptElement) {
		for (i = 0; i < libScriptsLength; i++) {
			parentElement.appendChild(createScriptElement(frontUrl, libScripts[i]));
		}
	} else {
		debugger;
		for (i = 0; i < libScriptsLength; i++) {
			parentElement.insertBefore(createScriptElement(frontUrl, libScripts[i]), nextScriptElement);
		}
	}
}());

//Object.defineProperty(this, "K", {
//	value : {}, // 값
//	configurable : false, // 해당 객체에서 속성 제거 여부 설정. 기본값 false
//	enumerable : false, // 해당 객체 키 열거 가능 여부. 기본값 false.
//	writable : false, // 할당연산자(assignment operator)를 통해 값 변경 가능 여부. 기본값 false
//	//	get : function() {
//	//		return this.value;
//	//	},
//	//	set : function(newValue) {
//	//		this.value = newValue;
//	//	}
//});

//(function(g, factory) {
//	if (!g.HNRO) {
//		factory(g);
//	} else if (g.HNRO.NAME !== "HanyangRaon") {
//		console.error("HNRO class's name is not 'HanyangRaon'. namespace is creashed!!");
//	}
//}(this, function(g) {
//	var _hr;
//	
//	// constructor
//	g.HNRO = function() {
//	};
//	
//	_hr = g.HNRO.prototype = {};
//	_hr.constructor = g.HNRO;
//	
//	_hr.NAME = "HanyangRaon";
//	
//	Object.defineProperties(_hr, "NAME", {
//		value : "HanyangRaon",
//		writable : false,
//		configurable : false,
//		enumerable : false
//	});

//	
//	//	{
//	//			a: 1,
//	//			get NAME() {
//	//		return "HanyangRaon";
//	//	}};
//	
//	hnro.fn = hnro.prototype = {};
//	
//	init = jQuery.fn.init = function(selector, context, root) {
//		var match, elem;
//		
//		// HANDLE: $(""), $(null), $(undefined), $(false)
//		if (!selector) {
//			return this;
//		}
//		
//		// Method init() accepts an alternate rootjQuery
//		// so migrate can support jQuery.sub (gh-2101)
//		root = root || rootjQuery;
//		
//		// Handle HTML strings
//		if (typeof selector === "string") {
//			if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
//				
//				// Assume that strings that start and end with <> are HTML and skip the regex check
//				match = [ null, selector, null ];
//				
//			} else {
//				match = rquickExpr.exec(selector);
//			}
//			
//			// Match html or make sure no context is specified for #id
//			if (match && (match[1] || !context)) {
//				
//				// HANDLE: $(html) -> $(array)
//				if (match[1]) {
//					context = context instanceof jQuery ? context[0] : context;
//					
//					// Option to run scripts is true for back-compat
//					// Intentionally let the error be thrown if parseHTML is not present
//					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
//					
//					// HANDLE: $(html, props)
//					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
//						for (match in context) {
//							
//							// Properties of context are called as methods if possible
//							if (jQuery.isFunction(this[match])) {
//								this[match](context[match]);
//								
//								// ...and otherwise set as attributes
//							} else {
//								this.attr(match, context[match]);
//							}
//						}
//					}
//					
//					return this;
//					
//					// HANDLE: $(#id)
//				} else {
//					elem = document.getElementById(match[2]);
//					
//					if (elem) {
//						
//						// Inject the element directly into the jQuery object
//						this[0] = elem;
//						this.length = 1;
//					}
//					return this;
//				}
//				
//				// HANDLE: $(expr, $(...))
//			} else if (!context || context.jquery) {
//				return (context || root).find(selector);
//				
//				// HANDLE: $(expr, context)
//				// (which is just equivalent to: $(context).find(expr)
//			} else {
//				return this.constructor(context).find(selector);
//			}
//			
//			// HANDLE: $(DOMElement)
//		} else if (selector.nodeType) {
//			this[0] = selector;
//			this.length = 1;
//			return this;
//			
//			// HANDLE: $(function)
//			// Shortcut for document ready
//		} else if (jQuery.isFunction(selector)) {
//			return root.ready !== undefined ? root.ready(selector) :
//
//			// Execute immediately if ready is not present
//			selector(jQuery);
//		}
//		
//		return jQuery.makeArray(selector, this);
//	};

// return hnro;
//}));
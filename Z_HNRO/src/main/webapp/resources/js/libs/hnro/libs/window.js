/*****************************************************************
 * Copyright (c) 2017 HanyangRaon. All Rights Reserved.
 * 
 * Author : kei
 * Create Date : 2017. 1. 12.
 * DESC : K.Window 라이브러리
*****************************************************************/
(function(factory) {
	if (!K.Window) {
		K.Window = factory();
		K.Window.prototype.constructor = K.Window;
	}
}(function() {
	/**
	 * K.Window 생성자
	 * 
	 * @param {Window} w 윈도우 객체. 미임력시 window 변수를 자동 대입하여 사용
	 */
	var Util = function(w) {
		if (this.ID === K.ID) {
			return new K.Window(w);
		}
		
		if (K.Object.isEmpty(w)) {
			w = window;
		}
		
		if (!(w instanceof Window)) {
			console.error("");
			w = null;
		}
		
		Object.defineProperty(this, "window", {
			value : w,
			writable : false,
			configurable : false,
		});
	};
	var _pt = Util.prototype = {};
	
	/* =================== static ====================== */

	/* =================== const ======================= */
	Object.defineProperty(_pt, "ID", {
		value : "jsHnroK_window"
	});
	
	/* =================== properties =================== */
	_pt.window = null;
	
	/* =================== methods ====================== */
	/**
	 * 현재 사용중인 브라우저가 인터넷 익스플로러인지 확인
	 * 
	 * @param {int} limitVersion 특정 버전 이상일 경우만 IE로 판정하고자 할 경우 버전값을 입력. 모든 IE 판별시 값을 입력하지 않음. 잘못된 값 입력시 동작을 보장하지 않음.
	 * @return {boolean} 인터넷 익스플로러일경우 true.
	 */
	_pt.isIEBrowser = function(limitVersion) {
		var browserInfo = this.getBrowserInfo();
		var isIE = browserInfo.name === "MSIE" || browserInfo.name === "Trident";
		var version = parseInt(browserInfo.version);
		if (!!limitVersion) {
			if (browserInfo.name === "Trident") {
				limitVersion -= 4;
			}
			isIE = (limitVersion <= version);
		}
		return isIE;
	};
	
	/**
	 * 현재 사용중인 브라우저의 정보를 획득
	 * 
	 * @return {object} name, version 키를 가지는 브라우저 정보 객체. window 정보가 잘못되었을 경우 null 반환
	 */
	_pt.getBrowserInfo = function() {
		var w = this.window;
		var i, len, userAgent, browserList, index, endIndex, browserInfo, splitInfo, result;
		
		if (w === null) {
			return null;
		}
		
		userAgent = w.navigator.userAgent;
		browserList = [ "Trident", "MSIE", "Chrome", "Opera", "Firefox" ];
		for (i = 0, len = browserList.length; i < len; i++) {
			if ((index = userAgent.indexOf(browserList[i])) !== -1) {
				endIndex = userAgent.indexOf(" ", index);
				browserInfo = userAgent.substring(index, (index < endIndex) ? endIndex : userAgent.length);
				break;
			}
		}
		
		splitInfo = browserInfo.split("/");
		result = {
			name : splitInfo[0],
			version : splitInfo[1]
		};
		
		return result;
	};
	
	return Util;
}));

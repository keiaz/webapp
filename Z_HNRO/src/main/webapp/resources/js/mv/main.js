/*****************************************************************
 * Copyright (c) 2017 HanyangRaon. All Rights Reserved.
 * 
 * Author : kei
 * Create Date : 2017. 1. 11.
 * DESC : 홈 화면 컨트롤러
*****************************************************************/
"use strict";

(function(ctrl) {
	if (!K) {
		console.error("This script must need K object. pleash check hnro_k.js and sub libraries.");
		return;
	}
	
	/* K 라이브러리가 전부 로딩되면 화면 컨트롤러를 실행 */
	var runVC = function() {
		if (K.loadedAllScript) {
			var w = K.Window();
			if (w.isIEBrowser(9)) {
				if (!w.window.hnro) {
					K.Object.createConst(w.window, "hnro", ctrl());
					ctrl = null;
					hnro.init();
				}
			} else {
				alert("This site does not support down-level IE. Use IE9 or higher IE or another browser.");
			}
		} else {
			setTimeout(runVC, 100);
			console.log(K.loadedAllScript);
		}
	};
	
	setTimeout(runVC, 100);
}(function() {
	var vc = {};
	
	// const
	K.Object.createConst(vc, "NAME", "hanyangraon");
	
	// properties
	vc.vc = {}; // 각 화면 뷰컨트롤 적용
	
	/**
	 * 화면 초기화
	 */
	vc.init = function() {
		// set navigator
		$("body>nav>ul>li").on("click", function(e) {
			var $this = $(this);
			
			if ($this.hasClass("active")) {
				return;
			}
			$("nav>ul>li").removeClass("active");
			$this.addClass("active");
			
			hnro.callAjax($this.data("url"), null, hnro.loadHtml, {
				type : "get",
				dataType : "html",
				context : "#contents",
				beforeSend : hnro.loadingView,
				error : hnro.showAjaxError,
			});
		}).eq(0).trigger("click");
	};
	
	/**
	 * 기본값이 적용된 ajax 호출
	 * 
	 * @param {string} url 호출할 url. 기본값 ""
	 * @param {} postData 전달할 데이터
	 * @param {function} successHandler 호출 성공시 동작할 함수
	 * @param {object} options ajxs 설정. postData에 유효한 값이 있는데 options에도 data가 존재할 경우, postData가 data로 처리된다.
	 */
	vc.callAjax = function(url, postData, successHandler, options) {
		var defaultOptions = {
			method : "post",
			contentType : "application/json; charset=UTF-8",
			dataType : "text", // Intelligent Guess (xml, json, jsonp, script, or html))
			error : hnro.ajaxErrorHandler,
		// async : true, crossDomain : false, cache : true, global : true, headers : {}, ifModified : false, processData : true, statusCode : {},
		// context, contents, converters, dataFilter, isLocal, jsonp, jsonpCallback, mimeType, username, password, scriptCharset, timeout, traditional, xhr, xhrFields
		};
		
		if (K.Object.isObject(options)) {
			$.extend(defaultOptions, options);
		}
		
		if (K.Object.isValid(postData)) {
			defaultOptions.data = postData;
		}
		
		defaultOptions.url = (K.Object.isString(url)) ? getContextPath() + url : "";
		defaultOptions.success = K.Object.isFunction(successHandler) ? successHandler : null;
		
		$.ajax(defaultOptions);
	};
	
	/**
	 * ajax 호출 실패시 호출될 기본 에러 함수
	 * 
	 * @param {jqXHR} jqXHR
	 * @param {string} textStatus
	 * @param {string} errorThrown
	 */
	vc.ajaxErrorHandler = function(jqXHR, textStatus, errorThrown) {
		console.error(textStatus, errorThrown, jqXHR);
	};
	
	/**
	 * 문자열로 전달된 html을 로드
	 * 
	 * @param {string} htmlScript html 스크립트
	 */
	vc.loadHtml = function(htmlScript) {
		$(this).css({
			opacity : "0.0"
		}).html(htmlScript).delay(50).animate({
			opacity : "1.0"
		}, 50);
	};
	
	/**
	 * 기존 화면을 파기하고 화면에 loading을 표시.
	 */
	vc.loadingView = function() {
		$(this).empty().html("Loading...");
		$("html,body").animate({
			scrollTop : 0
		}, "fast");
	};
	
	/**
	 * 메뉴 호출 실패시 호출되어, 에러 화면을 표시
	 * 
	 * @param {jqXHR} jqXHR
	 * @param {string} textStatus
	 * @param {string} errorThrown
	 */
	vc.showAjaxError = function(jqXHR, textStatus, errorThrown) {
		var $contents = $(this).empty();
		var $rt = $(jqXHR.responseText);
		
		console.error(jqXHR);
		
		$contents.append("<h1> [" + textStatus.toUpperCase() + "] " + errorThrown + "</h1>");
		$contents.append("<p>status: " + jqXHR.status + "</p>");
		$contents.append($("<div class=\"container\" />").append($rt.not("style")));
	};
	
	return vc;
}));
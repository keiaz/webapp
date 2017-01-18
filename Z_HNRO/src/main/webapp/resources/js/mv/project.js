/*****************************************************************
 * Copyright (c) 2017 HanyangRaon. All Rights Reserved.
 * 
 * Author : kei
 * Create Date : 2017. 1. 16.
 * DESC : 프로젝트 화면 컨트롤러
*****************************************************************/
"use strict";

(function(ctrl) {
	if (!K) {
		console.error("This script must need K object. pleash check hnro_k.js and sub libraries.");
		return;
	}
	
	if (!hnro) {
		console.error("This script must need main.js script!!!");
		return;
	}
	
	hnro.vc = ctrl();
	hnro.vc.init();
}(function() {
	var vc = {};
	
	// properties
	vc.project = {};
	
	/**
	 * 화면 초기화
	 */
	vc.init = function() {
		// set select event
		$("#selProject").on("change", function(e) {
			hnro.callAjax("/project" + $(this).val(), null, hnro.loadHtml, {
				type : "get",
				dataType : "html",
				context : "#projectContents",
				beforeSend : hnro.loadingView,
				error : hnro.showAjaxError,
			});
		}).trigger("change");
		
		$("#btnMoveTop").on("click", function(e) {
			$("html,body").animate({
				scrollTop : 0
			}, "fast");
		});
	};
	
	return vc;
}));
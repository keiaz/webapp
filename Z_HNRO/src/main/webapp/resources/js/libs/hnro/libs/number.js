/*****************************************************************
 * Copyright (c) 2017 HanyangRaon. All Rights Reserved.
 * 
 * Author : kei
 * Create Date : 2017. 1. 17.
 * DESC : K.Number 라이브러리
*****************************************************************/
(function(factory) {
	if (!K.Number) {
		K.Number = factory();
		K.Number.prototype.constructor = K.Number;
	}
}(function() {
	/**
	 * Number 생성자
	 * 
	 * @param {} value 객체에서 핸들링할 값
	 */
	var Util = function(value) {
		if (this.ID === K.ID) {
			return new K.Number(value);
		}
		this.value = value;
	};
	var _pt = Util.prototype = {};
	
	/* =================== static ====================== */

	/* =================== const ======================= */
	Object.defineProperty(_pt, "ID", {
		value : "jsHnroK_number"
	});
	
	/* =================== properties =================== */
	_pt.value = 0;
	
	/* =================== methods ====================== */
	/**
	 * 숫자를 현금 포멧으로 반환 <br>
	 * 천단위마다 ,를 넣는다.
	 * 
	 * @return {string} 포멧된 숫자값
	 */
	_pt.formattedCash = function() {
		return this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	
	return Util;
}));
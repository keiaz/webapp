/*****************************************************************
 * Copyright (c) 2017 HanyangRaon. All Rights Reserved.
 * 
 * Author : kei
 * Create Date : 2017. 1. 12.
 * DESC : K.Object 라이브러리
*****************************************************************/
(function(factory) {
	if (!K.Object) {
		K.Object = factory();
		K.Object.prototype.constructor = K.Object;
	}
}(function() {
	/**
	 * K.Object 생성자
	 * 
	 * @param {} value 객체에서 핸들링할 값
	 */
	var Util = function(value) {
		if (this.ID === K.ID) {
			return new K.Object(value);
		}
		this.value = value;
	};
	var _pt = Util.prototype = {};
	
	/* =================== static ====================== */
	/**
	 * object 객체에 변경 불가능한 상수키 생성
	 */
	Util.createConst = function(object, keyName, value) {
		Object.defineProperty(object, keyName, {
			value : value
		});
	};
	
	/**
	 * 값을 체크하여 비어있을 경우 true. <br>
	 * undefined, null, NaN 일 경우 유효하지 않은 값으로 판정. <br>
	 * 값이 object, array일 경우 빈 객체일경우도 유효하지 않은 값으로 판정
	 * 
	 * @param {} value 검사할 값
	 * @param {boolean} includeEmptyString true일 경우 ""도 유효하지 않은 값으로 판정.
	 * @return {boolean} 값이 유효하지 않을 경우 true
	 */
	Util.isEmpty = function(value, includeEmptyString) {
		var type = typeof value;
		var result = true;
		var k, v;
		
		if (type !== "object") {
			result = (value === undefined || value === null || (type === "number" && isNaN(value)));
			if (!result && (includeEmptyString === true)) {
				result = (value === "");
			}
		} else { // object, array
			for (k in value) {
				result = Util.isEmpty(value[k], includeEmptyString);
				if (!result) {
					break;
				}
			}
			if (k === undefined) { // 빈 object 확인
				result = true;
			}
		}
		
		return result;
	};
	
	/**
	 * 값을 체크하여 유효한 값일 경우 true <br>
	 * undefined, null, NaN 일 경우 유효하지 않은 값으로 판정. <br>
	 * 값이 object, array일 경우 빈 객체일경우도 유효하지 않은 값으로 판정
	 * 
	 * @param {} value 검사할 값
	 * @param {boolean} includeEmptyString true일 경우 ""도 유효하지 않은 값으로 판정.
	 * @return {boolean} 값이 유효할 경우 true
	 */
	Util.isValid = function(value, includeEmptyString) {
		return !this.isEmpty(value, includeEmptyString);
	};
	
	/**
	 * 값이 문자열일 경우 true
	 * 
	 * @param {} value 체크할 값
	 * @return {boolean} value가 string일 경우 true
	 */
	Util.isString = function(value) {
		return this.isValid(value) && typeof value === "string";
	};
	
	/**
	 * 값이 object일 경우 true
	 * 
	 * @param {} value 체크할 값
	 * @return {boolean} value가 Object일 경우 true
	 */
	Util.isObject = function(value) {
		return this.isValid(value) && value.constructor === Object;
	};
	
	/**
	 * 값이 함수일 경우 true
	 * 
	 * @param {} value 체크할 값
	 * @return {boolean} value가 function일 경우 true
	 */
	Util.isFunction = function(value) {
		return this.isValid(value) && typeof value === "function";
	};
	
	/* =================== const ======================= */
	Object.defineProperty(_pt, "ID", {
		value : "jsHnroK_object"
	});
	
	/* =================== properties =================== */
	_pt.value = {};
	
	/* =================== methods ====================== */

	return Util;
}));
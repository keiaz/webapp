/*******************************************************************************
 * Copyright (c) 2017 HanyangRaon. All Rights Reserved.
 * 
 * Author : kei
 * Create Date : 2017. 1. 16.
 * DESC : 파이널 판타지 14 골드소서 일일복권 경우의 수 계산기
 ******************************************************************************/
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
	
	if (!hnro.vc) {
		console.error("This script must need project.js script!!!");
		return;
	}
	
	hnro.vc.project = ctrl();
	hnro.vc.project.init();
}(function() {
	var vc = {};
	
	// 보상 정보
	vc.REWORD_LIST = {
		"6" : 10000,
		"24" : 3600,
		"23" : 1800,
		"21" : 1080,
		"8" : 720,
		"9" : 360,
		"20" : 306,
		"11" : 252,
		"15" : 180,
		"17" : 180,
		"22" : 144,
		"18" : 119,
		"12" : 108,
		"10" : 80,
		"13" : 72,
		"16" : 72,
		"14" : 54,
		"7" : 36,
		"19" : 36,
	};
	
	// const
	K.Object.createConst(vc, "MIN", 1);
	K.Object.createConst(vc, "MAX", 9);
	
	// properties
	vc.probList; // 조합가능한 숫자 목록
	
	/**
	 * 화면 초기화
	 */
	vc.init = function() { // TODO 뭐가 문제라 개판인걸까 ^0^
		hnro.vc.project.getProbList();
		
		$(".numberButton").addClass("active").on("click", function(e) {
			$(".selected").removeClass("selected");
			$(this).addClass("selected");
			$("#inputNumber").focus();
		});
		
		$(".arrowButton").on("click", function(e) {
			var $this = $(this);
			var indexes = $this.data("buttons").split(",");
			$(".arrowButton").removeClass("active");
			$this.addClass("active");
			hnro.vc.project.calculateMinMaxReward(indexes[0], indexes[1], indexes[2]);
		});
		
		$("#inputNumber").on("keydown", function(e) {
			if (e.keyCode === 13) {
				hnro.vc.project.applyNumber();
			}
		});
		
		$("#buttonSubmit").on("click", function(e) {
			hnro.vc.project.applyNumber();
		});
		
		$("#buttonRemove").on("click", function(e) {
			$(".selected").text("");
		});
	};
	
	/**
	 * 숫자를 버튼에 적용
	 */
	vc.applyNumber = function() {
		var self = hnro.vc.project;
		var num = parseInt($("#inputNumber").val());
		var $selected;
		
		if (K.Object.isEmpty(num)) {
			alert("숫자를 입력해 주세요");
			return;
		} else if (num < self.MIN || num > self.MAX) {
			alert("1 ~ 9 사이의 숫자를 입력해 주세요");
			return;
		}
		
		$selected = $(".selected");
		if ($selected.length === 0) {
			alert("선택된 버튼이 없습니다. 버튼을 선택한 뒤 값을 입력해 주세요");
			return;
		}
		
		if ($("button:contains('" + num + "')").length !== 0) {
			alert("이미 등록된 숫자입니다. 다른 숫자를 입력해 주세요");
			return;
		}
		
		$selected.text(num);
	};
	
	/**
	 * 보상이 큰 순서대로 합계값이 정렬된 배열 획득
	 * 
	 * @param {Object} rewardObject 보상 데이터
	 */
	vc.getTopRewardKeyList = function(rewardObject) {
		var objRewardKey, arrSortReward, arrTopRewardKey;
		
		objRewardKey = {};
		arrSortReward = [];
		
		$.each(rewardObject, function(key, value) {
			if ($.inArray(value, arrSortReward) === -1) {
				arrSortReward.push(value);
			}
			
			if (!objRewardKey[value]) {
				objRewardKey[value] = [ key ];
			} else {
				objRewardKey[value].push(key);
			}
		});
		
		arrSortReward.sort(function(a, b) {
			return b - a;
		});
		
		arrTopRewardKey = [];
		$.each(arrSortReward, function(index, value) {
			arrTopRewardKey = arrTopRewardKey.concat(objRewardKey[value]);
		});
		
		return arrTopRewardKey;
	};
	
	/**
	 * 조합 가능한 숫자 목록을 획득
	 */
	vc.getProbList = function() {
		var self = hnro.vc.project;
		var arrTopRewardKey;
		
		arrTopRewardKey = self.getTopRewardKeyList(self.REWORD_LIST);
		debugger; // TODO 여기서부터 다시 재작업. 여튼 뭔가 버그가 있어서 ;ㅁ;
		
		var i, j, k, len, jlen, item, child, startNum, key, text;
		var sumGrouping;
		var $showList;
		var probList = []; // 조합 가능한 숫자 목록
		
		// probList = [];
		// for (i = self.MIN; i <= self.MAX; i++) {
		// startNum = i; // 시작값
		// while (true) {
		// item = [ i ];
		//				
		// startNum++;
		// if (startNum > self.MAX) {
		// startNum = 1;
		// }
		// if (startNum === i) {
		// break;
		// }
		//				
		// j = startNum;
		// while (true) { // 9개 숫자 배열 생성
		// if (j !== i) {
		// item.push(j);
		// }
		//					
		// if (j === self.MAX) {
		// j = 1;
		// } else {
		// j++;
		// }
		//					
		// if (j === startNum) {
		// break;
		// }
		// }
		//				
		// k = 0;
		// while (true) {
		// child = item.slice(k, k + 3).sort();
		// if (!self.hasArray(probList, child)) {
		// probList.push(child);
		// }
		//					
		// k += 3;
		// if (k === self.MAX) {
		// break;
		// }
		// }
		// }
		// }
		// self.probList = probList;
		//		
		// sumGrouping = {};
		// for (i = 0, len = probList.length; i < len; i++) {
		// child = probList[i];
		// key = (child[0] + child[1] +child[2]) + "";
		// if (!sumGrouping[key]) {
		// sumGrouping[key] = [];
		// }
		// sumGrouping[key].push(child);
		// }
		//		
		// $showList = $("#showList");
		// for (i = 0, len = self.REWORD_TOP_LIST.length; i < len; i++) {
		// key = self.REWORD_TOP_LIST[i];
		// child = sumGrouping[key];
		// if (!child) {
		// continue;
		// }
		//			
		// $("<h3 />").text("합계 " + key + " : " +
		// K.Number(self.REWORD_LIST[key]).formattedCash() + "
		// MGP").appendTo($showList);
		// text = "[ ";
		// for (j = 0, jlen = child.length; j < jlen; j++) {
		// item = child[j];
		// text += item.join(", ");
		// if (j < jlen - 1) {
		// text += " ], [ ";
		// }
		// }
		// text += " ]";
		// $("<p />").text(text).appendTo($showList);
		// }
	};
	
	/**
	 * 배열 내 일치하는 배열이 존재할 경우 true
	 * 
	 * @param {Array}
	 *            parentArray 부모 배열
	 * @param {Array}
	 *            checkArray 포함되어 있는지 체크할 배열
	 * @return {boolean} 부모 배열 내 체크 배열이 존재할 경우 true
	 */
	vc.hasArray = function(parentArray, checkArray) {
		var i, len, item;
		for (i = 0, len = parentArray.length; i < len; i++) {
			item = parentArray[i];
			if (item[0] === checkArray[0] && item[1] === checkArray[1] && item[2] === checkArray[2]) {
				return true;
			}
		}
		return false;
	};
	
	/**
	 * 선택 영역의 최소값과 최대값 계산
	 * 
	 * @param {string}
	 *            idx1 첫번째 버튼 인덱스
	 * @param {string}
	 *            idx2 두번째 버튼 인덱스
	 * @param {string}
	 *            idx3 세번째 버튼 인덱스
	 */
	vc.calculateMinMaxReward = function(idx1, idx2, idx3) {
		// var self = hnro.vc.project;
		// var i, j, len, child, key;
		// var minCase, maxCase, checkSize, exceptSize, hasExceptNum, check,
		// sum, reward;
		// var min = Number.MAX_VALUE;
		// var max = Number.MIN_VALUE;
		// var checkNums = [];
		// var exceptNums = [];
		//		
		// $(".numberButton").each(function(i) {
		// var $this = $(this);
		// var text = $this.text();
		// var index = $this.data("index");
		// var num;
		// if (!!text) {
		// num = parseInt(text);
		// if (index == idx1 ||index == idx2 || index == idx3) {
		// checkNums.push(num);
		// } else {
		// exceptNums.push(num);
		// }
		// }
		// });
		//		
		// checkSize = checkNums.length;
		// if (checkSize === 3) {
		// key = (checkNums[0] + checkNums[1] + checkNums[2]) + "";
		// min = self.REWORD_LIST[key];
		// max = self.REWORD_LIST[key];
		// minCase = checkNums;
		// maxCase = checkNums;
		// } else {
		// exceptSize = exceptNums.length;
		// for (j = 0, len = self.probList.length; j < len; j++) {
		// child = self.probList[j];
		// hasExceptNum = false;
		// for (i = 0; i < exceptSize; i++) {
		// if ($.inArray(exceptNums[i], child) !== -1) {
		// hasExceptNum = true;
		// break;
		// }
		// }
		//				
		// if (hasExceptNum) {
		// continue;
		// }
		//				
		// check = true;
		//				
		// for (i = 0; i < checkSize; i++) {
		// if ($.inArray(checkNums[i], child)) {
		// check = false;
		// break;
		// }
		// }
		//				
		// if (check) {
		// sum = child[0] + child[1] + child[2];
		// reward = self.REWORD_LIST[sum + ""];
		// if (min > reward) {
		// min = reward;
		// minCase = child;
		// }
		// if (max < reward) {
		// max = reward;
		// maxCase = child;
		// }
		// }
		// }
		//			
		// if (min === Number.MAX_VALUE) {
		// min =
		// self.REWORD_LIST[self.REWORD_TOP_LIST[self.REWORD_TOP_LIST.length-1]];
		// minCase = null;
		// }
		//			
		// if (max === Number.MAX_VALUE) {
		// max = self.REWORD_LIST[self.REWORD_TOP_LIST[0]];
		// maxCase = [1,2,3];
		// }
		// }
		//		
		// $("#spanMinCase").text(K.Number(min).formattedCash() + "MGP " +
		// (!!minCase? "[ " + minCase.join(", ") + " ]" : ""));
		// $("#spanMaxCase").text(K.Number(max).formattedCash() + "MGP " +
		// (!!maxCase? "[ " + maxCase.join(", ") + " ]" : ""));
	};
	
	return vc;
}));
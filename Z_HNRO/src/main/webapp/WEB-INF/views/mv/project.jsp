<!--
 *****************************************************************
 * Copyright (c) 2017 HanyangRaon. All Rights Reserved.
 * 
 * Author : kei
 * Create Date : 2017. 1. 16.
 * DESC : 프로젝트 화면
 *****************************************************************
-->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" type="text/css" href="${cp }/css/project.css">

<nav class="sidenav">
	<section>
		<select id="selProject"><option value="/ff14DailyLottery">파판14 일일복권 경우의 수 확인기</option></select>
	</section>
	<button id="btnMoveTop">Top</button>
</nav>

<section id="projectContents">Loading...</section>

<script type="text/javascript" src="${cp }/js/project.js"></script>
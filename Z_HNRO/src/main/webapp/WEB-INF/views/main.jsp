<!--
 *****************************************************************
 * Copyright (c) 2017 HanyangRaon. All Rights Reserved.
 * 
 * Author : kei
 * Create Date : 2017. 1. 5.
 * DESC : 메인화면
 *****************************************************************
-->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>하냥라온</title>
<link rel="stylesheet" type="text/css" href="${cp }/css/main.css">
</head>
<body>
	<header></header>
	<nav>
		<ul>
			<li data-url="/home">Home</li>
			<li data-url="/project">Project</li>
		</ul>
	</nav>
	<section id="contents">Loading...</section>
	<footer></footer>

	<script type="text/javascript">
		/* context path 획득 */
		function getContextPath() {
			return '${cp}';
		}
	</script>
	<script type="text/javascript" src="${cp }/jslibs/jquery/jquery-3.1.1.js"></script>
	<script id="jsHnroK" type="text/javascript" src="${cp }/jslibs/hnro/hnro_k.js"></script>
	<script type="text/javascript" src="${cp }/js/main.js"></script>
</body>
</html>

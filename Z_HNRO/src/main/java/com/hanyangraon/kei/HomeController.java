/*****************************************************************
 * Copyright (c) 2017 HanyangRaon. All Rights Reserved.
 * 
 * Author : kei
 * Create Date : 2017. 1. 5.
 * DESC : 홈 컨트롤러
*****************************************************************/
package com.hanyangraon.kei;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * root 접근시 메인 홈으로 이동
	 * 
	 * @return
	 */
	@RequestMapping(value = "/")
	public String main() {
		return "main";
	}
	
	@RequestMapping(value = "/home")
	public String home() {
		logger.info("call home");
		
		return "mv/home";
	}
}

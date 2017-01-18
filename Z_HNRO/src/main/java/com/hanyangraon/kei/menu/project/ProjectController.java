package com.hanyangraon.kei.menu.project;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/project")
public class ProjectController {
	
	@RequestMapping(value = "")
	public String project() {
		return "mv/project";
	}
	
	/**
	 * 파판14 일일복권 경우의 수 확인기 호출
	 * @return
	 */
	@RequestMapping(value = "/ff14DailyLottery")
	public String ff14DailyLottery() {
		return "mv/project/ff14DailyLottery";
	}
}

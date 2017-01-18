<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" type="text/css" href="${cp }/css/project/ff14DailyLottery.css">

<section class="gridView">
	<section class="gridRow">
		<section class="gridCell width50">
			<section class="gridView gridLayoutFixed">
				<section class="gridRow">
					<section class="gridCell buttonCell">
						<button class="button arrowButton" data-buttons="1,5,9">
							<i class="leftTopToRightDownArrow"></i>
						</button>
					</section>
					<section class="gridCell buttonCell">
						<button class="button arrowButton" data-buttons="1,4,7">
							<i class="topToBottonArrow"></i>
						</button>
					</section>
					<section class="gridCell buttonCell">
						<button class="button arrowButton" data-buttons="2,5,8">
							<i class="topToBottonArrow"></i>
						</button>
					</section>
					<section class="gridCell buttonCell">
						<button class="button arrowButton" data-buttons="3,6,9">
							<i class="topToBottonArrow"></i>
						</button>
					</section>
					<section class="gridCell buttonCell">
						<button class="button arrowButton" data-buttons="3,5,7">
							<i class="rightTopToLeftDownArrow"></i>
						</button>
					</section>
				</section>
				<section class="gridRow">
					<section class="gridCell buttonCell">
						<button class="button arrowButton" data-buttons="1,2,3">
							<i class="leftToRightArrow"></i>
						</button>
					</section>
					<section class="gridCell buttonCell">
						<button class="button numberButton" data-index="1"></button>
					</section>
					<section class="gridCell buttonCell">
						<button class="button numberButton" data-index="2"></button>
					</section>
					<section class="gridCell buttonCell">
						<button class="button numberButton" data-index="3"></button>
					</section>
					<section class="gridCell buttonCell"></section>
				</section>
				<section class="gridRow">
					<section class="gridCell buttonCell">
						<button class="button arrowButton" data-buttons="4,5,6">
							<i class="leftToRightArrow"></i>
						</button>
					</section>
					<section class="gridCell buttonCell">
						<button class="button numberButton" data-index="4"></button>
					</section>
					<section class="gridCell buttonCell">
						<button class="button numberButton" data-index="5"></button>
					</section>
					<section class="gridCell buttonCell">
						<button class="button numberButton" data-index="6"></button>
					</section>
					<section class="gridCell buttonCell"></section>
				</section>
				<section class="gridRow">
					<section class="gridCell buttonCell">
						<button class="button arrowButton" data-buttons="7,8,9">
							<i class="leftToRightArrow"></i>
						</button>
					</section>
					<section class="gridCell buttonCell">
						<button class="button numberButton" data-index="7"></button>
					</section>
					<section class="gridCell buttonCell">
						<button class="button numberButton" data-index="8"></button>
					</section>
					<section class="gridCell buttonCell">
						<button class="button numberButton" data-index="9"></button>
					</section>
					<section class="gridCell buttonCell"></section>
				</section>
			</section>
			<section>
				<p>
					최대값:
					<span id="spanMaxCase">-</span>
				</p>
				<p>
					최소값:
					<span id="spanMinCase">-</span>
				</p>
			</section>
		</section>
		<section class="gridCell width50">
			<section class="gridCell">
				<span>버튼에 입력할 숫자 : </span>
				<input id="inputNumber" type="number" min="1" max="9" />
				<button id="buttonSubmit" class="submit">등록</button>
				<button id="buttonRemove" class="submit">등록값 제거</button>
			</section>
			<section id="showList"></section>
		</section>
	</section>
</section>

<script type="text/javascript" src="${cp }/js/project/ff14DailyLottery.js"></script>


import { StatusIndicatorHandler } from "./StatusIndicatorHandler.js";

// why doesn't this show up on mobile?

export class QuestionHandler {
	constructor(questions){
		this.questions = questions;

		this.sih = new StatusIndicatorHandler(document.getElementById("status-indicator"));

		this.__current = 0;
		this.__correct = 0;

		this.__init__();
	}

	__set__(num){
		this.questions.forEach((q, i) => {
			q.style.display = num == i ? "flex" : "none";
		});
	}
	__init__() {
		this.__set__(this.__current);

		this.correct = this.correct;

		if(!this.questions[this.__current]) return;
		this.questions[this.__current].querySelector("input").focus();
	}

	add(question) {
		this.questions.push(question);

		this.sih.add(event => {
			this.current = parseInt(event.target.getAttribute("data-index"), 10);
		});

		this.__init__();
	}

	get currentQuestion() {
		return this.questions[this.__current];
	}

	get current() {
		return this.__current;
	}
	set current(value){
		if(value >= this.questions.length)
			value = 0;
		if(value < 0)
			value = this.questions.length - 1;

		this.__checkCorrect__();

		this.sih.current = value;

		this.__current = value;
		this.__init__();
	}

	__checkCorrect__(){
		let correct = 0;

		for(let i = 0; i < this.questions.length; i++){
			let question = this.questions[i];
			let q = question.querySelectorAll(".answer");
			q.forEach(c => {
				this.sih.correct[i] = 0;
				if(c.classList.contains("correct")){
					this.sih.correct[i] = 1;

					correct++;
				}
				if(c.classList.contains("almost")){
					this.sih.correct[i] = 0.5;

					correct += 0.5;
				}
			});
		}

		this.correct = correct;
	}

	get totalQuestions(){
		let total = 0;
		this.questions.forEach(q => q.querySelectorAll(".answer").forEach(a => total++));

		return total;
	}

	get correct() {
		return this.__correct;
	}
	set correct(value) {
		this.__correct = value;

		document.getElementById("correct-number").innerText = this.__correct + "/" + this.totalQuestions;
	}
} 

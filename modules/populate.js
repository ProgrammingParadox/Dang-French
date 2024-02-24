
import { createQuestion } from './createQuestion.js';

function removeHintBuddies(){
	document.querySelectorAll('.hint-buddy').forEach(buddy => buddy.remove());
	document.querySelectorAll('.hint-button').forEach(hint => hint.remove());

	document.querySelectorAll('.hint-active').forEach(e => e.classList.remove('hint-active'));
}

function populate(data, questionHandler){
	let parent = document.createDocumentFragment();
	data.forEach((line, i) => {
		let question = createQuestion(line);

		let questionCard = document.createElement("div");
		questionCard.classList.add("question-card");
		questionCard.setAttribute("data-index", i);

		questionCard.appendChild(question);

		let buttons = document.createElement("div");
		buttons.classList.add("buttons");

		let prev = document.createElement("button");
		prev.classList.add("prev-button", "sticky", "button");
		prev.innerText = "Prev";

		prev.addEventListener("click", (event) => {
			removeHintBuddies();
			questionHandler.current -= 1;	
		});

		let next = document.createElement("button");
		next.classList.add("next-button", "sticky", "button");
		next.innerText = "Next";

		next.addEventListener("click", (event) => {
			removeHintBuddies();
			questionHandler.current += 1;	
		});

		buttons.append(prev, next);

		questionCard.appendChild(buttons);

		questionHandler.add(questionCard);

		parent.appendChild(questionCard);
	});

	return parent;
}

export { removeHintBuddies, populate };

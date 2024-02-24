
import { patienceDiffPlus } from './patienceDiff.js';

function createDiff(a, b){
	let d = patienceDiffPlus(a, b).lines;
		
	let r = document.createDocumentFragment();
	
	for(let i = 0; i < d.length; i++) {
		let c = d[i];
	
		let letter = document.createElement("span");
		letter.classList.add("letter");
		letter.textContent = c.line;
		if(i<=d.length-2 && c.bIndex == -1 && d[i+1].aIndex == -1){
			// Wrong letter in b
			letter.classList.add("swap");
	
			i ++;
		} else if(c.bIndex == -1) {
			// missing a letter here
			letter.classList.add("missing");
		} else if(c.aIndex == -1) {
			letter.classList.add("extra");
	
			// has an extra letter
		}
	
		r.append(letter);
	}

	return r;
}

export function createHint(e){
	let hint = document.createElement("button");
	hint.classList.add("hint-button", "tiny", "button", "sticky");
	hint.textContent = "Hint";

	const eBox = e.getBoundingClientRect();

	hint.style.left = eBox.x + "px";
	hint.style.top = (eBox.y + eBox.height + 5) + "px";

	hint.setAttribute("data-x", eBox.x);
	hint.setAttribute("data-y", (eBox.y + eBox.height + 5));

	document.getElementById("hints").append(hint);

	hint.style.zIndex = "20000000000";

	hint.addEventListener("click", event => {
		hint.textContent = e.getAttribute("data-answer");

		e.classList.add("hint-active");

		let hintBuddy = document.createElement("div");
		hintBuddy.classList.add("hint-buddy");
		hintBuddy.style.left = hint.getAttribute("data-x") + "px";
		hintBuddy.style.top = hint.getAttribute("data-y") + "px";

		hintBuddy.style.zIndex = "20000";

		let hintBuddyText = document.createElement("div");
		hintBuddyText.classList.add("hint-buddy-text");

		let hintBuddyDiff = createDiff(e.getAttribute("data-answer"), e.value);
		
		hintBuddyText.append(hintBuddyDiff);

		let closeButton = document.createElement("button");
		closeButton.classList.add("tiny", "button", "sticky", "hint-buddy-close");
		closeButton.textContent = "Close";

		closeButton.addEventListener("click", event => {
			//createHint(e);
			e.classList.remove("hint-active");
			
			e.focus();
			hintBuddy.remove();
		});

		e.addEventListener("input", event => {
			let diff = createDiff(e.getAttribute("data-answer"), e.value);
			while(hintBuddyText.children.length){
				hintBuddyText.removeChild(hintBuddyText.children[0]);
			}
			hintBuddyText.append(diff);
		});

		hintBuddy.append(hintBuddyText, closeButton);

		hint.replaceWith(hintBuddy);

		//hintt.target.a
	});

	e.addEventListener("blur", event => {
		hint.matches(":hover") || hint.remove();
	});
}

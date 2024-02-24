
export const lineRegex = /\[(?<answer>[^\]]*)\](\((?<hint>[^)]*)\))?/g;
export const splitLineRegex = /\[[^\]]*\](?:\([^)]*\))?/g;
export function createQuestion(line){
	let lines = [];

	let cur;
	let ind = 0;
	while((cur = lineRegex.exec(line)) !== null && ind++ < 1000){
		lines.push({"index": lineRegex.index, ...cur.groups});
	}

	let question = document.createElement("div");
	question.classList.add("question");

	let inputs = lines.map(line => {
		let input = document.createElement("input");
		input.classList.add("answer");

		line.hint ??= "";

		input.setAttribute("placeholder", line.hint);
		input.setAttribute("data-answer", line.answer);

		input.addEventListener("input", (event) => {
			let c = event.target;

			let a = c.getAttribute("data-answer");
			if(a === c.value) {
				c.classList.add("correct");
			} else {
				c.classList.remove("correct");

				if(a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === c.value) {
					c.classList.add("almost");
				} else {
					c.classList.remove("almost");
				}
			}
		})

		return input;
	});

	let split = line.split(splitLineRegex);

	let elements = [];

	for(let i = 0; i<split.length; i++){
		let s = document.createElement("span");
		s.innerText = split[i];

		if(split[i]) elements.push(s);
		if(inputs[i]) elements.push(inputs[i]);
	}

	question.append(...elements);

	return question;
}

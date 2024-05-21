
export class StatusIndicatorHandler {
	constructor(statusIndicator) {
		this.statusIndicator = statusIndicator;

		this.__current = 0;

		//this.indicatorFunctions = [];
		this.correct = [];
		this.indicatorElements = [];
	}

	get current(){
		return this.__current;
	}
	set current(value){
		//this.statusIndicator.scrollTo
		this.__current = value;
		this.__update__();
	}

	__update__() {
		this.indicatorElements.forEach((e, i) => {
			if(i == this.current){
				e.classList.add("active");
			} else {
				e.classList.remove("active");
			}	

			if(this.correct[i] == 1){
				e.classList.add("correct");
			} else {
				e.classList.remove("correct");
			}
			if(this.correct[i] == 0.5){
				e.classList.add("almost");
			} else {
				e.classList.remove("almost");
			}
		});
	}

	add(callback) {
		//this.indicatorFunctions.push(callback);

		let e = document.createElement("div");
		e.classList.add("status-indicator-element");
		e.setAttribute("data-index", this.indicatorElements.length);

		e.addEventListener("click", (event) => {
			callback(event);
		});

		this.indicatorElements.push(e);
		this.statusIndicator.append(e);

		this.__update__();
	}
}

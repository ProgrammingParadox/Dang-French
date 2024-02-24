
import anime from "./anime.es.js";

export function interactivify(element, x, y){
	let rect = element.getBoundingClientRect();

	let [ox, oy] = [
		parseInt(element.getAttribute("data-x") ?? 0, 10) ?? 0, 
		parseInt(element.getAttribute("data-y") ?? 0, 10) ?? 0
	];

	let cx = rect.left + rect.width / 2;
	let cy = rect.top + rect.height / 2;

	let bx = parseInt(element.style.top, 10);
	let by = parseInt(element.style.left, 10);

	// https://stackoverflow.com/questions/5254838/calculating-distance-between-a-point-and-a-rectangular-box-nearest-point
	let dx = Math.max(rect.left - x, 0, x - (rect.left + rect.width));
	let dy = Math.max(rect.top - y, 0, y - (rect.top + rect.height));
	let dist = Math.sqrt(dx*dx + dy*dy);

	//let dist = Math.sqrt((x - cx)**2 + (y - cy)**2);

	if(dist < 1) {
		anime({
			targets: element,
			
			translateY: `+=${((y - cy)/10)}`,
			translateX: `+=${((x - cx)/10)}`,

			easing: "easeOutExpo",
		});
	} else {
		anime({
			targets: element,

			easing: "easeOutExpo",
		});
	}
}

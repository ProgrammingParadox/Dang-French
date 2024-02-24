
export function stickify(button, x, y){
	let rect = button.getBoundingClientRect();

	let [ox, oy] = [
		parseInt(button.getAttribute("data-x") ?? 0, 10) ?? 0, 
		parseInt(button.getAttribute("data-y") ?? 0, 10) ?? 0
	];

	let background = button.getAttribute("data-bg-opacity") ?? 0.5;

	let cx = rect.left + rect.width / 2;
	let cy = rect.top + rect.height / 2;

	let bx = parseInt(button.style.top, 10);
	let by = parseInt(button.style.left, 10);

	// https://stackoverflow.com/questions/5254838/calculating-distance-between-a-point-and-a-rectangular-box-nearest-point
	let dx = Math.max(rect.left - x, 0, x - (rect.left + rect.width));
	let dy = Math.max(rect.top - y, 0, y - (rect.top + rect.height));
	let dist = Math.sqrt(dx*dx + dy*dy);

	// let dist = Math.sqrt((x - cx)**2 + (y - cy)**2);

	if(dist < 1) {
		//button.style.top = `${oy + ((y - cy)/4)}px`;
		//button.style.left = `${ox + ((x - cx)/4)}px`;

		//button.style.translateX = `${(x - cx)/4}px`;
		//button.style.translateY = `${(y - cy)/4}px`;

		//button.style.translateX = "100%";

		button.style.transform = `scale(1.05) translateX(${(x - cx)/4}px) translateY(${(y-cy)/4}px) rotateY(${(cx-x) * -(1/rect.width)*40}deg) rotateX(${(cy-y) * (1/rect.height)*40}deg)`;
		//button.style.transform = `scale(1.05)`;
		
		button.style.background = `rgba(242, 250, 255, ${background + 0.2})`;
	} else {
		//button.style.top = oy + "px";
		//button.style.left = ox + "px";

		button.style.transform = "scale(1)";

		button.style.background = `rgba(242, 250, 255, ${background})`;
	}
}

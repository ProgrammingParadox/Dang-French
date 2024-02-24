import anime from './modules/anime.es.js';

import { stickify } from './modules/stickify.js';
import { interactivify } from './modules/interactive.js';

function breakChars(text){
	let letters = document.createDocumentFragment();
	for(let i = 0; i<text.textContent.length; i++){
		let l = document.createElement("span");
		l.textContent = text.textContent[i];
		l.classList.add("aletter");

		letters.appendChild(l);
	}

	text.replaceWith(letters);
}

breakChars(document.getElementById("showcase-text-1"));

let bl = anime.timeline({
	targets: "#showcase"
});
bl.add({
	background: "linear-gradient(100deg, rgba(61,255,116,1) 0%, rgba(61,173,255,1) 50%, rgba(205,0,255,1) 100%)"
});

let tl = anime.timeline({
	targets: ".aletter",
});
tl.add({
	translateY: ["100%", "0%"],

	opacity: [0, 1],

	delay: anime.stagger(50, {from: "center"}),
})
.add({
	textShadow: "0 0.03em 1em rgba(0, 0, 0, 0.2)",
	scale: "1.1",
	rotateZ: (e, i) => (Math.random() - 0.5) * 20,

	translateY: (e, i) => Math.random() * -20,
	
	delay: anime.stagger(50),

	complete: () => {
		[...document.getElementsByClassName("aletter")].forEach(x => x.classList.add("interactive"));
	}
})
.add({
	targets: "#showcase-start",
	opacity: 0.7,
	top: "70%",

	duration: 1000,

	easing: "easeOutExpo",
}, "-=2000")
.add({
	targets: "#bar",
	opacity: 1,
	duration: 1000,

	top: "0px",

	easing: "easeOutExpo",
}, "-=2000")
.add({targets: ""});

let start = document.getElementById("showcase-start-text");

start.addEventListener("click", () => {
	[...document.getElementsByClassName("aletter")].forEach(x => x.classList.remove("interactive"));

  let b = document.getElementById('learn-example-button');
	b.style.display = "block";
	
	let l = anime.timeline({
		targets: ".aletter",
	});
	l.add({
		translateY: "-100%",
		
		opacity: 0,

		delay: anime.stagger(50, {from:"center"}),

		easing: "easeOutExpo",

		complete: () => [...document.getElementsByClassName("aletter")].forEach(x => x.remove()),
	})
	.add({
		targets: "#showcase-start-text",

		opacity: 0,
		translateY: "100%",
		easing: "easeOutExpo",

		complete: () => {
			let scrollMagic = anime.timeline();
			scrollMagic.add({
				targets: "#learn-text-1",
				opacity: 1,
				translateY: ["100%", "0%"],
			})
			.add({
				targets: "#learn-text-1-hard",

				rotateZ: ["0deg", "32deg"],
				translateY: ["0em", "0.9em"],
				translateX: "0.5em",

				color: "#F11",
			}, "-=50")
			.add({
				targets: "#learn-text-1-hard",
				
				rotateZ: "0deg",
				translateY: "0em",
				translateX: "0em",

				duration: 1000,
			})
			.add({
				targets: "#learn-text-2",
				opacity: 1,
				translateY: ["100%", "0%"],
			}, "-=1000")
				.add({
					targets: "#learn-text-2-paywalls",
					scale: [1, 1.1, 1],
					rotateZ: ["0deg", "32deg", "-32deg", "0deg"],
					color: ["#FFF", "#1F1"],
	
					easing: "easeOutExpo",
				})
				.add({
					targets: "#learn-text-2-uneffective",
					scale: [1, 0.9, 1],
					rotateZ: "-5deg",
					color: ["#FFF", "#DDA"],
	
					easing: "easeOutExpo",
				})
				.add({
					targets: "#learn-text-2-uneffective",
					rotateZ: 0,

					duration: 1000,
					
					easing: "easeOutExpo",
				})
			.add({
				targets: "#learn-text-3",
				opacity: 1,
				translateY: ["100%", "0%"],
			}, "-=1000")
			.add({
				targets: "#learn-text-4",
				opacity: 1,
				rotateZ: "10deg",
				scale: 2,
				
				translateY: ["100%", "0%"],
			}, "+=1000")
			.add({
				targets: "#learn-example-button",
				opacity: 1,
				translateY: ["100%", "0%"],

				marginTop: "10%",
			}, "+=1000");
		}
	}, "-=2000")

	
});

window.addEventListener("mousemove", (event) => {
	let x = event.clientX;
	let y = event.clientY;

	let buttons = document.querySelectorAll(".sticky");
	let interactive = document.querySelectorAll(".interactive");

	buttons.forEach(b => stickify(b, x, y));
	interactive.forEach(b => interactivify(b, x, y));
});
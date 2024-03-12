
// TODO: accent helpers, homepage, editor and loader (loader done), different hints maybe?, fix progress indicator, timer
// dang bugs

// I'm beginning to question the authority the TODO list has over me.
// How much do I really need from 

import { stickify } from './modules/stickify.js';
import { QuestionHandler } from './modules/QuestionHandler.js';
import { removeHintBuddies, populate } from './modules/populate.js';
import { createHint } from './modules/createHint.js';

let questionHandler = new QuestionHandler([]);

function makeTimer(element){
	let time = new Date();
	
	let timerInterval = setInterval(() => {
		element.innerHTML = (new Date()) - time;
	}, 1);
	
	return timerInterval;
}
//makeTimer(document.getElementById('timer'));

/*
let words = [
	["grand", "grow"], 
	["vieill", "grow old"], 
	["gross", "gain weight"],
	["maigr", "lose weight"],
	["obé", "obey"],
	["réag", "react"],
	["réfléch", "reflect"],
	["réuss", "to succeed"],
	["roug", "to blush"]
];
let endings = [
	["Je", "is"],
	["Tu", "is"],
	["Il/Elle/On", "it"],
	["Nous", "issons"],
	["Vous", "issez"],
	["Ils/Elles", "issent"]
];

let construct = [];
for(let i = 0; i < words.length; i++){
	for(let j = 0; j < endings.length; j++){
		construct.push(`${endings[j][0]} [${words[i][0] + endings[j][1]}](${words[i][1]})`);
	}
}

console.log(construct);
*/

function getSet(name){
	return fetch(`./sets/${name}.json`).then(r => r.json());
}
function load(name, g=getSet){
	return g(name)
		.then(set => {
			const questions = set.questions;
			const name = set.name;

			document.getElementById("name").textContent = name; 
			document.getElementById("questions").append(populate(questions, questionHandler));
		
			return set;
		});
}

function createHintListeners(){
	let inputs = [...document.querySelectorAll(".answer")];

	inputs.forEach(input => {
		input.addEventListener("focusin", event => {
			const target = event.target;
			
			target.classList.contains("hint-active") || createHint(target);
		});
	});
}

load("test-1")
load("irverbs")
load("more-french")
	.then(createHintListeners);

let loadElement = document.getElementById("file");

let loadButton = document.getElementById("load-button");
loadButton.addEventListener("click", event => {
	loadElement.click();
});

function closeOverlay(){
	document.getElementById("overlay").style.display = "none";
}
function openOverlay(){
	document.getElementById("overlay").style.display = "grid";

	let p = document.getElementById("load-preview");
	!p || p.remove();
}

let inputButton = document.getElementById("input-button");
inputButton.addEventListener("click", event => {
	openOverlay();
});

let cancel = document.getElementById("load-overlay-cancel");
cancel.addEventListener("click", event => {
	closeOverlay();
});
loadElement.addEventListener("change", event => {
	let file = event.target.files[0];

	let preview = document.getElementById("load-preview");
	if(preview)
		while (preview.firstChild) {
			preview.removeChild(preview.firstChild);
		}

	preview = document.createElement("div");
	preview.id = "load-preview";

	preview.innerText = file.name;	

	document.getElementById("load-overlay").append(preview);

	let confirm = document.getElementById("load-overlay-confirm");
	confirm.addEventListener("click", event => {
		let src = URL.createObjectURL(file);

		let questions = document.getElementById("questions");
		while(questions.firstChild) questions.firstChild.remove();

		let statusIndicator = document.getElementById("status-indicator");
		while(statusIndicator.firstChild) statusIndicator.firstChild.remove();

		questionHandler = new QuestionHandler([]);

		load(src, _=>fetch(_).then(_=>_.json()))
			.then(createHintListeners);

		closeOverlay();
	});
});

window.addEventListener("keydown", (event) => {
	if(event.keyCode == 13){
		removeHintBuddies();
		questionHandler.current += 1;
	}
});
window.addEventListener("mousemove", (event) => {
	let x = event.clientX;
	let y = event.clientY;

	let buttons = document.querySelectorAll(".sticky");

	buttons.forEach(b => stickify(b, x, y));
});


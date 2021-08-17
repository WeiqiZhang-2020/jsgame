const halloClass = document.querySelector(".hallo");
const myButton = document.querySelector("input[type = button]");
let mySwitch = 0;
let counter =0;
let targetId =0;
let range =[];
let winCounter =0;
let myNames =[];
let matches =[];
let stateMatches =[];
let html;
let htmlForState;
const stateName =['WA','NA','DS','BC','TG','OL','GG','OP','LK','CC','UL'];
setInterval(() => {
	if(mySwitch === 0){
		halloClass.style.color = "rgb(" + randomNumber()+","+ randomNumber() + "," +randomNumber()+ ")";
		myButton.value = "pause"
	} else{
		myButton.value = "resume"
	};
},100);

myButton.addEventListener("click", function(e){
   mySwitch = (mySwitch === 0)? 1:0; 
})
const randomNumber = () => Math.floor(Math.random()*254);


// game part
const allTheBox = document.querySelectorAll(".game-box");
const gameBoxClass = document.querySelector("table");

function mysetid(){
	for(row = 1; row <4; row++ ){
		for(col = 1; col <4; col++ ){
			allTheBox[counter].setAttribute("id",row+""+""+col);
			range[counter]=row*10+col;
			counter++;
		}
	}

}

gameBoxClass.addEventListener("click",function(e){
	//  console.log(e.target.id);
	if(e.target.className === "game-box"){
		e.target.innerHTML=(e.target.innerHTML === 'M')? "": "M";
		targetId = Number(e.target.id);
		idChecker(targetId+10);
		idChecker(targetId-10);
		idChecker(targetId+1);
		idChecker(targetId-1);
	}
	if(winChecker()){
		alert("you win")
	}
});

function winChecker(e){
	winCounter = 0;
   for (x of allTheBox){
	   if (x.innerHTML === "M"){
		   winCounter++;
	   }
   }
   if (winCounter === 9){
	   return true;
   }else return false;

}

function showM(e){
	e = (e === 'M')? "": "M";
	return e;
}
function idChecker(e){
	if(range.includes(e)){
		let position = document.getElementById(''+(e)).innerHTML;
		document.getElementById(''+(e)).innerHTML = showM(position);
	}
}


//auto fill

const search = document.getElementById('pokemon-name');
const stateSearch = document.getElementById('state-name');
const htmlResults = document.querySelector(".result ul");
const stateResults = document.querySelector(".state-result ul");

const setArray = async () => {
	const myResponse = fetch('https://pokeapi.co/api/v2/pokemon/?limit=70')
	.then(res => res.json())
	.then(value => {
		for (let x in value.results){
			if(!myNames.includes(value.results[x].name)){
				myNames.push(value.results[x].name);
			}
		}
	});
}
const searchStatus =searchText => {
	matches = myNames.sort().filter(name => {
		return name.toLowerCase().includes(searchText)&& (name.slice(0,1) === searchText.slice(0,1));
	});
if (searchText.length === 0){
	matches = [];
}
	outputHtml(matches);
}

const state =searchText => {
	stateMatches = stateName.sort().filter(name => {
		return name.includes(searchText);
	});
if (searchText.length === 0){
	stateMatches = [];
}
	outputHtml2(stateMatches);
}
const outputHtml2 = arr => {
	console.log(arr);
	if (arr.length > 0){
		htmlForState = arr.map(output =>(`
				<div>${output}</div>`)).join('');
	}
	console.log(htmlForState);
	if(arr.length === 0){
		stateResults.innerHTML = '';
	}else{
		stateResults.innerHTML = htmlForState;
	}
}

const outputHtml = arr => {
	
	if (arr.length > 0){
		 html = arr.map(output =>(`
				<div>${output}</div>`)).join('');
	}
	if(arr.length === 0){
		htmlResults.innerHTML = '';
	}else{
	htmlResults.innerHTML = html;
	}
}
search.addEventListener('input',() => searchStatus(search.value));
stateSearch.addEventListener('input',() => state(stateSearch.value));
mysetid();
setArray();

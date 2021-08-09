const halloClass = document.querySelector(".hallo");
const myButton = document.querySelector("input[type = button]");
let mySwitch = 0;
let counter =0;
let targetId =  0;
let range = [];
let winCounter = 0;
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
mysetid();
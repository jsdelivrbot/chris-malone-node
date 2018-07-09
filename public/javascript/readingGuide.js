function eventListeners() {
	document.getElementById("buttonLoadLogin").addEventListener('click', loadLoginForm);
	document.getElementById("buttonLoadRegister").addEventListener('click', loadRegisterForm);
	document.getElementById("buttonLoadLogin").addEventListener('click', hideRegisterForm);
	document.getElementById("buttonLoadRegister").addEventListener('click', hideLoginForm);

	document.getElementById("debugToggleLogin").addEventListener('click', debugToggleLogin);

	var daysClass = document.getElementsByClassName('days');

	for (var i = daysClass.length - 1; i >= 0; i--) {
		daysClass[i].addEventListener('click', loadDay);
	}

	//printWords();

	if(document.getElementById('selectedDay').innerHTML == "Select a Day") {
		disableNotes();
	} else {
		enableNotes();
	}
}
/***********************************
* LOAD SCRIPTURES
***********************************/
// function loadOldTestament() {
// 	console.log("runs");
// 	//document.getElementById('otdays').style.display = "block";
// }

function loadOT() {
	document.getElementById('dayList').style.display = "none";
	document.getElementById('ntdays').style.display = "none";
	document.getElementById('otdays').style.display = "block";
	document.getElementById('bomdays').style.display = "none";
	document.getElementById('dncdays').style.display = "none";
}

function loadNT() {
	document.getElementById('dayList').style.display = "none";
	document.getElementById('ntdays').style.display = "block";
	document.getElementById('otdays').style.display = "none";
	document.getElementById('bomdays').style.display = "none";
	document.getElementById('dncdays').style.display = "none";
}

function loadBoM() {
	document.getElementById('dayList').style.display = "none";
	document.getElementById('ntdays').style.display = "none";
	document.getElementById('otdays').style.display = "none";
	document.getElementById('bomdays').style.display = "block";
	document.getElementById('dncdays').style.display = "none";
}

function loadDnC() {
	document.getElementById('dayList').style.display = "none";
	document.getElementById('ntdays').style.display = "none";
	document.getElementById('otdays').style.display = "none";
	document.getElementById('bomdays').style.display = "none";
	document.getElementById('dncdays').style.display = "block";
}

function loadDay(x) {
	enableNotes();
	document.getElementById('selectedDay').innerHTML = x.target.dataset.content;
	console.log(x.target.dataset.content);
}

function enableNotes() {
	document.getElementById('notepad').disabled = false;
	document.getElementById('notepad').placeholder = "Write Notes Here";
	document.getElementById('notepad').style.backgroundColor = "lightyellow";
}

function disableNotes() {
	document.getElementById('notepad').disabled = true;
	document.getElementById('notepad').placeholder = "Select a Day to Take Notes";
	document.getElementById('notepad').style.backgroundColor = "lightgrey";
}

function loadLoginForm() {
	document.getElementById("loginForm").style.display = "block";
}

function loadRegisterForm() {
	document.getElementById("registerForm").style.display = "block";
}

function hideLoginForm() {
	document.getElementById("loginForm").style.display = "none";
}

function hideRegisterForm() {
	document.getElementById("registerForm").style.display = "none";
}

function debugToggleLogin() {
	if (document.getElementById('loginDiv').style.display != "none") {
		document.getElementById('loginDiv').style.display = "none";
	}
	else
		document.getElementById('loginDiv').style.display = "block";


	if (document.getElementById('noteArea').style.display != "none") {
		document.getElementById('noteArea').style.display = "none";
	}
	else
		document.getElementById('noteArea').style.display = "block";
}
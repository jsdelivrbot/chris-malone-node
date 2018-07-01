function eventListeners() {
	document.getElementById("buttonLoadLogin").addEventListener('click', loadLoginForm);
	document.getElementById("buttonLoadRegister").addEventListener('click', loadRegisterForm);
	document.getElementById("buttonLoadLogin").addEventListener('click', hideRegisterForm);
	document.getElementById("buttonLoadRegister").addEventListener('click', hideLoginForm);

	document.getElementById("debugToggleLogin").addEventListener('click', debugToggleLogin);
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

function loadOldTestament() {
	dayList = document.getElementById('dayList');
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
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
	loadNote(x);
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

function saveNote(e) {
	console.log("SAVING NOTE");
	localStorage.setItem(document.getElementById("selectedDay").innerHTML, document.getElementById("notepad").value);
	hotsnackbar(false, "Saved Note");
}

function loadNote(e) {
	console.log("LOADING NOTE");
	var noteContent = localStorage.getItem(document.getElementById("selectedDay").innerHTML);
	document.getElementById("notepad").value = noteContent;
	if (document.getElementById("notepad").value == "") {
		hotsnackbar(false, "No Notes Saved");
	}
	else {
		hotsnackbar(false, "Loaded Note");
	}
}

function copyText() {
	var copyText = document.getElementById("notepad");

	copyText.select();

	document.execCommand("copy");

	hotsnackbar(false, "Note Copied to Clipboard");
};



/////////////////////SNACKBAR//////////////////////////
		var prev_id = 0;
		var timouthsdiv = 0;
		var hstimout =2000;
		var signtext = {
			hsdone: '✔',
			hswarning: '❗',
			hserror: '✖',
			hsheart: '❤',
			hssad: '☹'
		};

		function removehs(random_idx, prev_idx, signx, textx) {

			clearTimeout(timouthsdiv);
			document.getElementById(prev_idx).className += " hsdivhide";
			
			prev_id = 0;
			makehs(random_idx, signx, textx);

		}

		function makehs(random_idx, signx, textx) {

			var hsdiv = document.createElement('div');

			var signdiv = document.createElement('span');
			if (signx) {
				// alert(sign);
				signdiv.className = signx;
				signdiv.innerHTML = signtext[signx];
			}
			hsdiv.appendChild(signdiv);

			var hstext = document.createElement('span');
			hstext.className = 'hstext';
			hstext.innerHTML = textx;
			hsdiv.appendChild(hstext);

			hsdiv.id = random_idx;
			hsdiv.className = 'hsdivinit';


			document.getElementsByTagName('body')[0].appendChild(hsdiv);
			var currenths = document.getElementById(random_idx);
			currenths.className += " hsdivshow";
			prev_id = random_idx;
			timouthsdiv = setTimeout(function () {
				currenths.className += " hsdivhide";
				prev_id = 0;
			}, hstimout);

		}



		function hotsnackbar(sign, text) {

			random_id = Math.random();

			if (prev_id) {

				removehs(random_id, prev_id, sign, text);

			} else {

				makehs(random_id, sign, text);
			}
		}

//////////////////////////////////////////////////////////
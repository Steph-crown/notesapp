window.addEventListener("load", start, false)



function start()
{
	/*
	A function that is called when the window loads
	*/
	
	//Sets styles and content
	document.getElementById('clearButton').style.display = 'flex'
	document.getElementById('container').innerHTML = "";
	document.getElementById('add').style.display = "inherit";
	
	//Causes animation-like transition
	window.setTimeout(function(){document.getElementById('body').style.opacity = "0.5";window.setTimeout(function(){document.getElementById('body').style.opacity="1"},100)}, 100)
	
	//sets style and content
	document.getElementById('title').innerHTML = "<h1>All Notes</h1>"
	document.getElementById('head').style.height = "4vh";
	
	//If there is no content in local storage(i.e. no notes)
	if(localStorage.length < 1)
	{
		document.getElementById('container').innerHTML = "<h4>No notes<br>Click + to add items</h4>";
	}
	else
	{
		displayNotes()
	}
}

function switchTheme()
{
	/*A function to toggle between dark and light mode
	*/
	body = document.getElementById('body')
	container = document.getElementById('container')
	
	//If already on lightmode
	if (body.style.backgroundColor == "white")
	{
		//Turns to dark mode
		body.style.backgroundColor="black";
		container.style.background = "black";
		body.style.color="white";
	}
	
	//Otherwise
	else
	{
		//Turns to light mode
		body.style.backgroundColor = "white";
		container.style.background = "white";
		body.style.color="black";
	}
}

function displayNotes()
{
	/*
	A function to display notes saved in local storage
	*/
	
	//Initializes variables
	length = localStorage.length
	var name = new Array()
	var describe = new Array()
	
	//Iterates through length of local storage
	for (var i=0; i < length; i++)
	{
		//Gets key and value
		name[i] = localStorage.key(i)
		describe[i] = localStorage.getItem(name[i])
	}
	
	//Creates a markup of the list of notes to be displayed
	var markup = "<ul>"
	for (i in name)
	{
		markup += "<li id= '" + name[i] + "' onclick = edit(this)>"+
						"<div class='listHead'>"+
							"<div><h2>" + name[i].toUpperCase() + "</h2></div>" +
							"<div class='buttons'>"+
								"<div id='" + name[i] + "' onclick = 'editTag(id)' class='press'>Click To View and Edit or delete</div>" +
							"</div>" +
						"</div>"+
						"<div><p>" + describe[i].substring(0,150) + "<p style='color:grey'>...</p>" + "<p></div>"+
					"</li>"
	}
	markup += "</ul>"
	
	//Displays the markup
	document.getElementById('container').style.display = 'block';
	document.getElementById('container').innerHTML = markup	
}



function addNote()
{
	/*
	A function to add new notes
	*/
	
	//Sets style and of new page to be rendered and remobes previous content
	document.getElementById('clearButton').style.display = "none";
	document.getElementById('add').style.display = "none";
	window.setTimeout(function(){document.getElementById('body').style.opacity = "0.5";window.setTimeout(function(){document.getElementById('body').style.opacity="1"},100)}, 100)
	document.getElementById('container').innerHTML = "";
	document.getElementById('title').innerHTML = "<h1>New Note</h1>"
	document.getElementById('head').style.height = "0vh";
	
	//Creates markup for the page
	markup = "<p id='save' onClick='saveNote()'>&#10004;</p>"+
				"<p id='back' onclick = 'goBack()'>&#10006;</p>"+
				"<form>"+
				"<label id='label'><p>NOTE TITLE</p>"+
					"<input type='text' id='textTitle' onfocus = 'myFunction(this)' placeholder='Type title of note'>"+
				"</label>"+
				"<textarea id='text' placeholder ='Start writing'></textarea>"+
				"</form>"
				
	//Displays the markup
	document.getElementById('container').innerHTML = markup;
}


function saveNote()
{
	/*
	 A function to save newly added or edited task
	 */
	 
	//Ensures that the browser supports local storage
	if (typeof(Storage) == "undefined"){document.writeln("<h1 style='color:red'>Sorry No web storage support</h1>")}
	else
	{
		//Initialize variables
		var textTitle = document.getElementById('textTitle');
		var text = document.getElementById('text');
		
		//If any of the text box is empty when function is called
		if (!textTitle.value || !text.value)
		{
			//Raises an alert to error
			alert('Please add Title and task description');
		}
		
		//Otherwise
		else
		{	
		
			//Stores the values and sets their new  content to an empty string
			localStorage.setItem(textTitle.value, text.value);
			textTitle.value = ""
			text.value = ""
			start()
		}
		
	}
}

function goBack()
{
	/*
	A function called to go back to landing page of app
	*/
	start()
}


function myFunction(x)
{
	/*fancy function*/
	x.style.borderBottom = "1px solid grey";
}


function clearAllNow()
{
	/*
	Clears the local storage
	*/
	localStorage.clear()
	start()
}
function edit(x)
{
	/*
	A function to edit values stored in local storage
	*/
	addNote()
	var textTitle = document.getElementById('textTitle')
	textTitle.value = x.id;
	var text = document.getElementById('text')
	text.value = localStorage.getItem(x.id)
	document.getElementById('title').innerHTML = "<i class='fa fa-trash-o' style='font-size:200%; color : var(--main-color)' onclick=deleteNow(textTitle.value)></i>"
	document.getElementById('save').onclick = function(){deleteText(x.id);x.id = textTitle.value;saveNote();start();}
}

function deleteText(x)
{
	/*Removes a particular key:value pair*/
	localStorage.removeItem(x)
}

function deleteNow(x)
{
	/*Removes a particular key:value pair and goes to he page*/
	localStorage.removeItem(x);start();
}
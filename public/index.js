
// player
var playerSelection = document.getElementsByClassName("listen-live");

for(var i = 0; i < playerSelection.length; i++) {
    playerSelection[i].addEventListener("click", function openPlayer(s){
        window.open("http://streamdb3web.securenetsystems.net/v5/"+encodeURI(s),"Player","height=630,width=940,modal=yes,alwaysRaised=yes"
        )});   
}

// phone number validation
function validatePhone(input) {
    // validation regex
    var validNum = /^(\(?[0-9]{3}\)?)((\s|\-){1})?[0-9]{3}((\s|\-){1})?[0-9]{4}$/;
    if(input.value.match(validNum)) {
        return true;
    } else {
        alert("Number invalid. Please check format.");
        return false;
    }
}

function submitForm(event){
    var vendorNum = document.getElementById("attendeePhone");
    if(!validatePhone(vendorNum)){
        event.preventDefault();
    } 
}



// URL Validation add http to URL form
var urlInput = document.getElementById("attendeeURL")
function check_url(input){
    //Get input value
    var input_value = input.value;
	//Set input value to lower case so HTTP or HtTp become http
	input_value = input_value.toLowerCase();
    
    //Check if string starts with http:// or https://
    var regExr = /^(http:|https:)\/\/.*$/m;
    
    //Test expression
    var result = regExr.test(input_value);
	
	//If http:// or https:// is not present add http:// before user input
    if (!result){
		var new_value = "http://"+input_value;
		input.value=new_value;
    }
}
// set new URL
document.getElementById("attendeeURL").innerHTML = check_url(urlInput);

// popup form
function popUpForm(){
    document.getElementById('contactForm').style.display = "block";
}

function hideForm(){
    document.getElementById('contactForm').style.display = "none";
}

function handlePopUp(){
    if (document.getElementById('contactForm').style.display == "block"){
            hideForm();
    } else {
        popUpForm();
    }
    
}

// Contact Form
var contactForm = document.getElementById("contactForm");

function submitContactForm(form) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("post", form.action, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify({ name: form.name.value, email: form.email.value, message: form.message.value }));
	
    xmlhttp.onload = () => {
        console.log(xmlhttp.responseText);
    }
}




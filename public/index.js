// player
var playerSelection = document.getElementsByClassName("listen-live");

for(var i = 0; i < playerSelection.length; i++) {
    playerSelection[i].addEventListener("click", function openPlayer(s){
        window.open("http://streamdb3web.securenetsystems.net/v5/"+encodeURI(s),"Player","height=630,width=940,modal=yes,alwaysRaised=yes"
        )});   
}


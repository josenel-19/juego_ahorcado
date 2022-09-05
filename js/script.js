let pantalla = document.querySelector("canvas"); //300 x 400
let pincel = pantalla.getContext("2d");

let palabrasSecretas = ["PROGRAMA","JUEGO","WEB","FINAL","SCRIPT","ESTILO","ETIQUETA","EVENTO","LINEA","CODIGO"];
let palabraSorteada = "";

function dibujarHorca(){
    //dibujando horca
    pincel.fillStyle = "#8B4A0A";
    pincel.fillRect(0,395,300,5); // coordenada x, coordenada y, tamaño x, tamaño y 
    pincel.fillRect(75,5,5,390); 
    pincel.fillRect(75,5,150,5);
    pincel.fillRect(220,5,5,70); 

    //dibujando cabeza
    pincel.fillStyle = "blue";
    pincel.beginPath(); //inicia nueva ruta de dibujo
    pincel.arc(220,100, 25, 0, 2*3.14 ); //coordenas x, coordenada y, radio, constante 0, constante pi)
    pincel.fill();
    pincel.fillStyle = "white";
    pincel.beginPath();
    pincel.arc(220,100, 20, 0, 2*3.14 ); //coordenas x, coordenada y, radio, constante 0, constante pi)
    pincel.fill();

    //dibujando tronco
    pincel.fillStyle = "blue";
    pincel.fillRect(220,125,5,150);

    //dibujando brazo izquierdo
    pincel.beginPath();
    pincel.moveTo(225,150);
    pincel.lineTo(180,205);
    pincel.lineTo(185,205);
    pincel.fill();
    pincel.beginPath();
    pincel.moveTo(180,205);
    pincel.lineTo(220,150);
    pincel.lineTo(225,150);
    pincel.fill();
    //dibujando brazo derecho
    pincel.beginPath();
    pincel.moveTo(225,150);
    pincel.lineTo(270,205);
    pincel.lineTo(275,205);
    pincel.fill();
    pincel.beginPath();
    pincel.moveTo(270,205);
    pincel.lineTo(220,150);
    pincel.lineTo(225,150);
    pincel.fill();
    //dibujando pierna izquierda
    pincel.beginPath();
    pincel.moveTo(225,275);
    pincel.lineTo(180,330);
    pincel.lineTo(185,330);
    pincel.fill();
    pincel.beginPath();
    pincel.moveTo(180,330);
    pincel.lineTo(220,275);
    pincel.lineTo(225,275);
    pincel.fill();
    //dibujando pierna derecha
    pincel.beginPath();
    pincel.moveTo(225,275);
    pincel.lineTo(270,330);
    pincel.lineTo(275,330);
    pincel.fill();
    pincel.beginPath();
    pincel.moveTo(270,330);
    pincel.lineTo(220,275);
    pincel.lineTo(225,275);
    pincel.fill();
	
    document.write("hola");
}

function capturandoClick (evento){       
    let posX = evento.x - pantalla.offsetLeft;
    let posY = evento.y - pantalla.offsetTop; 
    console.log(posX + "," + posY);
}

dibujarHorca();

function inicarJuego(){
    palabraSorteada = palabrasSecretas[Math.round(Math.random*palabrasSecretas.length)];//sortea una palabra del array, palabrasSecretas (se hace con .length porque se pueden añadir mas palabras)
}

//function verificarLetra(evento){
    
//}

pantalla.onclick = capturandoClick;

console.log(palabrasSecretas.length);
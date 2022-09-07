let pantallaHorca = document.querySelector("#canvasHorca"); //300 x 400
let pincel = pantallaHorca.getContext("2d");

let pantallaLineas = document.querySelector("#canvasLineas"); //300 x 400
let pincel2 = pantallaLineas.getContext("2d");

let palabrasSecretas = ["PROGRAMA","JUEGO","WEB","FINAL","SCRIPT","ESTILO","ETIQUETA","EVENTO","LINEA","CODIGO"];
let palabraSorteada = "";
let letraSorteadas = [];
const btnIniciar = document.querySelector("#btnIniciar"); 
let inputValidaLetra = document.querySelector("#inpValidaLetra");

const letrasValidas = new RegExp("^[a-z]+$", "i");

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

function dibujarLetras(){
    let textoInput = inputValidaLetra.value;
    let ultimoCaracter = textoInput.charAt((textoInput.length)-1);
    let coordenadaLineaX = 0;
    for(let i=0; i<letraSorteadas.length; i++){
        if(ultimoCaracter == letraSorteadas[i]){
            pincel2.beginPath();
            //pincel.strokeStyle="blue";
            pincel2.fillStyle="blue";
            pincel2.font="bold 30px arial";
            //pincel.strokeText("amore",100,100);
            pincel2.fillText(letraSorteadas[i],coordenadaLineaX,24);
            console.log(letraSorteadas[i]);
            
        }else{
            console.log("negativo");
        }
        coordenadaLineaX = coordenadaLineaX + 37;
    }
    
}

function dibujarLineas (){
    pincel2.clearRect(0,0,pantallaLineas.width, pantallaLineas.height);//limpia todo el espacio del canvas
    let coordenadaLineaX = 0;
    for(let i=0; i<letraSorteadas.length; i++){
        pincel2.fillStyle = "blue";
        pincel2.fillRect(coordenadaLineaX,28,30,2);
        coordenadaLineaX = coordenadaLineaX + 37;
    }
    
}


function capturandoClick (evento){       
    let posX = evento.x - pantallaLineas.offsetLeft;
    let posY = evento.y - pantallaLineas.offsetTop; 
    console.log(posX + "," + posY);
}

function inicarJuego(){
    palabraSorteada = palabrasSecretas[Math.floor(Math.random()*palabrasSecretas.length)];//sortea una palabra del array, palabrasSecretas (se hace con .length porque se pueden añadir mas palabras)
    letraSorteadas = [];
    for (let i = 0; i < palabraSorteada.length; i++){
        letraSorteadas.push(palabraSorteada.charAt(i));
    }
    dibujarLineas();
    console.log(letraSorteadas);
}

function validarLetras(){
    inputValidaLetra.value = inputValidaLetra.value.toUpperCase();//convierte letra a mayuscula, ya que javascript ejectuta primero que css
    let textoInput = inputValidaLetra.value;
    if(!letrasValidas.test(textoInput)){
        console.log("mal ");
        textoInput = textoInput.substring(0,(textoInput.length)-1);
        inputValidaLetra.value = textoInput;
    }else{
        let ultimoCaracter = textoInput.charAt((textoInput.length)-1);
        if(textoInput.length == 1){
            dibujarLetras();
        } else{
            for (let i = 0; i<((textoInput.length)-1); i++){
                if (ultimoCaracter == textoInput.charAt(i)){
                    console.log("mal repetido");
                    textoInput = textoInput.substring(0,(textoInput.length)-1);
                    inputValidaLetra.value = textoInput;
                    break;
                } else{
                    dibujarLetras();
                }
            }
        }
    }
}
//function verificarLetra(evento){
    
//}
dibujarHorca();
pantallaLineas.onclick = capturandoClick;
btnIniciar.onclick = inicarJuego;
inputValidaLetra.oninput = validarLetras;

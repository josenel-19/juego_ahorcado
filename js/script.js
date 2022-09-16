//se toman elemntos del html
const div1 = document.querySelector("#divCapa1");
const btnNuevaPalabra = document.querySelector("#btnNuevaPalabra");
const btnIniciar = document.querySelector("#btnIniciar");

const div2 = document.querySelector("#divCapa2");
const inpAgregaPalabra = document.querySelector("#inpAgregarPalabra");
const lbInformarivo = document.querySelector("#lb-informativo");
const btnGuardar = document.querySelector("#btnGuardar");
const btnCancelar = document.querySelector("#btnCancelar");

const div3 = document.querySelector("#divCapa3");
let pantallaHorca = document.querySelector("#canvasHorca"); //300 x 400
let pincel = pantallaHorca.getContext("2d");
let pantallaLineas = document.querySelector("#canvasLineas");
let pincel2 = pantallaLineas.getContext("2d");
let pantallaLetraIncorrecta = document.querySelector("#canvasLetrasIncorrectas"); //300 x 400
let pincel3 = pantallaLetraIncorrecta.getContext("2d");
const btnNuevo = document.querySelector("#btnNuevo");
const btnDesistir = document.querySelector("#btnDesistir");
let inputValidaLetra = document.querySelector("#inpValidaLetra");

//variables para manejo y validacion de palabras y letras escogidas
let palabrasSecretasIniciales = ["PROGRAMA","JUEGO","WEB","FINAL","SCRIPT","ESTILO","ETIQUETA","EVENTO","LINEA","CODIGO"];
let palabrasSecretas = palabrasSecretasIniciales;
let palabraSorteada = "";
let letraSorteadas = [];

let textoInput = ""; // tomara el texto 

const letrasValidas = new RegExp("^[a-z]+$", "i"); //variable de letras permitidas

let coorXletraInc = 0; //coordenada x para las letras incorrectas

let finalRecorridoInput = 0;//variable para incrmentar y validar el final del recoorido de las letras de la palbra escogida, para luego saber si la letra escogida es valida o no 

let intentos = 0;  // intentos fallidos al llegar a 8 se pierde el juego (usado para validar perdedor)
let letrasCompletas = 0; // se incrementa cuando se pinta una letra de la palabra escogida (usada para vaalidar ganador)

let letrasIncorrectas = ""; //para capturar las letras incorrectas que se dibujaran en el canvas

function dibujarHorca(){ // dibuja todo el recuadro de la horca y el muñeco
    const colorHorca="#8B4A0A";
    const colorMuneco = "#0A3871";
    const colorFondoCabeza ="#F3F5FC";
    if(intentos == 1){
        pincel.beginPath();
        pincel.lineWidth=5;
        pincel.moveTo(0,197.5);
        pincel.lineTo(300,197.5);
        pincel.strokeStyle = colorHorca;
        pincel.stroke();
        pincel.beginPath();
        pincel.moveTo(75,200);
        pincel.lineTo(75,2.5);
        pincel.stroke();

    }if(intentos == 2){
        pincel.beginPath(); // dibuja base horizontal alta
        pincel.moveTo(72.5,2.5);
        pincel.lineTo(200,2.5);
        pincel.stroke();
        pincel.beginPath(); // // dibuja linea de base horizontal alta a cabeza
        pincel.moveTo(200,0);
        pincel.lineTo(200,25);
        pincel.stroke();
    }if(intentos == 3){
        //dibujando cabeza
        pincel.fillStyle = colorMuneco;
        pincel.beginPath(); //inicia nueva ruta de dibujo
        pincel.arc(200,45, 20, 0, 2*3.14 ); //coordenas x, coordenada y, radio, constante 0, constante pi)
        pincel.fill();
        pincel.fillStyle = colorFondoCabeza;
        pincel.beginPath();
        pincel.arc(200,45, 15, 0, 2*3.14 ); //coordenas x, coordenada y, radio, constante 0, constante pi)
        pincel.fill();
    }if(intentos == 4){
        //dibujando tronco
        pincel.fillStyle = colorMuneco;
        pincel.fillRect(197.5,62.5,5,80);
    }if(intentos == 5){
        //dibujando brazo izquierdo
        pincel.beginPath();
        pincel.strokeStyle = colorMuneco;
        pincel.moveTo(200,62);
        pincel.lineTo(170,92);
        pincel.stroke();
    }if(intentos == 6){
        //dibujando brazo derecho
        pincel.beginPath();
        pincel.moveTo(200,62);
        pincel.lineTo(230,92);
        pincel.stroke();
    }if(intentos == 7){
        //dibujando pierna izquierda
        pincel.beginPath();
        pincel.moveTo(200,142);
        pincel.lineTo(170,172);
        pincel.stroke();
    }if(intentos == 8){
        //dibujando pierna derecha
        pincel.beginPath();
        pincel.moveTo(200,142);
        pincel.lineTo(230,172);
        pincel.stroke();

    }
}

function dibujarLetras(){ //dibuja letras tanto correctas como incorrectas
    let ultimoCaracter = textoInput.charAt((textoInput.length)-1);
    let letraCorrecta = false;
    let coordenadaLineaX = 10;
    let i = 0;
    for (let i=0; i<letraSorteadas.length; i++){ //reccorre cada letra de la palabra sorteada y compara si hay igualdad y dibuja la letra que coincida. (puede coincidir varias letras, se puede dibujar mas de una)
        if(ultimoCaracter == (letraSorteadas[i])){
            pincel2.beginPath();
            //pincel.strokeStyle="blue";
            pincel2.fillStyle="#0A3871";
            pincel2.font="30px arial";
            pincel2.textAlign="center";
            pincel2.fillText(letraSorteadas[i],coordenadaLineaX,24);
            letraCorrecta=true;
            letrasCompletas = letrasCompletas + 1; //variable que verifica ganador
        }
        coordenadaLineaX = coordenadaLineaX + 38; //coordenada horizontal(x) de la letra.
    }

    if(letraCorrecta==false && finalRecorridoInput==true){ //dibuja letra incorrecta solo al finalizar el reccorrido de todas las letras, ya que solo se dibuja una letra incorrecta por cada recorrido finalizado.
        letrasIncorrectas = letrasIncorrectas + ultimoCaracter;
        let ancho = (letrasIncorrectas.length*30);
        pantallaLetraIncorrecta.width = ancho;
        pincel3.beginPath();
        pincel3.fillStyle="#0A3871";
        pincel3.font="24px arial";
        pincel3.textAlign="center";
        pincel3.fillText(letrasIncorrectas,(ancho/2),26); //pinta letra en la mitad del canvas
        intentos = intentos + 1; //valida perdedor
        dibujarHorca();
    }


    
}

function dibujarLineas (){
    pincel2.clearRect(0,0,pantallaLineas.width, pantallaLineas.height);//limpia todo el espacio del canvas
    let ancho = 0;
    let coordenadaLineaX = 0;
    for(let inc=0; inc<letraSorteadas.length; inc++){ //recorrido del largo de la palabra sorteada, para saber el ancho del canvas
        ancho = ancho + 37;
    }
    pantallaLineas.width=ancho;

    //dibuja cada linea conforme al largo de la palabra sorteada
    for(let i=0; i<letraSorteadas.length; i++){
        pincel2.fillStyle = "#0A3871";
        pincel2.fillRect(coordenadaLineaX,28,30,2);
        coordenadaLineaX = coordenadaLineaX + 37; 
    }
}

function inicarJuego(){ // se dan los parametros iniciales
    div1.style.display="none";
    div2.style.display="none";
    div3.style.display="block";
    inputValidaLetra.disabled=false;
    inputValidaLetra.focus();
    btnNuevo.disabled=false;
    btnNuevo.style.background="#0A3871";
    limpiarPantalla();
    textoInput="";
    intentos=0;
    letrasCompletas=0;
    letrasIncorrectas="";
    palabraSorteada = palabrasSecretas[Math.floor(Math.random()*palabrasSecretas.length)];//sortea una palabra del array, palabrasSecretas (se hace con .length porque se pueden añadir mas palabras)
    letraSorteadas = [];
    for (let i = 0; i < palabraSorteada.length; i++){ //se llena variable en un array con cada letra de la palabra sorteada
        letraSorteadas.push(palabraSorteada.charAt(i));
    }
    dibujarLineas();
}

function validarLetras(){ // valida las letras introducidas en el juego
    inputValidaLetra.value = inputValidaLetra.value.toUpperCase();//convierte letra a mayuscula, ya que javascript ejectuta primero que css
    textoInput = textoInput + inputValidaLetra.value; //variable que va concatenado las letras y con esta se validan las letras repetidas
    let ultimoCaracter = textoInput.charAt((textoInput.length)-1);
    let letraRepetida = false;
    inputValidaLetra.value="";
    if(!letrasValidas.test(ultimoCaracter)){ //si la letra no es valida, borra esa letra (ultima)
        textoInput = textoInput.substring(0,(textoInput.length)-1);
    }else{

        finalRecorridoInput = false;
    
        if(textoInput.length === 1){ //condicional para primera letra, ya que no se compara.
            finalRecorridoInput = true; //util para dibujar palabra incorecta
            dibujarLetras();
        } else{
            for (let inc = 0; inc<((textoInput.length)-1); inc++){ //recorre el texto almacenado y compara las letras
                if(inc ===((textoInput.length)-2)){ //valida que el final del recorrido sea hasta la penultima letra
                    finalRecorridoInput = true;
                }
                if (ultimoCaracter === textoInput.charAt(inc)){ //si la letra coincide corta es letra de la variable que las almacena
                    textoInput = textoInput.substring(0,(textoInput.length)-1);
                    letraRepetida = true;
                    break;
                }
            }
            if(letraRepetida===false){ // si no hay letras repetidas se procede a dibujar letras
                console.log(textoInput);
                dibujarLetras();
            }
        }
   
    }
    verificarGanador();
}

function limpiarPantalla(){
    pincel.clearRect(0,0,pantallaHorca.width, pantallaHorca.height);
    pincel2.clearRect(0,0,pantallaLineas.width, pantallaLineas.height);
    pincel3.clearRect(0,0,pantallaLetraIncorrecta.width, pantallaLetraIncorrecta.height);
}

function verificarGanador (){
    if (letrasCompletas == letraSorteadas.length){
        Swal.fire({
            title: "¡FELICIDADES!",
            text: "usted ganó",
            icon: "success"
        });
        inputValidaLetra.disabled=true;
        btnNuevo.disabled=false;
        btnNuevo.style.background="#0A3871";
    }else if(intentos == 8){
        Swal.fire({
            title: "FIN DEL JUEGO",
            text: "usted perdió, la palabra correcta era " + palabraSorteada,
            icon: "error"
        });
        inputValidaLetra.disabled=true;
        btnNuevo.disabled=false;
        btnNuevo.style.background="#0A3871";
    }
}

function irPantallaInicial (){
    div2.style.display="none";
    div3.style.display="none";
    div1.style.display="block";
    palabrasSecretas = palabrasSecretasIniciales;
}

function irPantalla2(){
    div2.style.display="block";
    div3.style.display="none";
    div1.style.display="none";
    inpAgregaPalabra.focus();
    inpAgregaPalabra.value="";
    inpAgregaPalabra.placeholder="Ingrese una palabra";
}
function verificarNuevaPalabra(){
    //compara con letras validas y con el maximo de letras permitidas por palabra
    if((!letrasValidas.test(inpAgregaPalabra.value)) || inpAgregaPalabra.value.length>8){
        inpAgregaPalabra.value = inpAgregaPalabra.value.substring(0,((inpAgregaPalabra.value).length-1));
        lbInformarivo.style.color = "red";
    }else{
        inpAgregaPalabra.value = inpAgregaPalabra.value.toUpperCase();
        lbInformarivo.style.color="#495057";
    }
}
function guardarNuevaPalabra(){
    if ((inpAgregaPalabra.value == "") || (inpAgregaPalabra.value.length<3)){
        Swal.fire({
            title: "ERROR",
            text: "Una palabra tiene mínimo 3 letras ",
            icon: "error"
        })
    }else{
        palabrasSecretas = [inpAgregaPalabra.value];// palabra secreta toma valor de la nueva palabra, es decir solo una palabra va estar disponible para el juego.
        inicarJuego();
        btnNuevo.style.background="#D1CECD";
        btnNuevo.disabled = true;
    }
    
}


btnIniciar.onclick = inicarJuego;
inpAgregaPalabra.oninput = verificarNuevaPalabra;
btnNuevo.onclick = inicarJuego;
btnDesistir.onclick = irPantallaInicial;
btnNuevaPalabra.onclick = irPantalla2;
btnGuardar.onclick= guardarNuevaPalabra;
inputValidaLetra.oninput = validarLetras;
btnCancelar.onclick = irPantallaInicial;
btnDesistir.onclick = irPantallaInicial;

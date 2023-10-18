window.onload=comienzo;
function comienzo(){
    document.formulario.boton.onclick=main;
}
var mensajeCIF="";
var mensajeNIF="";
function main(){
    var NIF=document.formulario.NIF.value;
    var CIF=document.formulario.CIF.value;
    NIF=NIF.toUpperCase();
    CIF=CIF.toUpperCase();
    switch (esNIF(NIF)) {
        case 0:
            mensajeNIF="Se ha introducido un dato no válido. No es NIF ni un DNI.";
            break;
        case 1:
            mensajeNIF="Se ha introducido un NIF erróneo. El carácter de control es erróneo.";
            break;
        case 2:
            mensajeNIF="Se ha introducido un DNI, se ha pasado un número de entre 6 y 8 dígitos con un valor mínimo de 100000.";
            break;
        case 3:
            mensajeNIF="Se ha introducido un NIF correcto";
            break;
        case 4:
           //PERSONA FISICA
        case 5:
           //PERSONA JURIDICA
    }
    document.formulario.mensajeNIF.value=mensajeNIF;
    switch (esCIF(CIF)) {
        case -1:
            mensajeCIF="Tu CIF tiene menos de 9 cifras";
            break;
        case 0:
            mensajeCIF="Se ha introducido un dato no válido. No es CIF.";
            break;
        case 1:
            mensajeCIF="Se ha introducido un CIF erróneo. El carácter de control es erróneo.";
            break;
        case 2:
            mensajeCIF="Se ha introducido un CIF correcto";
            break;
    }
    document.formulario.mensajeCIF.value=mensajeCIF;
}

function esNIF(NIF){
    var caracteresPersonaFisica="XLKMYZ";
    caracteresPersonaFisica=caracteresPersonaFisica.split("");
    var arrayNIF=NIF.split("");
    var carateresPersonaJuridica=['A','B','C','D','E','F','G','H','J','P','Q','R','S','U','V','W','N'];
    var numeros = "0123456789";
    var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";
    var x;
    // COMPROBAR QUE EL NIF TIENE SUS NUEVE CARACTERES
    if(arrayNIF.length<9){
        return 0;
    }
    
    // COMPROBAR SI EL NIF TIENE UNA LETRA AL INICIO
    if(letras.includes(arrayNIF[0])){
        if(carateresPersonaJuridica.includes(arrayNIF[0])){
            // PERSONA JURIDICA
            for (let i = 1; i < arrayNIF.length-1; i++) {
                if(numeros.includes(arrayNIF[i])){
                    x=true;
                }else{
                    x=false;
                    break;
                }
            }
            if(x){
                if(CaracterControl(NIF)){
                    return 3;
                }else{
                    return 1;
                }
            }else{
                alert("Tienes los digitos mal");
            }
        }else if( caracteresPersonaFisica.includes(arrayNIF[0])){
            //PERSONA FISICA
            
            for (let i = 1; i < arrayNIF.length-1; i++) {
                if(numeros.includes(arrayNIF[i])){
                    x=true;
                }else{
                    x=false;
                    break;
                }
            }
            if(x){
                if(CaracterControl(NIF)){
                    return 3;
                }else{
                    return 1;
                }
            }else{
                alert("Tienes los digitos mal");
            }
        }else{
            alert("La letra del principio esta mal");
        }
    // SI NO TIENE UNA LETRA AL INICIO TIENE QUE TENER UN NUMERO
    }else if(numeros.includes(arrayNIF[0])){
        x=false;
        // SI TIENE UN NUMERO AL INICIO QUIERE DECIR QUE ES UN DNI, Y LE SIGUEN 8 NUMEROS MAS DESPUES DE UNA LETRA HAY QUE VER SI EL CARACTER DE CONTROL ESTA BIEN
        for (let i = 0; i < arrayNIF.length-1; i++) {
            if(numeros.includes(arrayNIF[i])){
                x=true;
            }else{
                alert("El caracter "+arrayNIF[i]+" está mal escrito");
                break;
            }            
        }
        if(x){
            if(CaracterControl(NIF)){
                return 2;
            }else{
                return 1;
            }
        }
    // SI NO TIENE NI UN NUMERO NI UNA LETRA AL INICIO EL NIF NO ES VALIDO
    }else{
        return 0;
    }

}
function CaracterControl(NIF) {
    var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";
    var letrasControl=['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];
    var nums;
    if(letras.includes(NIF.charAt(0))){
        nums=NIF.substr(1,7);
    }else{
        nums=NIF.substr(0,8);
    }
    var resto=nums%23;
    var arrayNIF=NIF.split("");
    console.log(nums);
    console.log(resto);
    if(letrasControl[resto]==arrayNIF[arrayNIF.length-1]){
        return true;
    }else{
        return false;
    }
 
}

function esCIF(CIF){
    var arrayCIF=CIF.split("");
    var letrasInicioTL=["A","B","C","D","E","F","G","H","J","U","V"];
    var letrasInicioTN=["P","Q","R","S","W"];
    var numeros="0123456789";
    var x=false;
    var y=false;
    var PosImpares=[];
    var PosPares=[];
    var LetrasdeControl=["J","A","B","C","D","E","F","G","H","I"];
//COMPROBAR QUE EL CIF NO TIENE UN TAMAÑO MENOR A 9(MAS NO PUEDE TENER POR EL MAXLENGTH)
if(CIF.length<9){
    return -1;
}
//COMPROBAR QUE EL CIF TIENE UNA LETRA AL PRINCIPIO
if(isNaN(arrayCIF[0])){
    // COMPROBAR SI LA LETRA INICIAL ESTA BIEN
    if(letrasInicioTL.includes(arrayCIF[0]) || letrasInicioTN.includes(arrayCIF[0])){
        // SI LA LETRA INICIAL ESTA BIEN HAY QUE VER SI LOS SIGUIENTES 7 DIGITOS SON NUMEROS
        for (let index = 1; index < arrayCIF.length-1; index++) {
            if(numeros.includes(arrayCIF[index])){
                x=true;
            }else{
                alert("El caracter "+ arrayCIF[i] +" esta mal");
            }
        }
        //SI YA SABEMOS QUE LOS 7 DIGITOS SON NUMEROS, AHORA HAY QUE HACER LOS CALCULOS PARA VER SI EL CARACTER DE CONTROL COINCIDE 
        if(x){
            let contP=0;
            let contI=0;
            for (let i = 1; i < arrayCIF.length-1; i++) {
                if(i%2==0){
                    PosPares[contP]=arrayCIF[i];
                    contP++;
                }else{
                    PosImpares[contI]=arrayCIF[i];
                    contI++;
                }
            }
            //YA TENGO LOS NUMEROS IMPARES Y LOS PARES SEPARADOS Y GUARDADOS EN UN ARRAY CADA UNO
            let sumaIM=0;
            let sumaPA=0;
            //AHORA SUMAMOS LOS NUMEROS IMPARES MULTIPLICADOS POR DOS(SI EL NUMERO RESULTANTE DE LA MULTIPLICACION ES MENOR A 9 SE QUEDA IGUAL, SI ES MAYOR A 9 SE RESTAN 9 AL NUMERO MULTIPLICADO)
            for (let i = 0; i < PosImpares.length; i++) {
                let aux=PosImpares[i]*2;
                if((PosImpares[i]*2)<=9){
                    sumaIM+=aux;
                }else{
                    sumaIM+=sumarCifras(aux);
                }
            }

            for (let i = 0; i < PosPares.length; i++) {
                sumaPA+=parseInt(PosPares[i]);
            }
            //AQUI DEBERIAMOS TENER LAS SUMAS DE LOS NUMEROS IMPARES, CON SUS RESPECTIVAS NORMAS, Y LA SUMA DE LOS NUMEROS PARES
            const totalSuma=sumaIM+sumaPA;
            var u=totalSuma%10;
            var NumCaracterControl=(10-u);
            console.log(totalSuma);
            console.log(NumCaracterControl);
            //YA TENGO EL NUMERO DEL CARACTER DE CONTROL, AHORA HAY QUE VE SI EL CIF EN CUESTION LO TIENE BIEN PUESTO, EL NUMERO O LA LETRA
            //PRIMERO VAMOS A VER SI EL ULTIMO CARACTER ES UN NUMERO O UNA LETRA
            if(isNaN(arrayCIF[arrayCIF.length-1])){
                //SI ES UNA LETRA, VAMOS A VER SI ES LA MISMA QUE EL NÚMERO
                let numLetra=LetrasdeControl.indexOf(arrayCIF[arrayCIF.length-1]);
                if(numLetra==NumCaracterControl){
                    return 2;
                }else{
                    return 1;
                }
            }else{
                //SI ES UN NUMERO, VAMOS A VER SI ES IGUAL AL DEL CONTROL
                if(parseInt(arrayCIF[arrayCIF.length-1])==NumCaracterControl){
                    return 2;
                }else{
                    return 1;
                }
            }
            

        }
    }else{
        alert("La letra inicial esta mal");
    }
}else{
    return 0;
}
}
function sumarCifras(num){
    var numString=num.toString();
    var resultado=0;
    for (let i = 0; i < numString.length; i++) {
        resultado+=parseInt(numString[i]);
    }
    return resultado;
}
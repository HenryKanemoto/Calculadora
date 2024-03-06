const btnTecla = document.querySelectorAll('.btn-tecla');
const btnTeclado = document.querySelectorAll('.btn-teclado');
const btnDel = document.querySelector('.btn-del');
const btnSinal = document.querySelectorAll('.btn-sinal'); 
const btnResultado = document.querySelector('.btn-resultado');
const btnparenteses = document.querySelector('.btn-parenteses');
const box = document.getElementById('input-box');
let decimal = false;
let listaElemento = [];
let listaTermo = [];
let strListaElemento = null;
let floatListaElemento = null;
let numElemeto = null;
let resultado = null;




function atualizarLista() {
    if(!decimal){
        strListaElemento = listaElemento.join("");
        numElemeto = strListaElemento;
    }
    if(decimal){
        if(parseFloat(listaElemento.join(""))){
            floatListaElemento = parseFloat(listaElemento.join(""));
            numElemeto = floatListaElemento;               
            strListaElemento = numElemeto.toString();
            decimal = true;
        }
    }
    if (!numElemeto && numElemeto !== 0){
        box.innerHTML = listaTermo.join("");
        if(!listaTermo[0]){
            box.innerHTML = 0;
        }
    }else{      
        box.innerHTML = listaTermo.join("") + numElemeto;
    }
}
function adiconarTermo() {
    if (numElemeto) {
        listaTermo.push(numElemeto); 
    }else{
    listaTermo.push(listaElemento[0])
    }
                   
    strListaElemento = null;                    //adiciona um novo termo ao calculo limpando todas as listas
    floatListaElemento = null ;
    numElemeto = null;
    listaElemento = [];

}
function alternarTermo(){
    if(listaTermo[0]){
        listaElemento = listaTermo[listaTermo.length - 1].toString().split('');    
        strListaElemento = listaElemento.join(""); 
        floatListaElemento = parseFloat(strListaElemento);  
        numElemeto = parseInt(strListaElemento);
        
        box.innerHTML = listaTermo.pop() + listaElemento;
    }else{
        listaElemento = []
        strListaElemento = ''
        floatListaElemento = 0
        numElemeto = 0
        return box.innerHTML =  0
    }


    if(floatListaElemento % 1 !== 0){
        decimal = true;                     //checa se o termo alternado é float
    }

}
function calcular(conta){

    conta = listaTermo.join("");
    conta = conta.replace("x", '*').replace("÷", '/');
    resultado = eval(conta);
    if(!resultado|| resultado === Infinity){
        box.innerHTML = 'ERRO';
    }else{
        listaTermo = [parseFloat(resultado)];
        listaElemento = listaTermo[0].toString();

        alternarTermo();



        box.innerHTML = resultado
    }

}


 
for (let i = 0; i < btnTecla.length; i++) {
    

    btnTecla[i].addEventListener('click', () => {
        let elemento = btnTecla[i].innerHTML;
        if(decimal == true && elemento == '.'){
            return;         
        }

        else{
            listaElemento.push(elemento);          
            atualizarLista();       
            return;
        }    

        

    })
  
}
for (let i = 0; i < btnSinal.length; i++) {
    
    btnSinal[i].addEventListener('click', () => {

        let elemento = btnSinal[i].innerHTML;

        if (numElemeto) {
            numElemeto = numElemeto + elemento;
        }else{
            numElemeto = elemento;
        }
        
        box.innerHTML = listaTermo.join("") + numElemeto;

        if (numElemeto !== null) {
            decimal = false;
            adiconarTermo();
        };


    })
    
    
}

for (let i = 0; i < btnTeclado.length; i++) {
    
    btnTeclado[i].addEventListener('click', () => {
        let tecla = btnTeclado[i];
        tecla.classList.add('btn-on');
        setTimeout(() => {
            tecla.classList.remove("btn-on");
        }, 250);
    })
}

btnDel.addEventListener('click', () => {    
    if (!listaTermo[0] && !listaElemento[0]) {
        box.innerHTML = 0;
    }else{
        listaElemento.pop();
        if(listaElemento[listaElemento.length - 1] === '.'){
            listaElemento.pop();
            decimal = false
        }
        atualizarLista();
        if (listaTermo && !listaElemento[0]) {
            alternarTermo();
            listaElemento.pop();
            atualizarLista();
        }
        
    }

    

})


btnResultado.addEventListener('click', () => {
    if(listaElemento[0]){
        adiconarTermo();
        calcular();
    }
        
})

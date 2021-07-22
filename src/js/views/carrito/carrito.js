import { ready } from "jquery";
import {getMercaderiasFromLocalStorage, removeMercaderiaFromLocalStorage,setCantidadMercaderiaLocalStorage, clearMercaderiasInLocalStorage} from "../../services/localStorange"
import {convertCategoryToId} from "../../utils/ConvertCategory"

import "regenerator-runtime/runtime";

import view from "./carrito.html";

const template = require('./carrito.handlebars');

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",ready)
} else {
    ready()
}


function  updateCardTotal() {
    var cardItemContainer = document.getElementsByClassName("card-mercaderia")[0]
    var cardItems = cardItemContainer.getElementsByClassName("card-item")
    var total= 0

    for(var i = 0; i <  cardItems.length; i++){
        var cardItem = cardItems[i]
        var priceElement = cardItem.getElementsByClassName("card-price-total")[0]
        var quantityElement = cardItem.getElementsByClassName("card-items-quantity")[0]
        var price = parseFloat(priceElement.innerText.replace("$",""))
        var quantity = quantityElement.value 
        total = total + (price * quantity)

    }
    total = Math.round(total*100) / 100 
    document.getElementsByClassName("card-total-price")[0].innerText = total

}

function quantityChange(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCardTotal()
}

//Post mercaderias
const postMercaderias = async (mercaderialist, fEntrega) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mercaderia: mercaderialist, formaEntrega: fEntrega
        })
    };
    try {
        const url = `https://localhost:44304/api/comanda/`;
        const fetchResponse = await fetch(url, settings);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        return e;
    }    
} 


export default class{
    
    mercaderialist;
    mercaderias;
    btnFormaEntrega;
    listmercaderias;
    

    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML= view;
        divElement.id = "carrito";
    
        return divElement;
    }
    async executeViewScript(){
        await this.setMecaderiasArray();
        updateCardTotal();
        this.initFormaEntregaSelector();
        this.ready();
    }
    
    initFormaEntregaSelector(){
        this.btnFormaEntrega = document.querySelector(".btn-FormaEntrega");
    }
    
    ready(){

        var removerCarItemsButtons = document.getElementsByClassName("btn-remove")
        
        Array.prototype.forEach.call(removerCarItemsButtons, element => {
            element.addEventListener("click",(e)=>{
                var idMercaderia = e.target.id;
                var buttonClicked = e.target;
                removeMercaderiaFromLocalStorage(idMercaderia);
                buttonClicked.parentElement.parentElement.parentElement.remove();
                updateCardTotal()
            })

        });
        

        var inputCardItemsButtons = document.getElementsByClassName("card-items-quantity")

        Array.prototype.forEach.call(inputCardItemsButtons, element => {
            element.addEventListener("input",(e)=>{
                var cantidad = e.target.value;
                var idMercaderia = e.target.id;
                setCantidadMercaderiaLocalStorage(cantidad,idMercaderia)
            })
        });

        var quantityInputs = document.getElementsByClassName("card-items-quantity")
        for(var i = 0; i <  quantityInputs.length; i++){
            var input = quantityInputs[i]
            input.addEventListener("change", quantityChange)
        }

        

        
        var btnAddComanda = document.querySelector(".btn-add-comanda")

        
        btnAddComanda.addEventListener("click",(e)=>{
            let formaEntrega = convertCategoryToId(this.btnFormaEntrega.value);
            console.log(this.btnFormaEntrega.value);
        
            let mercadriasListId = new Array();
            Array.prototype.forEach.call(this.listmercaderias, element =>{
                console.log("Here1");
                
                for(var i = 0; i < element.cantidad ; i++ ){
                    console.log("Here2");
                    mercadriasListId.push(element.mercaderiaId)
                }
                
            })
            console.log(mercadriasListId,formaEntrega);
            postMercaderias(mercadriasListId, formaEntrega);
            clearMercaderiasInLocalStorage();
        })
        
        
    }
    
    async setMecaderiasArray(mercaderias){
        this.listmercaderias = await getMercaderiasFromLocalStorage();
        const htmlMercaderias = template({mercaderias: this.listmercaderias})
        console.log(this.listmercaderias);
        this.mercaderialist = document.getElementById('list_mercaderias');
        this.mercaderialist.innerHTML=htmlMercaderias;
    }

    
}


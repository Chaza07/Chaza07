
import { event } from "jquery";

import "regenerator-runtime/runtime";
import {addMercaderiaToLocalStorage, getMercaderiasFromLocalStorage} from "../../services/localStorange"

import view from "./search_mercaderia.html";

const template = require('./mercaderias_items.handlebars');


//Get all mercaderias
const getAllMercaderias = async () => {
    
    let response = await fetch('https://localhost:44304/api/mercaderia/', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default",
    });

    let json = await response.json();
    return JSON.parse(JSON.stringify(json));
    
    
};





//Export default class
export default class{
    mercaderialist;
    mercaderias;
    formaEntrega;
    listmercaderias;
    
    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML= view;
        divElement.id = "search_mercaderia";
    
        return divElement;
    }

    async executeViewScript(){
        await this.setMecaderiasArray();
        this.addCardButton();
        //this.buttonEvent();
    }
    
    async setMecaderiasArray(mercaderias){
        this.listmercaderias = await getAllMercaderias();
        const htmlMercaderias = template({mercaderias: this.listmercaderias})
        console.log(this.listmercaderias);
        this.mercaderialist = document.getElementById('list_mercaderias');
        this.mercaderialist.innerHTML=htmlMercaderias;
    }

    getValueSelect(mercaderialist){

        var selectedValue = document.querySelector(`select[id="${mercaderialist}"]`).value;

        formaEntrega = selectedValue;

        return this.formaEntrega;
    }

    addCardButton(){
        let addToCartButtons = document.getElementsByClassName("mercaderia-add-button");
        var cantidad = 1;

        Array.prototype.forEach.call(addToCartButtons, element => {
            element.addEventListener("click", (e)=>{
                var idMercaderia = e.target.id;
                var objMercaderia = this.listmercaderias.find(element => 
                    element.mercaderiaId == idMercaderia
                )
                console.log(idMercaderia);
                addMercaderiaToLocalStorage(cantidad,objMercaderia);
                console.log(getMercaderiasFromLocalStorage());
            })
        });
            
    }

        
}

    /*
    async buttonEvent(){
        
        const buttonSet = document.querySelectorAll('.comandButton');

        console.log(buttonSet);
        buttonSet.addEventListener('click', (e) => {
            e.preventDefault();
            postMercaderias(e.target.id, getValueSelect(e.target.id))
            
        });
    
    }
    */






import "regenerator-runtime/runtime";

import view from "./search_comanda.html";

const template = require('./comandas_items.handlebars');


const getAllComandas = async () => {
    
    let response = await fetch('https://localhost:44304/api/comanda',{
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


export default class{
    comandaslist;
    comandas;
    
    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML= view;
        divElement.id = "search_comanda";
    
        return divElement;
    }
    async executeViewScript(){
        this.setComandasArray();
    }

    async setComandasArray(comandas){
        const htmlComandas = template({comandas: await getAllComandas()})

        this.comandaslist = document.getElementById('list_comandas');
        this.comandaslist.innerHTML=htmlComandas;
        
    }
}
import UniversalRouter  from "universal-router";
import {routes} from "./js/routes";
import "regenerator-runtime/runtime";
import swal from "sweetalert";


const router = new UniversalRouter(routes);

const html = require("./index.html");
const css = require("./styles.css");


//navigate to page 
const navegate = async () => {
    let pathname = window.location.pathname;

    let view = await router.resolve({
        pathname: location.pathname,
        hash: location.hash
    })
    
    let content = document.querySelector("#indexApp");
    content.innerHTML="";
    content.appendChild(await view.getHtml());
    
    await view.executeViewScript();
    
}

function mostrar(){
    swal('Hola mundo')
}

//botton menu appear
const menuButton = document.querySelector('#mobile-menu');

menuButton.addEventListener('click', e => {
    const menu = document.querySelector('.mobile-links');

    menu.classList.toggle('hidden');
});

//carrito menu appear
const carritoButton = document.querySelector('#carrito');

carritoButton.addEventListener('click', e => {
    const menu = document.querySelector('.carrito-link')

    menu.classList.toggle('hidden');
})


//window navegate
window.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();

            console.log("data-link")
            history.pushState(undefined, undefined, e.target.href)
            navegate();
        }
    });

    navegate();
});

window.addEventListener("popstate", (e) => {
    e.preventDefault();
    console.log("popstate");
    navegate();
})

window.addEventListener("hashchange", (e) => {
    e.preventDefault();
    console.log(`location changed: ${location.pathname}`);
    navegate();
});





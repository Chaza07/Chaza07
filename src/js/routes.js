import UniversalRouter  from "universal-router";
import searchMercaderias from "./views/search_mercaderia/searchMercaderias.js";
import searchComandas from "./views/search_comandas/searchComandas.js";
import carrito from "./views/carrito/carrito.js";

const routes =[
    {
        path: "/mercaderias",
        action: async() => {
            return new searchMercaderias();
        },
    },
    {
        path:"/comandas",
        action: async() => {
            return new searchComandas();
        },
    },
    {
        path:"/carrito",
        action: async() => {
            return new carrito();
        },
    },
];

export {routes};
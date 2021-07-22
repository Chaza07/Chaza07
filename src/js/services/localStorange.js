const ComandaMercaderias = "mercaderias";

const getMercaderiasFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(ComandaMercaderias));
}

const addMercaderiaToLocalStorage = (cantidad, mercaderia) => {
    let list = getMercaderiasFromLocalStorage();

    if (!Array.isArray(list))
        list = new Array();

    const mercaderiaExists = list.find(e => e.mercaderiaId == mercaderia.mercaderiaId);
    if (mercaderiaExists == null) {
        let newMercaderia = mercaderia;
        newMercaderia.cantidad = parseInt(cantidad);

        list.push(newMercaderia);
    } else {
        mercaderiaExists.cantidad += parseInt(cantidad);
    }

    localStorage.setItem(ComandaMercaderias, JSON.stringify(list));
}

const setCantidadMercaderiaLocalStorage = (cantidad, mercaderiaId) => {
    let list = getMercaderiasFromLocalStorage();

    if (!Array.isArray(list))
        list = new Array();

    const mercaderiaExists = list.find(e => e.mercaderiaId == mercaderiaId);
    if (mercaderiaExists != null)
        mercaderiaExists.cantidad = parseInt(cantidad);

    localStorage.setItem(ComandaMercaderias, JSON.stringify(list));
}

const removeCantidadMercaderiaFromLocalStorage = (cantidad, mercaderiaId) => {
    let list = getMercaderiasFromLocalStorage();

    if (!Array.isArray(list))
        return null;

    const mercaderiaExists = list.find(e => e.mercaderiaId == mercaderiaId);
    if (mercaderiaExists == null)
        return null;

    mercaderiaExists.cantidad -= parseInt(cantidad);
    if (mercaderiaExists.cantidad <= 0)
        list = list.filter(e => e.mercaderiaId != mercaderiaExists.mercaderiaId);

    localStorage.setItem(ComandaMercaderias, JSON.stringify(list));
}

const removeMercaderiaFromLocalStorage = (mercaderiaId) => {
    let list = getMercaderiasFromLocalStorage();

    if (!Array.isArray(list))
        return null;

    let newList = list.filter(e => !(e.mercaderiaId == mercaderiaId));
    localStorage.setItem(ComandaMercaderias, JSON.stringify(newList));
}

const clearMercaderiasInLocalStorage = () => {
    localStorage.removeItem(ComandaMercaderias);
}

export { getMercaderiasFromLocalStorage, addMercaderiaToLocalStorage, setCantidadMercaderiaLocalStorage, removeMercaderiaFromLocalStorage, removeCantidadMercaderiaFromLocalStorage, clearMercaderiasInLocalStorage }
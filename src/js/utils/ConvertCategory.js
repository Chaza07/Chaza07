const convertCategoryToId = (text) => {
    switch (text) {
        case 'Salon': return 1;
        case 'Delivery': return 2;
        case 'Pedidos Ya': return 3;
        default: return 0;
    }
};

const convertIdToCategory = (id) => {
    switch (id) {
        case "1": return "Individual";
        case "2": return "Matrimonial";
        case "3": return "Suite";
        default: return "Todos";
    }
}

export { convertCategoryToId, convertIdToCategory }
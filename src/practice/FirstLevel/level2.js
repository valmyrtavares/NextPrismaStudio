const myMap = (array, callback) => {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const currentResult = array[i]
        const item = callback(currentResult)
        result.push(item)
    }
    return result
}

const products = [
    { id: 1, name: 'Arroz', price: 10 },
    { id: 2, name: 'Feijão', price: 12 },
    { id: 3, name: 'Carne', price: 20 }
];
const resultMap = myMap(products, (item) => item.name)
console.log(resultMap)
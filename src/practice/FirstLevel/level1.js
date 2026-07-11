


const myMap = (array, callback) => {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const currentItem = array[i];
        const transformValue = callback(currentItem);
        result.push(transformValue);
    }
    return result;
}

const MyFilter = (array, callback) => {
    const result = [];

    for (let i = 0; i < array.length; i++) {
        const currentItem = array[i];

        // 1. Evaluate the callback (must return true or false)
        const isTruthy = callback(currentItem);
        
        // 2. If it is truthy, push the ORIGINAL item (not the callback's return value!)
        if (isTruthy) {
            result.push(currentItem);
        }
    }
    return result;
}

const products = [
    { id: 1, name: "Arroz", price: 12 },
    { id: 2, name: "Feijão", price: 23 },
    { id: 3, name: "Carne", price: 143 },
]

// Now, the callback just returns a boolean (true or false)
const objects = MyFilter(products, (item) => {
    return item.price > 13;
})
console.log(objects)

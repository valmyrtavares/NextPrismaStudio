const myReduce = (array, callback, initialValue) => {
    // 1. Determine the starting accumulator and starting index based on initialValue
    let accumulator = initialValue !== undefined ? initialValue : array[0];
    let startIndex = initialValue !== undefined ? 0 : 1;


    // 2. Loop through the array starting at startIndex
    for (let i = startIndex; i < array.length; i++) {
        const currentItem = array[i];


        // Execute the callback and update the accumulator with the returned value
        const previousAccumulator = accumulator;
        accumulator = callback(accumulator, currentItem, i, array);

    }

    console.log(`\nFinal return value: ${JSON.stringify(accumulator)}`);
    console.log(`-------------------------\n`);

    return accumulator;
};

// ==========================================
// DEMONSTRATION 1: Summing numbers WITH an initialValue of 0
// ==========================================

const numbers = [10, 20, 30];
const totalSumWithInitial = myReduce(numbers, (acc, num) => acc + num, 0);

// ==========================================
// DEMONSTRATION 2: Summing numbers WITHOUT an initialValue
// ==========================================

const totalSumWithoutInitial = myReduce(numbers, (acc, num) => acc + num);

// ==========================================
// DEMONSTRATION 3: Summing product prices from the products list
// ==========================================

const products = [
    { id: 1, name: "Arroz", price: 12 },
    { id: 2, name: "Café", price: 13 },
    { id: 4, name: "Macarrão", price: 14 },
];

// When reducing objects to a single number, an initialValue is MANDATORY!
const totalProductPrice = myReduce(products, (acc, product) => acc + product.price, 0);

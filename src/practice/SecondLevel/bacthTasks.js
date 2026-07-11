/**
 * Runs an array of promise-returning tasks with a concurrency limit.
 * 
 * @param {Function[]} tasks - Array of functions returning a Promise
 * @param {number} batchSize - Maximum number of tasks to run concurrently
 * @returns {Promise<any[]>} Resolves with an array of all results in original order
 */
const runInBatches = (tasks, batchSize) => {
    return new Promise((resolve, reject) => {
        // If there are no tasks, resolve immediately with an empty array
        if (tasks.length === 0) {
            return resolve([]);
        }

        const results = [];
        let nextTaskIndex = 0;
        let activeTasks = 0;
        let completedTasksCount = 0;

        // This helper function executes the next available task
        const runNext = () => {
            // STEP 1: Check if we have started all tasks.
            // If nextTaskIndex is equal to or greater than tasks.length, we can stop starting new ones.
            if (nextTaskIndex >= tasks.length) {
                return;
            }

            // STEP 2: Capture the current task's index so we know where to place its result later
            const currentIndex = nextTaskIndex;
            nextTaskIndex++; // Move the pointer to the next task in the array

            // STEP 3: Get the task function and execute it
            const currentTask = tasks[currentIndex];
            activeTasks++;

            // Run the task (it returns a promise)
            currentTask()
                .then((result) => {
                    // A. Store the result in the results array at the CORRECT index (currentIndex)
                    results[currentIndex] = result;

                    // B. Decrement the activeTasks counter, and increment completedTasksCount
                    activeTasks--;
                    completedTasksCount++;

                    // C. If all tasks have finished (completedTasksCount equals tasks.length), resolve the outer promise!
                    if (completedTasksCount === tasks.length) {
                        resolve(results);
                        return;
                    }

                    // D. Start the next task immediately to keep our concurrency at maximum batchSize
                    runNext();
                })
                .catch((error) => {
                    // If any task fails, reject the entire batch runner
                    reject(error);
                });
        };

        // STEP 4: Start the initial batch of tasks
        // We want to call runNext up to 'batchSize' times, OR up to 'tasks.length' times (whichever is smaller)
        const initialBatch = Math.min(batchSize, tasks.length);
        for (let i = 0; i < initialBatch; i++) {
            runNext();
        }
    });
};

// ==========================================
// TEST SUITE: You can run this file to test your code!
// ==========================================

// A helper function to create a delay (mocking an API call)
const delayTask = (name, delayMs, shouldFail = false) => {
    return () => {
        console.log(`[START] Task ${name} (takes ${delayMs}ms)`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    console.log(`[FAIL]  Task ${name}`);
                    reject(new Error(`Failed ${name}`));
                } else {
                    console.log(`[DONE]  Task ${name}`);
                    resolve(`Result of ${name}`);
                }
            }, delayMs);
        });
    };
};

const myTasks = [
    delayTask("A", 1000), // Takes 1s
    delayTask("B", 500),  // Takes 0.5s
    delayTask("C", 800),  // Takes 0.8s
    delayTask("D", 300),  // Takes 0.3s
];

console.log("Starting batch runner with concurrency limit of 2...");
const startTime = Date.now();

runInBatches(myTasks, 2)
    .then((results) => {
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\nAll tasks completed in ${duration}s!`);
        console.log("Results:", results);
    })
    .catch((err) => {
        console.error("Batch runner failed:", err.message);
    });

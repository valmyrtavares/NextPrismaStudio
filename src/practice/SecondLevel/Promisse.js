/**
 * Challenge: Implement a Batch Promise Runner (runInBatches)
 * 
 * Signature: runInBatches(tasks, batchSize)
 * - tasks: An array of functions. Each function takes no arguments and returns a Promise.
 * - batchSize: A number representing the maximum number of tasks that can run in parallel.
 * 
 * Behavior:
 * - Executes at most batchSize tasks concurrently.
 * - When one task resolves, the next starts immediately.
 * - Returns a Promise that resolves to an array of results in their original order.
 */

function runInBatches(tasks, batchSize) {
    return new Promise((resolve, reject) => {
        if (tasks.length === 0) {
            resolve([]);
            return;
        }

        const results = [];
        let nextTaskIndex = 0;
        let completedTasksCount = 0;
        let hasErrorOccurred = false;

        // Function that grabs the next task from the queue and executes it
        const runNext = () => {
            // If we have started all tasks or an error occurred, we don't start new ones
            if (nextTaskIndex >= tasks.length || hasErrorOccurred) {
                return;
            }

            // Capture the current index and increment nextTaskIndex
            const currentIndex = nextTaskIndex;
            nextTaskIndex++;

            const task = tasks[currentIndex];

            // Execute the task
            task()
                .then((result) => {
                    if (hasErrorOccurred) return;

                    // Save the result at its original index
                    results[currentIndex] = result;
                    completedTasksCount++;

                    // If all tasks are completed, resolve the main promise
                    if (completedTasksCount === tasks.length) {
                        resolve(results);
                    } else {
                        // Otherwise, start the next task immediately
                        runNext();
                    }
                })
                .catch((error) => {
                    // Reject the main promise if any task fails
                    hasErrorOccurred = true;
                    reject(error);
                });
        };

        // Initially start up to `batchSize` tasks in parallel
        const initialConcurrency = Math.min(batchSize, tasks.length);
        for (let i = 0; i < initialConcurrency; i++) {
            runNext();
        }
    });
}

// ==========================================
// MOCK TASKS AND TESTING SETUP
// ==========================================

// Helper function to create a delay task
const createDelayTask = (name, delayMs, resultVal) => {
    return () => {
        console.log(`[START] Task ${name} (takes ${delayMs}ms)`);
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`[DONE]  Task ${name}`);
                resolve(resultVal);
            }, delayMs);
        });
    };
};

const tasks = [
    createDelayTask('A', 1000, 'Result of A'),
    createDelayTask('B', 500, 'Result of B'),
    createDelayTask('C', 800, 'Result of C'),
    createDelayTask('D', 300, 'Result of D'),
];

console.log("Starting batch runner with concurrency limit of 2...");
const startTime = Date.now();

runInBatches(tasks, 2)
    .then((results) => {
        const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`All tasks completed in ${totalTime}s!`);
        console.log("Results:", results);
    })
    .catch((error) => {
        console.error("A task failed:", error);
    });

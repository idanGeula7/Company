"use strict";
//docs: https://blog.sessionstack.com/how-javascript-works-the-building-blocks-of-web-workers-5-cases-when-you-should-use-them-a547c0757f6a 
angular.module("companyApp").factory("workerService", [() => {
    return {
        start: () => {
            let worker = new Worker("worker/worker.js");

            setTimeout(() => {
                worker.postMessage({
                    num: 1000000000
                });
            }, 500);

            worker.addEventListener("message", (event) => {
                console.log(`Service got result: ${event.data.sum}`);
                worker.terminate();
            }, false);
        }
    };
}]);
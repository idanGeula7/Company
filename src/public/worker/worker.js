"use strict";
// Returns sum of 1 to num
this.addEventListener("message", (event) => {
    let num = event.data.num;
    let sum = 0;
    console.log(`Got num: ${num}`);

    for (let i = 0; i <= num; i++) {
        sum += i;
    }
    this.postMessage({
        sum: sum
    });
    console.log(`Done work for ${num}: ${sum}`);
}, false);
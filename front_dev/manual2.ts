console.log(1);
setTimeout(() => {
  console.log("setTimeout");
}, 1000);
setTimeout(() => {
  console.log("setTimeout0");
}, 0);
new Promise((resolve, reject) => {
  console.log("Promise1");
  resolve("resolve");
  console.log("Promise2");
}).then((data) => {
  console.log(data);
});
console.log(2);


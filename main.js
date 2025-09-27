import Tree from "./bst.js";

function createRandomArray(max, min, n = 1) {
  return Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

const testArr = createRandomArray(100, 0, 14);

const test = new Tree(testArr);
const root = test.root;

console.log(test.isBalanced(root)); // True

// console.log("");

// test.levelOrderForEach((node) => {
//   console.log(`${node.data} =>`);
// });

// console.log("");

// test.inOrderForEach((node) => {
//   console.log(`${node.data} =>`);
// });

// console.log("");

// test.postOrderForEach((node) => {
//   console.log(`${node.data} =>`);
// });

// console.log("");

// test.preOrderForEach((node) => {
//   console.log(`${node.data} =>`);
// });

// console.log("");

test.insert(root, 151);
test.insert(root, 152);
test.insert(root, 153);
test.insert(root, 154);
test.insert(root, 155);
test.insert(root, 156);
test.prettyPrint();

console.log("Is the tree balanced? ", test.isBalanced()); // False
test.rebalance();
console.log("Is the tree balanced? ", test.isBalanced()); // True
console.log("");

test.prettyPrint();

console.log("Level order traversal");
test.levelOrderForEach((node) => {
  console.log(`${node.data} =>`);
});

console.log("");

console.log("In-Order traversal");
test.inOrderForEach((node) => {
  console.log(`${node.data} =>`);
});

console.log("");

console.log("Post-Order traversal");
test.postOrderForEach((node) => {
  console.log(`${node.data} =>`);
});

console.log("");

console.log("Pre-Order traversal");
test.preOrderForEach((node) => {
  console.log(`${node.data} =>`);
});

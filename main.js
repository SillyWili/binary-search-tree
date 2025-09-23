import Tree from "./bst.js";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = new Tree(arr);
const root = test.root;

test.prettyPrint();
test.insert(root, 2);
test.remove(root, 67);
test.prettyPrint();
test.remove(root, 3);
test.prettyPrint();

test.levelOrderForEach((node) => {
  console.log(node.data);
});

test.prettyPrint();

test.inOrderForEach((node) => {
  console.log(node.data);
}, test.root);

const BinaryTree = require("./BinaryTree.js");

// Generate array of length num with random numbers from 0 to 100
const randomArray = (length) => {
  return Array.from({ length: length }, () => Math.floor(Math.random() * 100));
};

// create BST from random array
let tree = new BinaryTree(randomArray(8));

// Checking BST balance and printing traversals
console.log("Is it balanced? ", tree.isBalanced());
console.log("Level Order: ", tree.levelOrder());
console.log("Preorder Traversal: ", tree.preorder());
console.log("Inorder Traversal: ", tree.inorder());
console.log("Postorder Traversal: ", tree.postorder());

// Adding random values to BST from 100 to 500 to unbalance BST
for (let i = 0; i < 5; i++) {
  tree.insert(Math.floor(Math.random() * 400) + 100);
}

// Balance check and rebalance BST, print traversals
console.log("Is it balanced after adding values? ", tree.isBalanced());
tree.rebalance();
console.log("Is it balanced now? ", tree.isBalanced());
console.log("Level Order: ", tree.levelOrder());
console.log("Preorder Traversal: ", tree.preorder());
console.log("Inorder Traversal: ", tree.inorder());
console.log("Postorder Traversal: ", tree.postorder());

// Print BST in structured format for viewing pleasure
tree.prettyPrint();

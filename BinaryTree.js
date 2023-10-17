const Node = require("./Node.js");

class BinaryTree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  #sortArray(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    return sortedArray;
  }

  buildTree(array) {
    let sortedArray = this.#sortArray(array);
    if (sortedArray.length === 0) {
      return null;
    }
    const midPoint = Math.floor(sortedArray.length / 2);
    const root = new Node(
      sortedArray[midPoint],
      this.buildTree(sortedArray.slice(0, midPoint)),
      this.buildTree(sortedArray.slice(midPoint + 1)),
    );
    return root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

module.exports = BinaryTree;

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new BinaryTree(array);
tree.prettyPrint();

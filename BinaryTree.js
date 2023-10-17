const Node = require("./Node.js");

class BinaryTree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  #sortArray(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    return sortedArray;
  }

  #findMin(node) {
    let min = node.data;
    while (node.left !== null) {
      min = node.left.data;
      node = node.left;
    }
    return min;
  }

  buildTree(array) {
    let sortedArray = this.#sortArray(array);
    if (sortedArray.length === 0) {
      return null;
    }
    const midPoint = Math.floor(sortedArray.length / 2);
    const root = new Node(sortedArray[midPoint]);
    root.left = this.buildTree(sortedArray.slice(0, midPoint));
    root.right = this.buildTree(sortedArray.slice(midPoint + 1));
    return root;
  }

  insert(data, node = this.root) {
    if (node === null) {
      node = new Node(data);
      return node;
    }
    if (node.data === data) {
      return;
    }

    if (data < node.data) {
      node.left = this.insert(data, node.left);
    } else if (data > node.data) {
      node.right = this.insert(data, node.right);
    }
    return node;
  }

  delete(data, node = this.root) {
    if (node === null) {
      return node;
    }

    if (node.data > data) {
      node.left = this.delete(data, node.left);
    } else if (node.data < data) {
      node.right = this.delete(data, node.right);
    } else {
      // Once root === node to be deleted
      // If one of the child nodes is empty
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      // If both child nodes exist
      node.data = this.#findMin(node.right);
      node.right = this.delete(node.data, node.right);
    }
    return node;
  }

  find(data, node = this.root) {
    if (node === null || node.data === data) {
      return node;
    }

    if (node.data > data) {
      return this.find(data, node.left);
    }

    if (node.data < data) {
      return this.find(data, node.right);
    }
  }

  levelOrder(callbackFn) {
    if (this.root === null) {
      return [];
    }
    const queue = [this.root];
    const levelOrderList = [];

    while (queue.length > 0) {
      let level = [];
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        const node = queue.shift();
        level.push(node.data);
        if (node.left !== null) {
          queue.push(node.left);
        }
        if (node.right !== null) {
          queue.push(node.right);
        }
        if (callbackFn) {
          callbackFn(node);
        }
      }
      levelOrderList.push(level);
    }
    if (!callbackFn) {
      return levelOrderList;
    }
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
tree.insert(33);
tree.prettyPrint();
tree.delete(23);
tree.prettyPrint();
tree.find(4);
console.log(tree.levelOrder());

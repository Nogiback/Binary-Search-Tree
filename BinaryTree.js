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

  /* Implement 3 methods for depth-first traversal on the Binary Tree */

  // LEFT ROOT RIGHT TRAVERSAL
  inorder(callbackFn, node = this.root, inorderList = []) {
    if (node === null) {
      return;
    }

    this.inorder(callbackFn, node.left, inorderList);

    if (callbackFn) {
      callbackFn(node);
    } else {
      inorderList.push(node.data);
    }

    this.inorder(callbackFn, node.right, inorderList);

    if (inorderList.length > 0) {
      return inorderList;
    }
  }

  // ROOT LEFT RIGHT TRAVERSAL
  preorder(callbackFn, node = this.root, preorderList = []) {
    if (node === null) {
      return;
    }

    if (callbackFn) {
      callbackFn(node);
    } else {
      preorderList.push(node.data);
    }

    this.preorder(callbackFn, node.left, preorderList);
    this.preorder(callbackFn, node.right, preorderList);

    if (preorderList.length > 0) {
      return preorderList;
    }
  }

  // LEFT RIGHT ROOT TRAVERSAL
  postorder(callbackFn, node = this.root, postorderList = []) {
    if (node === null) {
      return;
    }

    this.postorder(callbackFn, node.left, postorderList);
    this.postorder(callbackFn, node.right, postorderList);

    if (callbackFn) {
      callbackFn(node);
    } else {
      postorderList.push(node.data);
    }

    if (postorderList.length > 0) {
      return postorderList;
    }
  }

  height(node = this.root) {
    if (node === null) {
      return 0;
    }
    const leftH = this.height(node.left);
    const rightH = this.height(node.right);

    return Math.max(leftH, rightH) + 1;
  }

  depth(inputNode, node = this.root, count = 0) {
    if (node === null) {
      return;
    }

    if (node.data === inputNode.data) {
      return count;
    }

    if (node.data > inputNode.data) {
      return this.depth(inputNode, node.left, count + 1);
    } else {
      return this.depth(inputNode, node.right, count + 1);
    }
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return;
    }
    const leftH = this.height(node.left);
    const rightH = this.height(node.right);
    const heightDiff = Math.abs(leftH - rightH);

    if (heightDiff > 1) {
      return false;
    } else {
      return true;
    }
  }

  rebalance() {
    const inorderList = this.inorder();
    this.root = this.buildTree(inorderList);
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

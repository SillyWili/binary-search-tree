class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    let set = new Set(array);
    let uniqueArr = [...set];
    uniqueArr.sort(function (a, b) {
      return a - b;
    });

    return this.#buildTreeRec(uniqueArr, 0, uniqueArr.length - 1);
  }

  insert(root, value) {
    if (root === null) {
      return new Node(value);
    }

    if (root.data === value) {
      return root;
    }

    if (value < root.data) {
      root.left = this.insert(root.left, value);
    } else if (value > root.data) {
      root.right = this.insert(root.right, value);
    }

    return root;
  }

  remove(root, value) {
    // first case where the node to delete is a leaf node with no children
    if (root.left === null && root.right === null && root.data === value) {
      return null;
    }

    // second case where the node to remove has a single child
    if (root.data === value && root.right !== null && root.left === null) {
      return root.right;
    }

    if (root.data === value && root.left !== null && root.right === null) {
      return root.left;
    }

    if (root.data === value && root.right !== null && root.left !== null) {
      let successor = this.#getSuccessor(root);

      root.data = successor.data;

      root.right = this.remove(root.right, successor.data);

      return root;
    }

    if (value < root.data) {
      root.left = this.remove(root.left, value);
    } else if (value > root.data) {
      root.right = this.remove(root.right, value);
    }

    return root;
  }

  #getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  #buildTreeRec(arr, start, end) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);

    let root = new Node(arr[mid]);
    // Left subtree
    root.left = this.#buildTreeRec(arr, start, mid - 1);
    // Right subtree
    root.right = this.#buildTreeRec(arr, mid + 1, end);

    return root;
  }
}

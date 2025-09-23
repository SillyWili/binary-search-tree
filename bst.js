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
    if (root === null) return root;

    if (value > root.data) {
      root.right = this.remove(root.right, value);
    } else if (value < root.data) {
      root.left = this.remove(root.left, value);
    } else {
      // If root has matches the value

      // root has 0 children, or only right child
      if (root.left === null) return root.right;

      // root has only left child
      if (root.right === null) return root.left;

      // root has both child
      let successor = this.#getSuccessor(root);
      root.data = successor.data;
      root.right = this.remove(root.right, successor.data);
    }
    return root;
  }

  find(node, value) {
    if (node === null) return null;

    if (node.data === value) return node;

    if (value > node.data) {
      return this.find(node.right, value);
    } else if (value < node.data) {
      return this.find(node.left, value);
    }

    return null;
  }

  levelOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }
    
    if (this.root === null) return;
    let queue = new Array();
    // Start of the queue
    queue.push(this.root);
    while (queue.length >= 1) {
      let current = queue[0];
      // Process the current node
      callback(current);
      // Queue the other nodes
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
      queue.shift(); // Removes the front
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
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  #getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
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

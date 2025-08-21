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

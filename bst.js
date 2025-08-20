class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    let set = new Set(array);
    let uniqueArr = [...set];
    uniqueArr.sort();

    return this.#buildTreeRec(uniqueArr, 0, uniqueArr.length - 1);
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

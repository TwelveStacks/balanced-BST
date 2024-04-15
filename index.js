class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);

    }

    buildTree(arr) {
        // Sort array and remove duplicate values
        arr = Array.from(new Set(arr.sort((a, b) => (a - b))));

        function buildBST(start, end) {
            if (start > end) {
                return null;
            }

            // Find middle
            let mid = Math.floor((start + end) / 2)

            // Create tree node with mid as root
            const node = new Node(arr[mid])

            node.left = buildBST(start, mid - 1)
            node.right = buildBST(mid + 1, end)

            return node
        }

        // Call the recursive function to build the tree
        return buildBST(0, arr.length - 1);
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array)
console.log(prettyPrint(tree.root))
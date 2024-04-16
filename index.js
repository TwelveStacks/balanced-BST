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

    insert(value) {
        const newNode = new Node(value)
        if (!this.root) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (!node.left) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if (!node.right) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }

        }
    }

    deleteItem(value) {
        if (!this.root) {
            return
        } else {
            this.removeNode(this.root, value)
        }
    }

    removeNode(node, value) {
        if (!node) {
            return null
        }

        if (value < node.data) {
            node.left = this.removeNode(node.left, value)
            return node
        }
        else if (value > node.data) {
            node.right = this.removeNode(node.right, value)
            return node
        } else {
            // Case 1: No children
            if (!node.left && !node.right) {
                return null;
            }

            // Case 2: One child
            if (!node.left && node.right) {
                return node.right
            } else if (!node.right && node.left) {
                return node.left
            }

            // Case 3: Node with two children, return the predecessor of the node
            let predecessor = this.findMinNode(node.left);
            node.data = predecessor.data;
            node.left = this.removeNode(node.left, predecessor.data)
            return node;
        }
    }

    findMinNode(node) {
        while (node.right !== null) {
            node = node.right
        }
        return node
    }

    find(value) {
        return this.findNode(this.root, value)
    }

    findNode(node, value) {
        if (!node) {
            return null
        }

        if (value === node.data) {
            return node
        } else if (value < node.data) {
            return this.findNode(node.left, value)
        } else {
            return this.findNode(node.right, value)
        }
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
tree.insert(2)
tree.insert(10)
tree.insert(66)
console.log(prettyPrint(tree.root))
console.log(tree.root)
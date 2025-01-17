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

    levelOrder(callback) {
        // If root node does not exist return empty array
        if (!this.root) {
            return [];
        }

        // Create array to visited nodes from queue
        const outputArray = [];
        // Create a queue with root node as first element
        const queue = [this.root];

        while (queue.length > 0) {
            let currentNode = queue.shift();

            if (callback) {
                callback(currentNode.data);
            } else {
                outputArray.push(currentNode.data);
            }

            if (currentNode.left) {
                queue.push(currentNode.left)
            }

            if (currentNode.right) {
                queue.push(currentNode.right)
            }
        }

        return outputArray
    }

    // function that returns the given node’s height. 
    // Height is defined as the number of edges in the 
    // longest path from a given node to a leaf node.
    height(node) {
        if (node === null) {
            return -1;
        }

        const leftSide = this.height(node.left)
        const rightSide = this.height(node.right)

        return Math.max(leftSide, rightSide) + 1
    }

    depth(node) {
        return this.calculateDepth(this.root, node, 0)
    }

    calculateDepth(currentNode, targetNode, currentDepth) {
        // If current node is null return -1
        if (!currentNode) {
            return -1
        }

        // If current node is the target node, return current depth
        if (currentNode === targetNode) {
            return currentDepth
        }

        // Recursively search left and right subtrees for target
        const leftDepth = this.calculateDepth(currentNode.left, targetNode, currentDepth + 1)
        const rightDepth = this.calculateDepth(currentNode.right, targetNode, currentDepth + 1)

        // Return the maximum depth
        return Math.max(leftDepth, rightDepth)
    }

    isBalanced() {
        return this.checkBalanced(this.root) !== -1;
    }

    checkBalanced(node) {
        // If node is null return 0
        if (!node) {
            return 0
        }

        // Check left and right heights
        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1; // Not balanced
        }

        // Recursively check left and right subtrees
        if (this.checkBalanced(node.left) === -1 || this.checkBalanced(node.right) === -1) {
            return -1; // Not balanced
        }

        // Return height of current node
        return Math.max(leftHeight, rightHeight) + 1;
    }

    rebalance() {
        const orderNodes = this.levelOrder();
        this.root = this.buildTree(orderNodes)
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
console.log(tree.isBalanced())
tree.rebalance()
console.log(prettyPrint(tree.root))
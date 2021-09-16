class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  printValue() {
    console.log(this.value);
  }
  print() {
    console.log(this);
  }
  traverse() {
    this.left && this.left.traverse();
    this.printValue();
    this.right && this.right.traverse();
  }
}

let tree = new Node(1);

tree.left = new Node(2);
tree.right = new Node(3);

tree.left.right = new Node(4);

tree.right.left = new Node(5);

// tree.print();

tree.traverse();

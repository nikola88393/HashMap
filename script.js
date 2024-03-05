// Factory function for creating nodes for hash sets
function nodeSet(key = null, nextNode = null) {
  return {
    key: key,
    nextNode: nextNode,
  };
}
//Factory fucntion for creating nodes of hash maps
function node(key = null, value = null, nextNode = null) {
  return {
    key: key,
    value: value,
    nextNode: nextNode,
  };
}
function LinkedList() {
  let headNode = null,
    tailNode = null;
  //Add elements to the end of the list
  const append = (key, value) => {
    const Node = node(key, value);

    if (headNode === null) {
      headNode = Node;
    } else {
      let currentNode = headNode;
      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = Node;
      tailNode = Node;
    }
  };
  //Add elements to the beggining of the list
  const prepend = (key, value) => {
    const Node = node(key, value);

    if (headNode === null) {
      headNode = node;
    } else {
      //   console.log("headNode nextNode is: " + headNode.nextNode.value);
      Node.nextNode = headNode;
      headNode = Node;
    }
  };
  //Return the numbers of elements stored in the list
  const size = () => {
    let currentNode = headNode;
    let size = 0;

    while (currentNode !== null) {
      currentNode = currentNode.nextNode;
      size++;
    }

    return size;
  };
  //Return the head of the list
  const head = () => {
    return headNode.value;
  };
  //Return the tail of the list
  const tail = () => {
    return tailNode.value;
  };
  //Return the vlaue of the element at the given index
  const at = (index) => {
    let currentNode = headNode;

    for (let i = 0; i < index; i++) {
      currentNode = currentNode.nextNode;
    }

    return currentNode.value;
  };

  const atNode = (index) => {
    let currentNode = headNode;

    for (let i = 0; i < index; i++) {
      currentNode = currentNode.nextNode;
    }

    return currentNode;
  };
  //Remove the last element of the list
  const pop = () => {
    let currentNode = headNode;
    while (currentNode.nextNode !== tailNode) {
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = null;
    tailNode = currentNode;
  };
  //Returns true if the passed in value is in the list and otherwise returns false
  const contains = (value) => {
    let contain = false;
    let currentNode = headNode;

    while (currentNode.nextNode !== null) {
      if (currentNode.value === value) {
        contain = true;
        break;
      }
      currentNode = currentNode.nextNode;
    }

    return contain;
  };

  const containsKey = (key) => {
    let contain = false;
    let currentNode = headNode;

    while (currentNode.nextNode !== null) {
      if (currentNode.key === key) {
        contain = true;
        break;
      }
      currentNode = currentNode.nextNode;
    }

    return contain;
  };
  //Returns true if the passed in value is in the list and otherwise returns false
  const find = (value) => {
    let currentNode = headNode;
    let index = 0;
    let containsAt = null;

    while (currentNode !== null) {
      if (currentNode.value === value) {
        // console.log("Value is: " + currentNode.value);
        containsAt = index;
        break;
      }
      index++;
      currentNode = currentNode.nextNode;
    }

    return containsAt;
  };
  const findKey = (key) => {
    let currentNode = headNode;
    let index = 0;
    let containsAt = null;

    while (currentNode !== null) {
      if (currentNode.key === key) {
        // console.log("Key is: " + currentNode.key);
        containsAt = index;
        break;
      }
      index++;
      currentNode = currentNode.nextNode;
    }

    return containsAt;
  };
  //Represent the objects in the list as strings
  const toString = () => {
    let string = "";
    let currentNode = headNode;

    while (currentNode !== null) {
      if (currentNode.value !== null) {
        string += `( '${currentNode.key}: ${currentNode.value}' ) -> `;
      } else {
        string += `( '${currentNode.key}') -> `;
      }

      currentNode = currentNode.nextNode;
    }
    string += "null";

    return string;
  };
  //Adds an element at a given index
  const insertAt = (index, key, value) => {
    if (index > size()) {
      console.log(size());
      throw "Index out of bounce!";
    } else {
      let prevNode = null;
      let currentNode = headNode;
      let newNode = node(key, value);
      for (let i = 0; i < index; i++) {
        if (i === index - 1 && index !== 0) {
          prevNode = currentNode;
        }
        currentNode = currentNode.nextNode;
      }
      newNode.nextNode = currentNode;
      if (prevNode !== null) {
        prevNode.nextNode = newNode;
      } else {
        headNode = newNode;
      }
    }
  };
  //Removes an element at a given index
  const removeAt = (index) => {
    if (index >= size()) {
      throw "Index out of bounce!";
    } else {
      let currentNode = headNode;
      let prevNode = null;
      for (let i = 0; i < index; i++) {
        if (i === index - 1 && index !== 0) {
          prevNode = currentNode;
        }
        currentNode = currentNode.nextNode;
      }
      if (prevNode !== null) {
        prevNode.nextNode = currentNode.nextNode;
      } else {
        headNode = currentNode.nextNode;
      }
      //   console.log(currentNode.value);
      if (index == size()) {
        tailNode = prevNode;
      }
    }
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    atNode,
    pop,
    contains,
    containsKey,
    find,
    findKey,
    toString,
    insertAt,
    removeAt,
  };
}
//Factory function for creating hash maps
function HashMap() {
  let buckets = [];
  let capacity = 16;
  const loadFactor = 0.7;

  //fucntion that returns the hash of a given key
  let hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= capacity;
    }

    return hashCode;
  };

  //function that sets a new key/value pair
  let set = (key, value) => {
    if (capacity * loadFactor < length()) {
      capacity *= 2;
    }

    let hashKey = hash(key);

    if (buckets[hashKey]) {
      if (buckets[hashKey].findKey(key) !== null) {
        let index = buckets[hashKey].findKey(key);
        buckets[hashKey].insertAt(index, key, value);
        buckets[hashKey].removeAt(index + 1);
      } else {
        buckets[hashKey].append(key, value);
      }
    } else {
      let list = LinkedList();
      list.append(key, value);
      buckets[hashKey] = list;
    }
  };

  //returns the value stored under this key or null if not found
  const get = (key) => {
    let hashKey = hash(key);
    if (buckets[hashKey]) {
      let index = buckets[hashKey].findKey(key);
      let value = buckets[hashKey].at(index);
      return value;
    } else {
      return null;
    }
  };

  // returns a boolean whether a key has been found in the hash table or not
  const has = (key) => {
    let hashKey = hash(key);
    if (buckets[hashKey]) {
      let index = buckets[hashKey].findKey(key);
      if (index !== null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  //removes a key/value pair and returns true if deleted and false if not found
  const remove = (key) => {
    let hashKey = hash(key);

    if (buckets[hashKey]) {
      let index = buckets[hashKey].findKey(key);
      if (index !== null) {
        buckets[hashKey].removeAt(index);
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  //returns the numbers of key/value paris in the hash table;
  const length = () => {
    let numOfElements = 0;

    buckets.forEach((bucket) => {
      numOfElements += bucket.size();
    });

    return numOfElements;
  };

  //clears the whole hash map
  const clear = () => {
    buckets.splice(0);
  };

  //returns all the keys in the hash table
  const keys = () => {
    let keys = [];

    buckets.forEach((bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        let node = bucket.atNode(i);
        keys.push(node.key);
      }
    });

    return keys;
  };

  // returns all the values in the hash table
  const values = () => {
    let values = [];

    buckets.forEach((bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        let node = bucket.atNode(i);
        values.push(node.value);
      }
    });

    return values;
  };

  //function that prints all the entries as key/value pairs
  const entries = () => {
    for (let i = 0; i < capacity; i++) {
      if (!buckets[i]) {
        console.log(i + ": ");
      } else {
        console.log(`${i}: ${buckets[i].toString()}`);
      }
    }
    console.log("capacity is: " + capacity);
  };

  return {
    hash,
    set,
    entries,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
  };
}
// let map = HashMap();
// map.set("nasfzxcasme", "15151");
// map.set("nameasd", "11");
// map.set("car", "15151");
// map.set("cAr", "15151");
// map.entries();
// console.log(map.get("caadadr"));
// console.log(map.has("car"));
// console.log(map.has("1313ada"));
// map.remove("cAr");
// map.entries();
// console.log("Number of elements is: " + map.length());
// // map.clear();
// // map.entries();
// // map.set("car", "15151");
// // map.set("cAr", "15151");
// // map.entries();
// console.log(map.keys());
// console.log(map.values());
// map.set("gay", "gaga");
// map.set("gay1", "gaga");
// map.set("gay2", "gaga");
// map.set("gay3", "gaga");
// map.set("gay4", "gaga");
// map.set("gay5", "gaga");
// map.set("gay6", "gaga");
// map.set("gay17", "gaga");
// map.set("gay21", "gaga");
// map.set("gay3314", "gaga");
// map.set("gay4123", "gaga");
// map.set("gay512", "gaga");
// map.entries();

function HashSet() {
  let buckets = [];
  let capacity = 16;
  const loadFactor = 0.7;

  //fucntion that returns the hash of a given key
  let hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= capacity;
    }

    return hashCode;
  };

  //function that sets a new key/value pair
  let set = (key) => {
    if (capacity * loadFactor < length()) {
      capacity *= 2;
    }

    let hashKey = hash(key);

    if (buckets[hashKey]) {
      if (buckets[hashKey].findKey(key) !== null) {
        let index = buckets[hashKey].findKey(key);
        buckets[hashKey].insertAt(index, key);
        buckets[hashKey].removeAt(index + 1);
      } else {
        buckets[hashKey].append(key);
      }
    } else {
      let list = LinkedList();
      list.append(key);
      buckets[hashKey] = list;
    }
  };

  // returns a boolean whether a key has been found in the hash table or not
  const has = (key) => {
    let hashKey = hash(key);
    if (buckets[hashKey]) {
      let index = buckets[hashKey].findKey(key);
      if (index !== null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  //removes a key and returns true if deleted and false if not found
  const remove = (key) => {
    let hashKey = hash(key);

    if (buckets[hashKey]) {
      let index = buckets[hashKey].findKey(key);
      if (index !== null) {
        buckets[hashKey].removeAt(index);
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  //returns the numbers of keys in the hash table;
  const length = () => {
    let numOfElements = 0;

    buckets.forEach((bucket) => {
      numOfElements += bucket.size();
    });

    return numOfElements;
  };

  //clears the whole hash map
  const clear = () => {
    buckets.splice(0);
  };

  //returns all the keys in the hash table
  const keys = () => {
    let keys = [];

    buckets.forEach((bucket) => {
      for (let i = 0; i < bucket.size(); i++) {
        let node = bucket.atNode(i);
        keys.push(node.key);
      }
    });

    return keys;
  };

  //function that prints all the entries as keys
  const entries = () => {
    for (let i = 0; i < capacity; i++) {
      if (!buckets[i]) {
        console.log(i + ": ");
      } else {
        console.log(`${i}: ${buckets[i].toString()}`);
      }
    }
    console.log("capacity is: " + capacity);
  };

  return {
    hash,
    set,
    entries,
    has,
    remove,
    length,
    clear,
    keys,
  };
}

let set = HashSet();
set.set("nasfzxcasme");
set.set("nameasd");
set.set("car");
set.set("cAr");
set.entries();
console.log(set.has("car"));
console.log(set.has("1313ada"));
set.remove("cAr");
set.entries();
console.log("Number of elements is: " + set.length());
// map.clear();
// map.entries();
// map.set("car", "15151");
// map.set("cAr", "15151");
// map.entries();
console.log(set.keys());
set.set("gay");
set.set("gay1");
set.set("gay2");
set.set("gay3");
set.set("gay4");
set.set("gay5");
set.set("gay6");
set.set("gay17");
set.set("gay21");
set.set("gay331");
set.set("gay4123");
set.set("gay512");
set.entries();

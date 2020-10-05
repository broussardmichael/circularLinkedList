module.exports = (function(){
    let module = require("../linkedList/linkedList");
    let linkedList = new module;

    class CircularLinkedList {
        constructor(head = null) {
            this.head = head;
            this.deleteNode = deleteNode;
            this.getNodeCountFromList = getNodeCountFromList;
            this.isTheNodeInTheListByData = isTheNodeInTheListByData;
        }
    }

    function validateNodeArgumentForOperations(node) {
        if (node == null)
            throw "A node is required to perform operations."
    }

    function validateListArgumentForOperations(list) {
        if (list.head == null)
            throw "List hasn't been constructed. Build a list before work can be done."
    }

    function deleteNode(node){
        let list = this;
        validateNodeArgumentForOperations(node);
        validateListArgumentForOperations(list);

        if (!list.isTheNodeInTheListByData(node))
            throw "Unable to delete node, the node was not found in the list by its data.";

        if (list.getNodeCountFromList() === 1) {
            list.head = null;
        } else {
            let nextNode = node.nextNode, prevNode = node.prevNode;
            if (node.data === list.head.data)
                list.head = nextNode;

            prevNode = node.prevNode;
            prevNode.nextNode = nextNode;
            nextNode.prevNode = prevNode;
        }
        node = null;
        delete node;
    }

    function getNodeCountFromList(){
        let list = this;
        validateListArgumentForOperations(list);

        let node = list.head;
        let count = 1;
        while (node.nextNode.data !== list.head.data) {
            node = node.nextNode;
            count++;
        }
        return count;
    }

    function isTheNodeInTheListByData(node){
        let list = this, found = false;
        let currentNode = list.head;

        validateNodeArgumentForOperations(node);
        validateListArgumentForOperations(list);

        let listLengthByNodes = list.getNodeCountFromList();

        for(let i = 0; i < listLengthByNodes; i++) {
            if (currentNode.data === node.data) {
                found = true;
                break;
            } else {
                currentNode = currentNode.nextNode;
            }
        }

        return found
    }

    return {
        createCircularLinkedListFromDataArray: function (dataArray){
        let list = linkedList.createLinkedListFromDataArray(dataArray);
        let tailNode = list.getTailNode();
        list.head.prevNode = tailNode;
        tailNode.nextNode = list.head;

        return new CircularLinkedList(list.head);
        }
    }
});
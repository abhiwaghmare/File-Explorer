export const insertNode = (tree, nodeId, name, isFolder) => {
  if (tree.id === nodeId) {
    tree.items.unshift({
      id: new Date().getTime(),
      name,
      isFolder,
      items: [],
    });
    return tree;
  }
  let newTree = [];
  newTree = tree.items.map((node) => {
    return insertNode(node, nodeId, name, isFolder);
  });
  const updatedTree = { ...tree, items: newTree };
  return updatedTree;
};

export const deleteNode = (tree, nodeId) => {
  if (tree.id === nodeId) {
    return null;
  }
  const newItems = tree.items
    .map((item) => deleteNode(item, nodeId))
    .filter((item) => item !== null);
  return { ...tree, items: newItems };
};

export const renameNode = (tree, nodeId, newName) => {
  if (tree.id === nodeId) {
    return { ...tree, name: newName };
  }
  const newItems = tree.items.map((item) => renameNode(item, nodeId, newName));
  return { ...tree, items: newItems };
};

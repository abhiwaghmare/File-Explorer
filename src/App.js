import { useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import explorer from "./data/folderData";
import { insertNode, deleteNode, renameNode } from "./Utils/treeOperations";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId) => {
    const finalTree = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  };

  const handleRenameNode = (folderId,newName) => {
    const finalTree = renameNode(explorerData, folderId, newName);
    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
        explorer={explorerData}
      />
    </div>
  );
}

export default App;

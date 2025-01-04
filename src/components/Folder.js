import React, { useState, useEffect, useRef } from "react";
const Folder = ({
  explorer,
  handleInsertNode = () => {},
  handleDeleteNode = () => {},
  handleRenameNode = () => {},
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const [showOptions, setShowOptions] = useState(false);
  const listContainerRef = useRef(null);

  const handleOptions = (e) => {
    e.preventDefault();
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        listContainerRef.current &&
        !listContainerRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleButtonClick = (e, isFolder, nodeId) => {
    e.stopPropagation();
    setShowOptions(false);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const handleAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer?.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
      setExpand(true);
    }
  };

  const handleDeleteFolder = (e) => {
    e.preventDefault();
    handleDeleteNode(explorer?.id);
    setShowInput({ ...showInput, visible: false });
  };

  const handleRename = (e) => {
    e.preventDefault();
    setShowOptions(false);
    setShowInput({ visible: true, isFolder: null });
  };

  const handleRenameFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleRenameNode(explorer?.id, e.target.value);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer?.isFolder) {
    return (
      <div style={{ marginLeft: "25px" }}>
        <div
          className="folder"
          onContextMenu={(e) => handleOptions(e)}
          onClick={() => {
            setExpand(!expand);
            setShowOptions(false);
          }}
        >
          <span>
            📁
            {showInput.visible && showInput.isFolder === null ? (
              <input
                type="text"
                autoFocus
                defaultValue={explorer?.name}
                onBlur={() => {
                  setShowInput({ ...showInput, visible: false });
                }}
                onKeyDown={(e) => handleRenameFolder(e)}
              ></input>
            ) : (
              explorer?.name
            )}
          </span>
        </div>
        {showOptions && (
          <div className="list-container">
            <ul className="list" ref={listContainerRef}>
              <li onClick={(e) => handleButtonClick(e, true)}>New Folder</li>
              <li onClick={(e) => handleButtonClick(e, false)}>New File</li>
              <li onClick={(e) => handleRename(e)}>Rename</li>
              <li onClick={(e) => handleDeleteFolder(e)}>Delete</li>
            </ul>
          </div>
        )}
        {showInput.visible && showInput.isFolder !== null && (
          <div style={{ marginLeft: "25px" }}>
            {showInput.isFolder ? <span>📁</span> : <span>📄</span>}
            <input
              type="text"
              autoFocus
              onBlur={() => {
                setShowInput({ ...showInput, visible: false });
              }}
              onKeyDown={(e) => handleAddFolder(e, showInput.isFolder)}
            ></input>
          </div>
        )}
        {expand &&
          explorer?.items?.map((exp) => {
            return (
              <Folder
                key={exp.id}
                explorer={exp}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleRenameNode={handleRenameNode}
              />
            );
          })}
      </div>
    );
  }
  return (
    <div style={{ marginLeft: "25px" }}>
      <div
        className="file"
        onContextMenu={(e) => handleOptions(e)}
        onClick={() => {
          setExpand(!expand);
          setShowOptions(false);
        }}
      >
        <span>
          📄
          {showInput.visible && showInput.isFolder === null ? (
            <input
              type="text"
              autoFocus
              defaultValue={explorer?.name}
              onBlur={() => {
                setShowInput({ ...showInput, visible: false });
              }}
              onKeyDown={(e) => handleRenameFolder(e)}
            ></input>
          ) : (
            explorer?.name
          )}
        </span>
      </div>
      {showOptions && (
        <div className="list-container">
          <ul className="list" ref={listContainerRef}>
            <li onClick={(e) => handleRename(e)}>Rename</li>
            <li onClick={(e) => handleDeleteFolder(e)}>Delete</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Folder;

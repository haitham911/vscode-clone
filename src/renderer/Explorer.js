import React, { useState } from 'react';

function Explorer({ onFolderSelect }) {
    const [folderPath, setFolderPath] = useState('');

    const selectFolder = async () => {
        const result = await window.electron.selectFolder();
        if (result) {
            setFolderPath(result.folderPath);
            onFolderSelect(result.folderContent);
        }
    };

    return (
        <div style={{ width: '200px', background: '#333', color: '#fff', padding: '10px' }}>
            <button onClick={selectFolder}>Select Folder</button>
            {folderPath && <h4>{folderPath}</h4>}
        </div>
    );
}

export default Explorer;

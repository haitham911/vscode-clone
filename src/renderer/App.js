import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Explorer from './Explorer';
import CardView from './CardView';

function App() {
    const [folderContent, setFolderContent] = useState([]);
    const [serverURL, setServerURL] = useState('');

    useEffect(() => {
        const loadStorage = async () => {
            const storage = await window.electron.getStorage();
            if (storage.serverURL) {
                setServerURL(storage.serverURL);
            }
            if (storage.lastFolderPath) {
                loadFolderContent(storage.lastFolderPath);
            }
        };

        loadStorage();
    }, []);

    const loadFolderContent = async (folderPath) => {
        const result = await window.electron.selectFolder();
        if (result) {
            setFolderContent(result.folderContent);
        }
    };

    const handleFolderContent = (content) => {
        setFolderContent(content);
    };

    const handleServerURLChange = (e) => {
        setServerURL(e.target.value);
        window.electron.setServerURL(e.target.value);
    };

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ padding: '10px', background: '#333', color: '#fff' }}>
                <label>
                    Server URL:
                    <input
                        type="text"
                        value={serverURL}
                        onChange={handleServerURLChange}
                        style={{ width: '100%' }}
                    />
                </label>
                <Explorer onFolderSelect={handleFolderContent} />
            </div>
            <CardView folderContent={folderContent} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';

function CardView({ folderContent }) {
    const handleUpload = async (filePath) => {
        const formData = new FormData();
        formData.append('file', new File([filePath], 'image.jpg'));

        const storage = await window.electron.getStorage();
        const serverURL = storage.serverURL || 'http://localhost:3000';

        try {
            const response = await fetch(`${serverURL}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('File uploaded successfully');
            } else {
                console.error('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div style={{ flex: 1, padding: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {folderContent.map(item => (
                <div key={item.path} style={{
                    width: '150px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '10px',
                    textAlign: 'center'
                }}>
                    {item.isDirectory ? '📁' : (
                        <>
                            <img
                                src={`file://${item.path}`}
                                alt={item.name}
                                style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                            />
                            <button onClick={() => handleUpload(item.path)} style={{ marginTop: '10px' }}>Upload</button>
                        </>
                    )}
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
}

export default CardView;

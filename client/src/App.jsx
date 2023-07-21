import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scrapeUrl = async () => {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/scrape', { url });
        setText(response.data.text);
        setImageUrls(response.data.imageUrls);
      } catch (error) {
        console.error('Error scraping:', error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      // Scrape the URL when the component mounts or when the URL changes
      scrapeUrl();
    }
  }, [url]);

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to scrape"
      />
      <button onClick={() => setUrl('')} disabled={loading}>
        {loading ? 'Scraping...' : 'Scrape'}
      </button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {text && <div>{text}</div>}

          {imageUrls.length > 0 && (
            <div>
              <h2>Image URLs:</h2>
              <ul>
                {imageUrls.map((url, index) => (
                  <li key={index}>{url}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

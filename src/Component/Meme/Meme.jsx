import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import styles from './Meme.module.css';

const Meme = () => {
  const [meme, setMeme] = React.useState({
    topText: '',
    bottomText: '',
    randomImage: 'https://i.imgflip.com/30b1gx.jpg',
  });

  const [allMemeImages, setAllMemeImages] = React.useState([]);
  const memeRef = useRef(null); // Reference to the meme container

  React.useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => setAllMemeImages(data));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function generateMeme() {
    const len = allMemeImages.data.memes;
    const random = Math.floor(Math.random() * len.length);
    const url = len[random].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function downloadMeme() {
    const memeNode = memeRef.current;
  
    // Ensure consistent dimensions for the meme container
    memeNode.style.height = 'auto';
    memeNode.style.overflow = 'visible';
  
    toPng(memeNode, {
      cacheBust: true,
      pixelRatio: 2, // Higher resolution for better quality
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error generating image:', err);
      });
  }
  
  

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <div className={styles.top}>
          <label htmlFor="top">Top Text</label>
          <input
            type="text"
            name="topText"
            id="top"
            value={meme.topText}
            onChange={handleChange}
          />
        </div>

        <div className={styles.top}>
          <label htmlFor="bottom">Bottom Text</label>
          <input
            type="text"
            name="bottomText"
            id="bottom"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
      </div>

      <button onClick={generateMeme}>Get a New Meme Image 🖼</button>
      <button onClick={downloadMeme}>Download Meme 🖼</button>

      <div className={styles.meme} ref={memeRef}>
        <img src={meme.randomImage} className={styles.meme__image} alt="Meme" />
        <h2 className={`${styles.meme__text} ${styles.top}`}>{meme.topText}</h2>
        <h2 className={`${styles.meme__text} ${styles.bottom}`}>{meme.bottomText}</h2>
      </div>
    </div>
  );
};

export default Meme;

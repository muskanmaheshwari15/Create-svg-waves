import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GenerateWave from './components/GenerateWave';
import SavedWaves from './components/SavedWaves';
import WaveControls from './components/WaveControls';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

const App = () => {
    const [svgCode, setSvgCode] = useState('');
    const [svgs, setSvgs] = useState([]);
    const [waveColor, setWaveColor] = useState('#00f');
    const [isFlipped, setIsFlipped] = useState(false);
    const [waveHeight, setWaveHeight] = useState(200);
    const [waveDesign, setWaveDesign] = useState('design1');

    useEffect(() => {
        const fetchSVGs = async () => {
            const response = await axios.get('http://localhost:5000/api/svg');
            setSvgs(response.data);
        };
        fetchSVGs();
    }, []);

    const saveSVG = async () => {
        if (svgCode) {
            const response = await axios.post('http://localhost:5000/api/svg', { svgCode });
            setSvgs([...svgs, response.data]);
        }
    };

    const downloadSVG = (code) => {
        const element = document.createElement("a");
        const file = new Blob([code], { type: 'image/svg+xml' });
        element.href = URL.createObjectURL(file);
        element.download = "wave.svg";
        document.body.appendChild(element);
        element.click();
    };

    const copySVG = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            alert("SVG copied to clipboard!");
        });
    };

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow p-8 bg-gray-100">
                <GenerateWave 
                    setSvgCode={setSvgCode} 
                    waveColor={waveColor} 
                    isFlipped={isFlipped} 
                    waveHeight={waveHeight} 
                    waveDesign={waveDesign} 
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={saveSVG} disabled={!svgCode}>Save SVG</button>
                <WaveControls 
                    waveColor={waveColor} 
                    setWaveColor={setWaveColor} 
                    isFlipped={isFlipped} 
                    toggleFlip={toggleFlip} 
                    waveHeight={waveHeight} 
                    setWaveHeight={setWaveHeight} 
                    waveDesign={waveDesign} 
                    setWaveDesign={setWaveDesign} 
                />
                <div className="mt-8">
                    <h3 className="text-xl font-semibold">Generated SVG:</h3>
                    <div className="mt-4" dangerouslySetInnerHTML={{ __html: svgCode }} />
                    {svgCode && (
                        <div className="mt-4">
                            <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={() => downloadSVG(svgCode)}>Download SVG</button>
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => copySVG(svgCode)}>Copy SVG</button>
                        </div>
                    )}
                </div>
                <SavedWaves svgs={svgs} downloadSVG={downloadSVG} copySVG={copySVG} />
            </div>
            <Footer />
        </div>
    );
};

export default App;

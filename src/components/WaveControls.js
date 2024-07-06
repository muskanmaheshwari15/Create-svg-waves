import React from 'react';

const WaveControls = ({ waveColor, setWaveColor, isFlipped, toggleFlip, waveHeight, setWaveHeight, waveDesign, setWaveDesign }) => {
    return (
        <div className="space-y-4">
            <div className="form-group">
                <label htmlFor="colorPicker">Choose Wave Color: </label>
                <input type="color" id="colorPicker" value={waveColor} onChange={(e) => setWaveColor(e.target.value)} className="ml-2"/>
            </div>
            <div className="form-group">
                <label htmlFor="waveHeight">Wave Height: </label>
                <input type="number" id="waveHeight" value={waveHeight} onChange={(e) => setWaveHeight(e.target.value)} className="ml-2"/>
            </div>
            <div className="form-group">
                <label htmlFor="waveDesign">Wave Design: </label>
                <select id="waveDesign" value={waveDesign} onChange={(e) => setWaveDesign(e.target.value)} className="ml-2">
                    <option value="design1">Design 1</option>
                    <option value="design2">Design 2</option>
                </select>
            </div>
            <button className="bg-purple-500 text-white px-4 py-2 rounded" onClick={toggleFlip}>{isFlipped ? "Unflip Wave" : "Flip Wave"}</button>
        </div>
    );
};

export default WaveControls;

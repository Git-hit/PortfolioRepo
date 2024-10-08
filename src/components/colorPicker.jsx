import { useState } from 'react';

const ColorPicker = (props) => {
  const [color, setColor] = useState('#000000');

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div {...props}>
      <input 
        type="color" 
        value={color} 
        onChange={handleColorChange} 
      />
      <p>Selected Color: {color}</p>
    </div>
  );
};

export default ColorPicker;
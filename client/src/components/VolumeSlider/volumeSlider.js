import React from 'react';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';


export default function ContinuousSlider() {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="volumeSlider">
          <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
    </div>
  );
}

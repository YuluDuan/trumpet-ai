import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

interface SliderComponentProps {
  max: number;
  label: string;
  isLast: boolean;
}

const SliderComponent = ({ max, label, isLast }: SliderComponentProps) => {
  return (
    <div className={`SliderComponent-container ${isLast ? "last" : ""}`}>
      <div className="SliderComponent-label">{label}</div>

      <div className="Slider-component">
        <span>0</span>
        <Box sx={{ width: 100 }}>
          <Slider
            aria-label={label}
            defaultValue={0}
            step={1}
            valueLabelDisplay="auto"
            min={0}
            max={max}
          />
        </Box>
        <span className="w-33">{max}</span>
      </div>
    </div>
  );
};

export default SliderComponent;

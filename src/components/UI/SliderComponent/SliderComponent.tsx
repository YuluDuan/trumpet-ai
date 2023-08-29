"use client";

import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

interface SliderComponentProps {
  max: number;
  label: string;
  isLast: boolean;
  defaultValue: number;
}

const CustomSlider = styled(Slider)({
  height: 4,
  width: 100,
  "& .MuiSlider-track": {
    border: "none",
    backgroundColor: "#333333",
  },
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "#E6E8EC",
  },
  "& .MuiSlider-thumb": {
    height: 10,
    width: 10,
    backgroundColor: "#333333",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    top: -6,
    fontSize: 12,
    fontWeight: 400,
    color: "black",
    fontFamily: "Quicksand",
    background: "unset",
    padding: 0,
    backgroundColor: "unset",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const SliderComponent = ({
  max,
  label,
  isLast,
  defaultValue,
}: SliderComponentProps) => {
  return (
    <div className={`SliderComponent-container ${isLast ? "last" : ""}`}>
      <div className="SliderComponent-label">{label}</div>

      <div className="Slider-component">
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <span>0</span>
          <Box sx={{ width: 100 }}>
            <CustomSlider
              aria-label={label}
              defaultValue={defaultValue}
              step={1}
              valueLabelDisplay="auto"
              min={0}
              max={max}
            />
          </Box>
          <span className="w-33">{max}</span>
        </Stack>
      </div>
    </div>
  );
};

export default SliderComponent;

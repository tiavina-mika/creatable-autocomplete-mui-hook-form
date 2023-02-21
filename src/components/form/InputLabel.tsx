import { FC, ReactNode } from "react";

import { styled, SxProps, Theme, Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import InfoIcon from "@mui/icons-material/Info";

const StyledFixedLabelText = styled("span")({
  marginRight: 6
});

const StyledRequiredLabel = styled("span")({
  color: grey[500],
  marginRight: 6,
  marginLeft: 6
});

type Props = {
  label?: string | ReactNode;
  tooltip?: string;
  sx?: SxProps<Theme>;
  required?: boolean;
};

const InputLabel: FC<Props> = ({ label, sx, tooltip, required }) => {
  return (
    <Typography
      sx={{ mb: 0.8, display: "flex", alignItems: "center", ...(sx ? sx : {}) }}
    >
      <StyledFixedLabelText>{label}</StyledFixedLabelText>{" "}
      {tooltip && (
        <Tooltip title={tooltip} placement="top">
          <span className="flexColumn">
            <InfoIcon />
          </span>
        </Tooltip>
      )}
      {required && <StyledRequiredLabel>(Required)</StyledRequiredLabel>}
    </Typography>
  );
};

export default InputLabel;

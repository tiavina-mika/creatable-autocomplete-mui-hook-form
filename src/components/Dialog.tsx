import { FC, MouseEventHandler, ReactNode } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Box,
  IconButton,
  styled,
  Toolbar,
  Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import MUIDialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const StyledDialog = styled(MUIDialog)(({ theme }) => ({
  "& .MuiDialog-root": {
    padding: theme.spacing(1.5)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

type Props = {
  title: string;
  description?: string | ReactNode;
  open?: boolean;
  toggle?: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonAction?: () => void;
  formId?: string;
  content?: ReactNode;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  buttonColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
} & DialogProps;

const Dialog: FC<Props> = ({
  title,
  description,
  open,
  toggle,
  content,
  onPrimaryButtonAction,
  primaryButtonText,
  secondaryButtonText,
  formId,
  maxWidth,
  onClick,
  children,
  buttonColor = "primary",
  ...dialogProps
}) => {
  const handlePrimaryButtonAction = () => {
    if (onPrimaryButtonAction) onPrimaryButtonAction();
    if (!toggle) return;
    toggle();
  };

  const closeIcon = (
    <IconButton
      edge="start"
      color="inherit"
      onClick={toggle}
      aria-label="close"
    >
      <CloseIcon />
    </IconButton>
  );

  return (
    <StyledDialog
      {...dialogProps}
      open={!!open}
      onClose={toggle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={maxWidth}
      onClick={onClick}
    >
      {dialogProps.fullScreen ? (
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            {closeIcon}
            <Box
              sx={{ ml: 2, flex: 1, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h6" component="div">
                {title}
              </Typography>
              {description && (
                <Typography variant="body2">{description}</Typography>
              )}
            </Box>
            <Button
              type="submit"
              form={formId}
              variant="outlined"
              color="primary"
              sx={{ backgroundColor: "#fff" }}
            >
              {primaryButtonText ?? "Save"}
            </Button>
          </Toolbar>
        </AppBar>
      ) : (
        <DialogTitle id="alert-dialog-title">
          <div className="flexRow spaceBetween center">
            <Typography variant="h5">{title}</Typography>
            {closeIcon}
          </div>
        </DialogTitle>
      )}
      <DialogContent>
        {/* description */}
        {description && !dialogProps.fullScreen && (
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        )}

        {/* main content */}
        {children ?? content}
      </DialogContent>
      {!dialogProps.fullScreen && (
        <DialogActions>
          {/* cancel button */}
          <Button
            onClick={toggle}
            color="inherit"
            sx={{ textTransform: "capitalize", fontWeight: 500 }}
          >
            {secondaryButtonText ?? "Cancel"}
          </Button>

          {/* confirm button */}
          {onPrimaryButtonAction && (
            <Button
              onClick={handlePrimaryButtonAction}
              autoFocus
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              {primaryButtonText ?? "Confirm"}
            </Button>
          )}

          {/* form button */}
          {formId && (
            <Button
              type="submit"
              form={formId}
              color={buttonColor}
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              {primaryButtonText ?? "Save"}
            </Button>
          )}
        </DialogActions>
      )}
    </StyledDialog>
  );
};

export default Dialog;

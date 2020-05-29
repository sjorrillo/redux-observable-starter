import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { isString } from '../../../common/utils/type-of';

export interface ISnackbarArgs {
  message: string;
  duration?: number;
  sticky?: boolean;
  actionLabel?: string;
  onActionClick?: () => void;
  onClose?: () => void;
}

interface ISnackbar {
  show: {
    (message: string): void;
    (descriptor: ISnackbarArgs): void;
  };
}

const autoHideDuration = 5000;
let counter = 0;
let $mountPoint;

const getMountPoint = () => {
  if ($mountPoint === undefined) {
    $mountPoint = document.createElement('div');
    $mountPoint.setAttribute('id', 'snackbar');
    document.querySelector('#wideElements').append($mountPoint);
  }
  return $mountPoint;
};

const messageQueue = {
  get currentDescriptor() {
    return getMountPoint().querySelector('.MuiSnackbar-root');
  },
  pendingQueue: [],
  renderMessage(descriptor: ISnackbarArgs & { id: number }) {
    const $mp = getMountPoint();
    if (!descriptor) {
      unmountComponentAtNode($mp);
      return;
    }

    const { id, message, duration, sticky, actionLabel, onActionClick, onClose } = descriptor;
    const handleClose = () => {
      onClose && onClose();
      this.shift();
    };

    const handleActionClick = () => {
      onActionClick && onActionClick();
      this.shift();
    };

    const theLabel = actionLabel || '';
    const actionStyle = !actionLabel ? { display: 'none' } : {}; // This is a hack to avoid braking the button styles

    render(
      <Snackbar
        key={id}
        action={
          <>
            <Button color="secondary" onClick={handleActionClick} size="small" style={actionStyle}>
              {theLabel}
            </Button>
            <IconButton aria-label="close" color="inherit" onClick={handleClose} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
        autoHideDuration={sticky ? null : duration || autoHideDuration}
        message={message}
        onClose={handleClose}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
        open
      />,
      $mp
    );
  },
  push(descriptor: ISnackbarArgs) {
    if (!this.currentDescriptor) {
      this.renderMessage(descriptor);
      return;
    }
    this.pendingQueue.push(descriptor);
  },
  shift() {
    const descriptor = this.pendingQueue.shift();
    this.renderMessage(descriptor);
  },
};

const snackbar: ISnackbar = {
  show: (descriptorOrMessage: string | ISnackbarArgs) => {
    const descriptor = isString(descriptorOrMessage)
      ? { message: descriptorOrMessage }
      : descriptorOrMessage;
    messageQueue.push({ ...(descriptor as ISnackbarArgs), id: counter++ } as ISnackbarArgs);
  },
};

export default snackbar;

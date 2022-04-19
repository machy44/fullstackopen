import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Button } from 'ui';

export const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <Button type="button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button type="button" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;

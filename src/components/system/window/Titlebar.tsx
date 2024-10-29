import { MinimizeIcon } from '../taskbar/icons';
import { MaximizeIcon } from '../taskbar/icons';
import { CloseIcon } from '../taskbar/icons';
import { Dispatch, SetStateAction, useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import { motion } from 'framer-motion';

type TitlebarProps = {
  icon: string;
  title: string;
  ResumeExpand: {
    expand: boolean;
    show: boolean;
    hide: boolean;
    focusItem: boolean;
    x: number;
    y: number;
    item_1Focus: boolean;
  };
  setResumeExpand: Dispatch<
    SetStateAction<{
      expand: boolean;
      show: boolean;
      hide: boolean;
      focusItem: boolean;
      x: number;
      y: number;
      item_1Focus: boolean;
    }>
  >;
};

const Titlebar = ({
  icon,
  title,
  ResumeExpand,
  setResumeExpand,
  resetPosition
}: TitlebarProps) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const { inlineStyleExpand, inlineStyle, deleteTap } = userContext;

  function handleExpandStateToggle() {
    setResumeExpand((prevState) => ({
      ...prevState,
      expand: !prevState.expand
    }));
    console.log('handle expand triggered');
  }

  function handleClose() {
    // Reset position and handle close actions
    resetPosition();
    deleteTap(title);
  }

  return (
    <header className="titlebarHeader draggable-titlebar">
      <h1
        style={
          ResumeExpand.expand ? inlineStyleExpand('Type') : inlineStyle('Type')
        }
      >
        <figure>
          <img src={icon} alt={title} draggable={false} />
          <figcaption>{title}</figcaption>
        </figure>
      </h1>
      <nav className="cancel">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setResumeExpand((prev) => ({
              ...prev,
              hide: true,
              focusItem: false
            }));
          }}
        >
          <MinimizeIcon />
        </button>
        <button
          onClick={() => {
            handleExpandStateToggle();
          }}
          type="button"
        >
          <MaximizeIcon />
        </button>
        <button
          type="button"
          className="close"
          onClick={() => {
            // console.log('closed clicked');
            // deleteTap('Resume');
            handleClose();
          }}
        >
          <CloseIcon />
        </button>
      </nav>
    </header>
  );
};

export default Titlebar;

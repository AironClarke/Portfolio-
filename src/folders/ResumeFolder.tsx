import { useContext, useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import Titlebar from 'src/components/system/window/Titlebar';
import { UserContext } from 'src/context/UserContext';
import useResizable from 'src/hooks/useResizable';
import rndDefaults from 'src/utils/rndDefaults';
import useDraggable from 'src/hooks/useDraggable';

function ResumeFolder() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const {
    ResumeExpand,
    setResumeExpand,
    inlineStyleExpand,
    inlineStyle,
    handleSetFocusItemTrue,
    folderCount,
    setFolderCount
  } = userContext;

  const maximized = ResumeExpand.expand;
  //  TODO: make window not draggable when its hidden
  // const test = ResumeExpand.hide;
  const folderOffset = useRef<number | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // New state

  useEffect(() => {
    if (ResumeExpand.show) {
      if (folderOffset.current === null) {
        setFolderCount((prev) => prev + 1); // Update shared folder count
        folderOffset.current = folderCount * 26; // Calculate and store unique offset for this instance
      }
      setIsInitialized(true); // Trigger rendering only after offset is set
    } else {
      // Reset offset and movement tracking on close
      if (folderOffset.current !== null) {
        setFolderCount((prev) => prev - 1);
        folderOffset.current = null;
        setHasMoved(false);
        setIsInitialized(false); // Reset initialization on close
      }
    }
  }, [ResumeExpand.show]);

  const { height, width, updateSize } = useResizable(maximized);
  const { x, y, updatePosition, resetPosition } = useDraggable(maximized);

  // Conditionally apply the offset only if the window has not been moved
  const offsetX = hasMoved ? x : x + (folderOffset.current || 0);
  const offsetY = hasMoved ? y : y + (folderOffset.current || 0);

  // Render component only after initialization
  if (!isInitialized) return null;

  return (
    <Rnd
      dragHandleClassName="draggable-titlebar"
      disableDragging={maximized}
      enableResizing={!maximized}
      size={{ height, width }}
      onResizeStop={updateSize}
      position={{ x: offsetX, y: offsetY }}
      onDragStop={(e, data) => {
        updatePosition(e, data);
        if (!hasMoved) setHasMoved(true); // Mark as moved permanently
      }}
      {...rndDefaults}
      className="window"
      style={
        ResumeExpand.expand
          ? inlineStyleExpand('Resume')
          : inlineStyle('Resume')
      }
      onDragStart={() => handleSetFocusItemTrue('Resume')}
    >
      <section
        className="titlebarContainer"
        onClick={() => handleSetFocusItemTrue('Resume')}
      >
        <Titlebar
          icon="folderTest.svg"
          title="Resume"
          ResumeExpand={ResumeExpand}
          setResumeExpand={setResumeExpand}
          resetPosition={resetPosition} // Pass resetPosition to Titlebar
        />
        <h1>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio culpa
          nesciunt error odit, magni quam id dolorum, dolore expedita iste cum
          numquam nostrum eius ut necessitatibus sunt autem, animi aliquam.
        </h1>
      </section>
    </Rnd>
  );
}

export default ResumeFolder;

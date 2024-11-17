import React, { useState, useEffect, useRef, useCallback } from 'react';
import GridLayout from 'react-grid-layout';
import WidgetOne from './widgets/WidgetOne';
import WidgetTwo from './widgets/WidgetTwo';
import WidgetThree from './widgets/WidgetThree';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './App.css';

const App: React.FC = () => {
  // Function to calculate the row height based on the window height
  // This ensures that the grid layout adapts to the available vertical space
  const calculateRowHeight = useCallback(() => {
    const titleHeight = 50; // Adjust this value based on the actual height of your title
    const availableHeight = window.innerHeight - titleHeight;
    return availableHeight / 3; // Assuming you want 3 rows to fill the height
  }, []);

  // State to store the calculated row height
  const [rowHeight, setRowHeight] = useState(calculateRowHeight());

  // Initial layout configuration for the grid
  // Each widget is assigned a position and size in the grid
  const [layout, setLayout] = useState([
    { i: 'widget1', x: 0, y: 0, w: 1, h: 1 },
    { i: 'widget2', x: 1, y: 0, w: 1, h: 1 },
    { i: 'widget3', x: 2, y: 0, w: 1, h: 1 },
  ]);

  // Refs to access the DOM elements of the widgets
  // These are used to measure the content height of each widget
  const widgetRefs = {
    widget1: useRef<HTMLDivElement>(null),
    widget2: useRef<HTMLDivElement>(null),
    widget3: useRef<HTMLDivElement>(null),
  };

  // Effect to handle window resize events
  // This ensures that the row height is recalculated when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setRowHeight(calculateRowHeight());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateRowHeight]);

  // Function to update the layout based on the content height of the widgets
  // This ensures that the grid items resize to fit their content
  const updateLayout = useCallback(() => {
    setLayout((prevLayout) =>
      prevLayout.map((item) => {
        const widgetRef = widgetRefs[item.i as keyof typeof widgetRefs].current;
        if (widgetRef) {
          const contentHeight = widgetRef.scrollHeight;
          const minH = Math.ceil(contentHeight / rowHeight);
          return { ...item, h: minH, minH };
        }
        return item;
      })
    );
  }, [rowHeight]);

  // Effect to observe changes in the size of the widgets
  // This ensures that the layout is updated when the content of the widgets changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateLayout();
    });

    // Observe each widget for size changes
    Object.values(widgetRefs).forEach((ref) => {
      if (ref.current) {
        resizeObserver.observe(ref.current);
      }
    });

    // Cleanup function to disconnect the observer when the component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, [updateLayout]);

  return (
    <div className="app-container">
      <h1 className="title">Productivity Dashboard</h1>
      <GridLayout
        className="layout"
        layout={layout}
        cols={3} // Number of columns in the grid
        rowHeight={rowHeight} // Height of each row in the grid
        width={window.innerWidth} // Total width of the grid
        margin={[0, 0]} // Remove margins between widgets
        containerPadding={[0, 0]} // Remove padding inside the container
        isResizable={true} // Allow widgets to be resizable
        isDraggable={true} // Allow widgets to be draggable
        draggableHandle=".widget-title" // Limit drag handle to the title
        onResizeStop={(newLayout) => setLayout(newLayout)} // Update layout on resize stop
        onDragStop={(newLayout) => setLayout(newLayout)} // Update layout on drag stop
      >
        <div key="widget1" className="widget" ref={widgetRefs.widget1} data-grid-id="widget1">
          <div className="widget-title">Widget One</div>
          <div className="widget-content">
            <WidgetOne onContentChange={updateLayout} />
          </div>
        </div>
        <div key="widget2" className="widget" ref={widgetRefs.widget2} data-grid-id="widget2">
          <div className="widget-title">Widget Two</div>
          <div className="widget-content">
            <WidgetTwo onContentChange={updateLayout} />
          </div>
        </div>
        <div key="widget3" className="widget" ref={widgetRefs.widget3} data-grid-id="widget3">
          <div className="widget-title">Widget Three</div>
          <div className="widget-content">
            <WidgetThree onContentChange={updateLayout} />
          </div>
        </div>
      </GridLayout>
    </div>
  );
};

export default App;
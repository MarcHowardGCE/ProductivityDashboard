// Import React to enable JSX syntax and React component features
import React, { useState, useEffect } from 'react';
// Import necessary functions and components from the draft-js library
// Editor: The main editor component
// EditorState: Represents the state of the editor
// convertToRaw: Converts editor content to raw JSON format
// convertFromRaw: Converts raw JSON format back to editor content
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
// Import the default Draft.js CSS for styling the editor
import 'draft-js/dist/Draft.css';

// Define the NotesApp component using React.FC (Function Component) type
// This component serves as a container for the Draft.js editor
const NotesApp: React.FC = () => {
  // Initialize the editor state with saved notes from localStorage if available
  // If no saved notes are found, initialize with an empty editor state
  const [editorState, setEditorState] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        const contentState = convertFromRaw(JSON.parse(savedNotes));
        return EditorState.createWithContent(contentState);
      } catch (e) {
        console.error('Failed to parse saved notes:', e);
      }
    }
    return EditorState.createEmpty();
  });

  // useEffect hook to save the editor state to localStorage whenever it changes
  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = JSON.stringify(convertToRaw(contentState));
    localStorage.setItem('notes', rawContentState);
  }, [editorState]);

  return (
    // Main container div for the notes app
    <div className="notes-app">
      {/* Title heading for the notes app */}
      <h2 className="text-xl font-semibold mb-4">Notes App</h2>
      {/* Container for the Draft.js editor with some basic styling */}
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '300px', background: 'white' }}>
        {/* Render the Draft.js editor and bind it to the editor state */}
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
};

// Export the NotesApp component as the default export
// This allows it to be imported and used in other parts of the application
export default NotesApp;
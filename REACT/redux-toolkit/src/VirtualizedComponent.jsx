import React from 'react';
import { FixedSizeList  } from 'react-window';
// --- Helper function to generate a large list of contacts ---
const contacts = Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  name: `Contact ${index + 1}`,
  email: `contact${index + 1}@example.com`,
}));

// --- Component for a single row in our list ---
// 'react-window' provides the 'index' and 'style' props.
// The 'style' prop is crucial for positioning the item correctly!
const ContactRow = ({ index, style }) => (
  <div style={style}>
    <div style={{ padding: '5px 10px', borderBottom: '1px solid #eee' }}>
      <strong>{contacts[index].name}</strong>
      <br />
      <small>{contacts[index].email}</small>
    </div>
  </div>
);


// --- The main virtualized list component ---
const VirtualizedComponent= () => (
  <div>
    <h1>My Contacts</h1>
    <p>Showing {contacts.length} contacts with smooth scrolling!</p>
    <FixedSizeList
      height={400}      // The height of the visible list area
      itemCount={contacts.length} // Total number of items in the list
      itemSize={60}     // The height of a single contact row in pixels
      width={'100%'}    // The width of the list
    >
      {ContactRow}      // The component to render for each row
    </FixedSizeList>
  </div>
);

export default VirtualizedComponent;
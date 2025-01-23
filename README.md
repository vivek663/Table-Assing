# Dynamic Table with Dropdowns

This React application provides a dynamic table with customizable dropdowns in each row. Users can add new rows, select options from dropdowns, and manage options dynamically. The table also includes features for deleting rows.

## Features
- **Dynamic Rows**: Add new rows to the table.
- **Dropdowns**: 
  - Label 1 (single-select) dropdown for each row.
  - Label 2 (multi-select) dropdown for each row.
  - Ability to dynamically add new options to the dropdown.
- **Row Deletion**: Each row has a delete button to remove it from the table.

## Technologies Used
- React
- React-Select for dropdowns
- CSS for styling and layout

## How to Use
1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the application: `npm start`
4. Use the table by adding rows, selecting dropdown options, and utilizing the delete feature.

## Features Implementation Details:
- The `Label 1` dropdown is single-select, and options are filtered based on previously used options to prevent duplicates.
- The `Label 2` dropdown is multi-select, allowing users to choose multiple options.
- A delete button is added to each row to remove that specific row easily.
- New options can be dynamically added to the `Label 2` dropdown by entering text and clicking the "Add" button.

## Future Improvements
- Enhanced form validation for dropdown options.
- Better styling and user experience for smaller screen sizes.

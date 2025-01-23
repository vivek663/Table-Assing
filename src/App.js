import React, { useState } from "react";
import Select, { components } from "react-select";
import "./App.css";

const App = () => {
  const label1Options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [label2Options, setLabel2Options] = useState([
    { value: "Option A", label: "Option A" },
    { value: "Option B", label: "Option B" },
    { value: "Option C", label: "Option C" },
  ]);
  const [rows, setRows] = useState([]);
  const [usedLabel1Options, setUsedLabel1Options] = useState([]);
  const [newLabel2Option, setNewLabel2Option] = useState("");

  const addRow = () => {
    setRows((prevRows) => [...prevRows, { label1: "", label2: [] }]);
  };

  const handleLabel1Change = (selectedOption, rowIndex) => {
    setRows((prevRows) =>
      prevRows.map((row, index) =>
        index === rowIndex
          ? { ...row, label1: selectedOption ? selectedOption.value : "" }
          : row
      )
    );
    setUsedLabel1Options((prevUsed) => {
      if (selectedOption) {
        return [...prevUsed, selectedOption.value];
      } else {
        const clearedOption = rows[rowIndex].label1;
        return prevUsed.filter((option) => option !== clearedOption);
      }
    });
  };

  const handleLabel2Change = (selectedValues, rowIndex) => {
    setRows((prevRows) =>
      prevRows.map((row, index) =>
        index === rowIndex ? { ...row, label2: selectedValues } : row
      )
    );
  };

  const handleAddNewLabel2Option = () => {
    if (
      newLabel2Option.trim() &&
      !label2Options.some((option) => option.value === newLabel2Option)
    ) {
      setLabel2Options((prevOptions) => [
        ...prevOptions,
        { value: newLabel2Option, label: newLabel2Option },
      ]);
      setNewLabel2Option("");
    }
  };

  const CustomMenu = (props) => {
    return (
      <components.Menu {...props}>
        {props.children}
        <div className="custom-menu">
          <input
            type="text"
            value={newLabel2Option}
            onChange={(e) => setNewLabel2Option(e.target.value)}
            placeholder="Add new option"
            onClick={(e) => e.stopPropagation()}
            className="input-new-option"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddNewLabel2Option();
            }}
            className="btn-add-option"
          >
            Add
          </button>
        </div>
      </components.Menu>
    );
  };

  return (
    <div className="container">
      <h1>Dynamic Table with Dropdowns</h1>
      <div className="table-container">
        <table className="wireframe-table">
          <thead>
            <tr>
              <th>Label 1</th>
              <th>Label 2</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="single-select-cell">
                  <Select
                    value={
                      row.label1
                        ? { value: row.label1, label: row.label1 }
                        : null
                    }
                    onChange={(selectedOption) =>
                      handleLabel1Change(selectedOption, rowIndex)
                    }
                    options={label1Options
                      .filter(
                        (option) =>
                          !usedLabel1Options.includes(option) ||
                          option === row.label1
                      )
                      .map((option) => ({ value: option, label: option }))}
                    isClearable
                    placeholder="Select option"
                    className="select-dropdown"
                  />
                </td>
                <td className="multi-select-cell">
                  <Select
                    isMulti
                    name="label2"
                    value={row.label2}
                    onChange={(selectedValues) =>
                      handleLabel2Change(selectedValues, rowIndex)
                    }
                    options={label2Options}
                    className="select-dropdown"
                    closeMenuOnSelect={false}
                    components={{ Menu: CustomMenu }}
                    placeholder="Select Options"
                  />
                </td>
              </tr>
            ))}
            <tr className="emptyRow">
              <td className="emptyRow"></td>
              <td className="emptyRow"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="add-row-button">
        <button onClick={addRow} className="btn-add-row">
          + Add New Row
        </button>
      </div>
    </div>
  );
};

export default App;

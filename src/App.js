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
    setRows((prevRows) => [
      ...prevRows,
      { label1: "", label2: [] },
    ]);
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
        index === rowIndex
          ? { ...row, label2: selectedValues }
          : row
      )
    );
  };

  const handleAddNewLabel2Option = () => {
    if (newLabel2Option && !label2Options.some(option => option.value === newLabel2Option)) {
      setLabel2Options((prevOptions) => [
        ...prevOptions,
        { value: newLabel2Option, label: newLabel2Option }
      ]);
      setNewLabel2Option("");
    }
  };

  const CustomMenuList = (props) => {
    return (
      <components.MenuList {...props}>
        {props.children}
        <div style={{ padding: "10px", borderTop: "1px solid #ddd" }}>
          <input
            type="text"
            value={newLabel2Option}
            onChange={(e) => setNewLabel2Option(e.target.value)}
            placeholder="Add new option"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "calc(100% - 70px)",
              marginRight: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddNewLabel2Option();
            }}
            style={{
              padding: "5px 10px",
              backgroundColor: "#4CAF50",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>
      </components.MenuList>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Dynamic Table with Dropdowns</h1>
      <div className="tableContainer">
        <table border="1" style={{ width: "70%", marginBottom: "20px" }} className="table">
          <thead>
            <tr>
              <th className="thread">Label 1</th>
              <th className="thread">Label 2</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="basic-multi-select">
                  <Select
                    value={row.label1 ? { value: row.label1, label: row.label1 } : null}
                    onChange={(selectedOption) => handleLabel1Change(selectedOption, rowIndex)}
                    options={label1Options
                      .filter((option) => !usedLabel1Options.includes(option) || option === row.label1)
                      .map((option) => ({ value: option, label: option }))} 
                    isClearable
                    placeholder="Select an option"
                    className="selctDrop"
                  />
                </td>
                <td className="basic-multi-select">
                  <Select
                    isMulti
                    name="label2"
                    value={row.label2}
                    onChange={(selectedValues) => handleLabel2Change(selectedValues, rowIndex)}
                    options={label2Options}
                    className="selctDrop"
                    classNamePrefix="select"
                    closeMenuOnSelect={false}
                    components={{ MenuList: CustomMenuList }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btomButton">
        <button onClick={addRow} className="addrowBtn">
          + Add New Row
        </button>
      </div>
    </div>
  );
};

export default App;

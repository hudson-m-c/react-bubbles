import React, { useState } from "react";
import { axiosWithAuth } from '../api';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = (props) => {
  console.log('initial', props.colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const [colors, setColors] = useState(props.colors);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log(colorToEdit);
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then( resp => {
      // alert("Color updated");
      props.updateColors( props.colors.map( curr => {
        return (curr.id === colorToEdit.id) ? colorToEdit : curr;
      }))
    })
    .catch( err => {
      console.log(err);
    })
    
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then( resp => {
      // alert("Color deleted");
      props.updateColors( props.colors.filter( curr => {
        return curr.id !== color.id
      }) )
    })
    .catch( err => {
      console.log(err);
    })
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    axiosWithAuth().post('http://localhost:5000/api/colors', colorToAdd)
    .then( resp => {
      // alert("Color updated");
      let newArr = props.colors;
      newArr.push(colorToAdd);
      props.updateColors(newArr);
      setColorToAdd(initialColor);
    })
    .catch( err => {
      console.log(err);
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {props.colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer">
        {/* stretch - build another form here to add a color */}
        <form onSubmit={(evt) => handleSubmit(evt)}>
          <label>
            color name: 
            <input type='text' value={colorToAdd.color} onChange={ e => {
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            } }/>
          </label>
          <label>
            hex code: 
            <input type='text' placeholder='ex. #9d3a4f' value={colorToAdd.code.hex} onChange={e =>
                  setColorToAdd({
                    ...colorToAdd,
                    code: { hex: e.target.value }
                  }) }/>
          </label>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ColorList;

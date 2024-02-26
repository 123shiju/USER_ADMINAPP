import React, { useState } from 'react';
import Select from 'react-select';

const FormField = ({ field, updateField, totalFields, removeField, }) => {
  const [newOption, setNewOption] = useState(''); // State to manage the new option input

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(field.id, { ...field, [name]: value });
  };

  const handleSelectChange = (selectedOptions) => {
    updateField(field.id, { ...field, options: selectedOptions.map(option => option.value) });
  };

  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      // Add the new option to the existing options
      const updatedOptions = [...field.options, newOption];
      updateField(field.id, { ...field, options: updatedOptions });
      setNewOption('');
    }
  };

  const handleSubmit = () => {
    // Perform form submission logic, e.g., send data to the database
    console.log('Form submitted:', field);
  };

  return (
    <div>
      {field.type === 'text' && (
        <>
          <label className='label'>
            Placeholder:
            <input type="text" name="placeholder" value={field.placeholder || ''} onChange={handleChange} />
          </label>
        </>
      )}
      <label className='label'>
        Label:
        <input type="text" name="label" value={field.label} onChange={handleChange} />
      </label>
      {['dropdown', 'multichoice'].includes(field.type) && (
        <>
          <label className='label'>
            Placeholder:
            <input type="text" name="placeholder" value={field.placeholder || ''} onChange={handleChange} />
          </label>
          <label className='label'>
            Options:
            <Select
              isMulti
              options={field.options.map(option => ({ value: option, label: option }))}
              onChange={handleSelectChange}
            />
            {/* Input for adding new option */}
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Add new option"
            />
            <button type="button" onClick={handleAddOption}>Add Option</button>
          </label>
        </>
      )}
      <button type="button" onClick={() => removeField(field.id)} className='btn btn-danger' style={{marginLeft:'10px'}}>Remove Field</button>
    </div>
  );
};

export default FormField;

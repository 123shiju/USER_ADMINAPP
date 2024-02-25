import React from 'react';
import Select from 'react-select';

const FormField = ({ field, updateField,totalFields, removeField, }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(field.id, { ...field, [name]: value });
  };

  const handleSelectChange = (selectedOptions) => {
    updateField(field.id, { ...field, options: selectedOptions.map(option => option.value) });
  };

  return (
    <div>
      {field.type === 'text' && (
        <>
          {/* Additional options for text field if needed */}
          <label>
            Placeholder:
            <input type="text" name="placeholder" value={field.placeholder || ''} onChange={handleChange} />
          </label>
        </>
      )}
       <label>
        Label:
        <input type="text" name="label" value={field.label} onChange={handleChange} />
      </label>
      {['dropdown', 'multichoice'].includes(field.type) && (
        <>
          <label>
            Placeholder:
            <input type="text" name="placeholder" value={field.placeholder || ''} onChange={handleChange} />
          </label>
          <label>
            Options:
            <Select
              isMulti
              options={field.options.map(option => ({ value: option, label: option }))}
              onChange={handleSelectChange}
            />
          </label>
        </>
      )}
      <button type="button" onClick={() => removeField(field.id)}>Remove Field</button>
    </div>
  );
};

export default FormField;

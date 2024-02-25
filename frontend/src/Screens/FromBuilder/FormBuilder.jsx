import React, { useState } from 'react';
import FormField from '../../Components/FormField';
import { v4 as uuidv4 } from 'uuid';
import './formBuilder.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [formTitle, setFormTitle] = useState('');

  const addField = (fieldType) => {
    setFormFields([...formFields, { id: uuidv4(), type: fieldType, label: '', options: [] }]);
  };

  const updateField = (fieldId, updatedField) => {
    setFormFields(formFields.map((field) => (field.id === fieldId ? updatedField : field)));
  };

  const removeField = (fieldId) => {
    setFormFields(formFields.filter((field) => field.id !== fieldId));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = { title: formTitle, fields: formFields };
    console.log('Form Data:', formData);

    try {
      const response = await fetch('http://localhost:5000/api/forms/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(formData),
      });
    
      if (response.status === 201) {
        toast.success('Form submitted successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 4000);
  
      } else {
        toast.error(`Error submitting form. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
    
  };

  return (
    <div>
      <h2>Form Builder</h2>
      <form onSubmit={handleFormSubmit}>
        <label className='label'>
          Form Title:
          <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
        </label>
        <div>
          <button type="button" onClick={() => addField('text')} className="Form_btn">
            Add Text Field
          </button>
          <button type="button" onClick={() => addField('dropdown')} className="Form_btn">
            Add Dropdown
          </button>
          <button type="button" onClick={() => addField('multichoice')} className="Form_btn">
            Add Multichoice
          </button>
        </div>
        {formFields.map((field) => (
          <FormField
            key={field.id}
            field={field}
            updateField={updateField}
            removeField={removeField}
          />
        ))}
        <button type="submit" className='btn btn-primary'  style={{marginBottom:'200px'}}> Submit Form</button>
      </form>
    </div>
  );
};

export default FormBuilder;

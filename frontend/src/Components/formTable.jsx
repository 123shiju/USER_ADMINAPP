import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './formtable.css'
 
const DynamicTable = ({ forms }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedForm, setUpdatedForm] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFormIndex, setSelectedFormIndex] = useState(null);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);
  


  const handleUpdate = (formIndex) => {
    setSelectedFormIndex(formIndex);
    setUpdatedForm(forms[formIndex]);
    setShowUpdateModal(true);
  };


  const handleDelete = (formIndex, fieldIndex) => {
    setSelectedFormIndex(formIndex);
    setSelectedFieldIndex(fieldIndex);
    setShowDeleteModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedFormIndex(null);
    setUpdatedForm(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedFormIndex(null);
    setSelectedFieldIndex(null);
  };

  const handleSaveChanges = async () => {
    try {
      if (selectedFormIndex === null || updatedForm === null) {
        return;
      }

      // Prepare the updated form data
      const updatedFormData = {
        title: updatedForm.title,
        fields: updatedForm.fields.map((field) => ({
          label: field.label,
          type: field.type,
          options: field.options,
          placeholder: field.placeholder,
        })),
      };


      console.log("updateddata:",updatedFormData)
      // Make an API call to update the database
      const response = await axios.put(
        `http://localhost:5000/api/forms/updateForm/${updatedForm._id}`,
        { updatedForm: updatedFormData }
      );

      if (response.status === 200) {
        toast.success('Form updated successfully!', {
          onClose: () => {
            handleCloseUpdateModal();
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          },
        });
      } else {
        throw new Error(`Failed to update form. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating form:', error.message);
    }
  };

  const handleDeleteField = async () => {
    try {
      if (selectedFormIndex === null) {
        return;
      }
  
      const formIdToDelete = forms[selectedFormIndex]._id; 
      console.log('formidtodelete:',formIdToDelete)
  
      const response = await axios.delete(`http://localhost:5000/api/forms/deleteForm`, {
        withCredentials: true,
        data: {
          formId: formIdToDelete,
        },
      });
  
      if (response.status === 200) {
        toast.success('Form deleted successfully!', {
          onClose: () => {
            handleCloseDeleteModal();
            
            setTimeout(()=>{
              window.location.reload();
            },4000)
          },
        });
      } else {
        throw new Error(`Failed to delete form. Status: ${response.status}`);
      }
  
    } catch (error) {
      console.error('Error deleting form:', error.message);
    }
  };
  


  return (
    <div>
      <h2>Form Table</h2>
      {forms.map((form, formIndex) => (
        <div key={formIndex}>
          <h3>{form.title}</h3>
          <Table>
            <thead>
              <tr>
                <th>Label</th>
                <th>Type</th>
                <th>Options</th>
                <th>Placeholder</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {form.fields.map((field, fieldIndex) => (
  <tr key={fieldIndex}>
    <td>{field.label}</td>
    <td>{field.type}</td>
    <td>
      {field.options.map((option, optionIndex) => (
        <div key={optionIndex}>{option.value}</div>
      ))}
    </td>
    <td>{field.placeholder}</td>
    <td>
      <Button
        variant="info"
        onClick={() => handleUpdate(formIndex, fieldIndex)}
      >
        Update
      </Button>
      <Button
        variant="danger"
        onClick={() => handleDelete(formIndex, fieldIndex)}
      >
        Delete
      </Button>
    </td>
  </tr>
))}

            </tbody>
          </Table>
          
        </div>
      ))}

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFormIndex !== null && updatedForm !== null && (
            <Form>
              {/* Create a form to allow users to modify the form details */}
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedForm.title}
                  onChange={(e) =>
                    setUpdatedForm({ ...updatedForm, title: e.target.value })
                  }
                />
              </Form.Group>

              {updatedForm.fields.map((field, fieldIndex) => (
                <div key={fieldIndex}>
                  <Form.Group controlId={`formLabel-${fieldIndex}`}>
                    <Form.Label>Label</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.label}
                      onChange={(e) =>
                        setUpdatedForm({
                          ...updatedForm,
                          fields: updatedForm.fields.map((f, i) =>
                            i === fieldIndex
                              ? { ...f, label: e.target.value }
                              : f
                          ),
                        })
                      }
                    />
                  </Form.Group>
                  {/* Add more form fields for other properties */}
                </div>
              ))}

              <Button variant="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>


      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Form Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFormIndex !== null && selectedFieldIndex !== null && (
            <p>Are you sure you want to delete this field?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteField}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DynamicTable;

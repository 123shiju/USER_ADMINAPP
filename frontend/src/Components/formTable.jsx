import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const DynamicTable = ({ forms }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFormIndex, setSelectedFormIndex] = useState(null);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);

  const handleUpdate = (formIndex, fieldIndex) => {
    setSelectedFormIndex(formIndex);
    setSelectedFieldIndex(fieldIndex);
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
    setSelectedFieldIndex(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedFormIndex(null);
    setSelectedFieldIndex(null);
  };

  const handleSaveChanges = (updatedField) => {
    // Implement your update logic here
    console.log(`Updating form ${selectedFormIndex}, field ${selectedFieldIndex} with data:`, updatedField);

    // Close the modal
    handleCloseUpdateModal();
  };

 const handleDeleteField = () => {
  if (selectedFormIndex !== null && selectedFieldIndex !== null) {
    // Create a copy of the forms array to avoid directly mutating state
    const updatedForms = [...forms];

    // Remove the selected field from the forms array
    updatedForms[selectedFormIndex].fields.splice(selectedFieldIndex, 1);

    // Update the state with the modified forms array
    setForms(updatedForms);
  }

  // Close the modal
  handleCloseDeleteModal();
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
                  <td>{field.options.join(', ')}</td>
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
        {/* ... (same as before) */}
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

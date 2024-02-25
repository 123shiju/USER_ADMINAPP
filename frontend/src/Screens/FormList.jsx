// FormList.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FormTable from '../Components/formTable'; // Update the import path

const FormList = () => {
  const { userId } = useParams();
  const [userForms, setUserForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleForm = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/forms/getForm`, {
        params: {
          userId: userId,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = response.data;
        setUserForms(data.forms);
      } else {
        throw new Error(`Failed to fetch forms. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching forms:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleForm();
  }, [userId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && userForms.length === 0 && <p>No forms available</p>}
      {!loading && userForms.length > 0 && <FormTable forms={userForms} />}
    </div>
  );
};

export default FormList;

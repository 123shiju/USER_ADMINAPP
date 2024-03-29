import { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button} from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";


import { setCredentials } from "../slices/Authslices";
import { useUpdateUserMutation } from "../slices/usersApiSlice";


const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [image,setImage]=useState("")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile ,{ isLoading }] = useUpdateUserMutation()

  useEffect(() => {
   setName(userInfo.name)
   setEmail(userInfo.email)

  }, [userInfo.setName,userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== Confirmpassword) {
      toast.error("passwords do not match");
    } else {
       try {
        const formData=new FormData();
        formData.append("_id", userInfo._id)
        formData.append("name",name)
        formData.append(" email", email)
        formData.append("password",password)
        formData.append("userImage",image)
  
          const res=await updateProfile(formData).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success('profile updated')
       } catch (err) {
        toast.error(err?.data?.message) || err.error
       }
    }
  };
  return (
    <FormContainer>
      <h1>Update profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            value={Confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="userImage">
          <Form.Label>Profile Picture </Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></Form.Control>
        </Form.Group>

      
        { isLoading  && <Loader />}
        
        <Button type="submit" variant="primary" className="mt-3">
        update
        </Button>

      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;

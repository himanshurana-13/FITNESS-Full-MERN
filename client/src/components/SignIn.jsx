import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginAtom } from "../store/atoms/login";
import toast from "react-hot-toast";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height to center vertically */
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 20px; /* Optional: for some padding around the content */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: to give some shadow effect */
  border-radius: 8px; /* Optional: to round the corners */
  background-color: ${({ theme }) => theme.background}; /* Ensure background color matches theme */
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const setLogin = useSetRecoilState(loginAtom);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const validateInputs = () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username: formData.email,
          password: formData.password
        });

        if (response.data.success) {
          setLogin(true);
          toast.success("Logged In Successfully");
          navigate("/");
        }
      } catch (err) {
        toast.error("Error Occurred");
        setLoading(false);
        setButtonDisabled(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData(prev => (
      { ...prev, [e.target.name]: e.target.value }
    ));
    console.log(formData);
  };

  return (
    <Wrapper>
      <Container>
        <div>
          <Title>Welcome to Fittrack 👋</Title>
          <Span>Please login with your details here</Span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          <TextInput
            label="Email Address"
            placeholder="Enter your email address"
            value={formData.email}
            name="email"
            handleChange={handleChange}
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            password
            value={formData.password}
            name="password"
            handleChange={handleChange}
          />
          <Span>Don't have an Account? <NavLink to="/signup">Register Here</NavLink></Span>
          <Button
            text="SignIn"
            onClick={handleSignIn}
            isLoading={loading}
            isDisabled={buttonDisabled}
          />
        </div>
      </Container>
    </Wrapper>
  );
};

export default SignIn;


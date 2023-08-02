import React, { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { SimpleFooter } from "@/widgets/layout";
import axios from "@/api/axios";
import { useForm } from "react-hook-form";


export function SignUp() {

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, setValue,  formState: { errors } } = useForm({});
  const REGISTER_URL = '/auth/register';


  const onSubmit = async (data) => {
    
    try{
        await axios.post(REGISTER_URL,
            JSON.stringify(data),
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            }
        );
        navigate('/sign-in', { replace: true });
    } catch (err) {
        // if (err?.response?.status === 400) {
        //     setErrMsg(err.response.data.message);
        // } else {
        //     setErrMsg('User Register Failed');
        // }
        // setErrMsg(err);
        setErrMsg(err?.response.data);

    }
  }

  return (
    <>
      <img
        src="/img/banner.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <div className="grid place-items-center">
            <Link
              to="/home"
              className="flex items-center font-semibold text-sm  transition hover:text-blue-500"
            >
              <span className="mr-2">
                  <i className="fas fa-home"></i>
              </span>
              Home
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody className="flex flex-col gap-4">
              <p ref={errRef} style={{color: "red"}} aria-live="assertive">{errMsg}</p>
                <Input 
                  variant="standard" 
                  label="Name" 
                  size="lg" 
                  name="username"
                  {...register("username", { required: "User Name is required." })}
                  error={Boolean(errors.username)}
                  helperText={errors.username?.message}
                />
                
                <Input 
                  variant="standard" 
                  type="email" 
                  label="Email" 
                  size="lg" 
                  name="email" 
                  {...register("email", { required: "Email is required." })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />


                <Input
                  variant="standard"
                  type="password"
                  label="Password"
                  size="lg"
                  {...register("password", { required: "Password is required." })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />

                <div className="-ml-2.5">
                  <Checkbox label="I agree the Terms and Conditions" />
                </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>Sign Up</Button>
             
              <Typography variant="small" className="mt-6 flex justify-center">
                Already have an account?
                <Link to="/sign-in">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign in
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
}

export default SignUp;

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Card,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Alert,
} from "@material-tailwind/react";

const EmailForm = () => {
  const form = useRef();
  const [show, setShow] = useState(false); 

  const sendEmail = (e) => {
    e.preventDefault();
    setShow(false)
    emailjs.sendForm(
      'AAAAAA', //YOUR_SERVICE_ID
      'AAAAAAAA', //YOUR_TEMPLATE_ID
      form.current, 
      'AAAAAAAAA') //YOUR_PUBLIC_KEY
      .then((result) => {
          console.log(result.text);
          form.current.reset();
          setShow(true);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
  <>
   
    <form ref={form} onSubmit={sendEmail} className="mx-auto mt-12 max-w-3xl text-center">
        {
          show && <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                    <p className="font-bold">Success</p>
                    <p className="text-sm">Email successfully sent.</p>
                  </div>
        }
        
        <div className="mb-8 flex gap-8">
            <Input 
              type="text"
              name="user_name"
              variant="standard" size="lg" label="Full Name" />
        </div>
        <div className="mb-8 flex gap-8">
            <Input 
              type="email"
              name="user_email" 
              variant="standard" size="lg" label="Email Address" />
        </div>
        <Textarea 
          name="message"
          variant="standard" size="lg" label="Message" rows={8} />
        <Button type="submit" value="Send"  variant="gradient" size="lg" className="mt-8">
            Send Message
        </Button>
    </form>
  </>
  )
}
export default EmailForm;

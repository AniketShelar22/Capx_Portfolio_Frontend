import React, { useState } from "react";
import "./../styles/ContactPage.css";
import emailjs from "@emailjs/browser";


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);

    if (!isValidEmail(formData.email)) {
      setStatus({ success: false, message: "Please enter a valid email address." });
      return;
    }

    if (
      !process.env.REACT_APP_EMAILJS_SERVICE_ID ||
      !process.env.REACT_APP_EMAILJS_TEMPLATE_ID ||
      !process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    ) {
      console.error("Missing EmailJS environment variables!");
      setStatus({ success: false, message: "Configuration error. Please contact support." });
      return;
    }

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus({ success: true, message: "Message sent successfully!" });
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          console.error("FAILED...", error);
          setStatus({
            success: false,
            message: "Failed to send the message. Please try again later.",
          });
        }
      );
  };
  

//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccessMessage("");
//     setErrorMessage("");

//     try {
//       // Replace this URL with your API endpoint
//       const response = await fetch("https://your-api-endpoint.com/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setSuccessMessage("Your message has been sent successfully!");
//         setFormData({ name: "", email: "", message: "" });
//       } else {
//         throw new Error("Failed to send the message. Please try again.");
//       }
//     } catch (error) {
//       setErrorMessage(error.message);
//     }
//   };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Get in Touch</h1>
      <p className="contact-subtitle">We'd love to hear from you!</p>
      
        {status && (
            <div
              className={`p-4 rounded mb-6 ${
                status.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}
      

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Send Message
        </button>
      </form>

      {/* {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>} */}
    </div>
  );
};

export default ContactPage;

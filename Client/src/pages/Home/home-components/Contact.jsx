import axios from "axios";
import { useState } from "react";
import InputField from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { baseURL } from "../../../utils/api";

const ContactTaskManager = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
    services: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // This function handles checkbox changes in the form
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      services: checked
        ? [...prevState.services, name]
        : prevState.services.filter((service) => service !== name),
    }));
  };

  // This function handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/contact`, {
        formData: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phoneNumber,
          services: formData.services,
          message: formData.message,
        },
      });

      if (response.status === 200) {
        alert("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: "",
          services: [],
        });
      }
    } catch (error) {
      alert("Failed to send message. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col md:flex-row items-center justify-between px-8 py-12 min-h-screen"
    >
      <div className="max-w-screen-xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 rounded-lg mt-8 md:mt-0 shadow-lg bg-black/10 dark:bg-white/10">
            <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
            <div className="border rounded-lg p-8">
              <p className="mb-6">
                We're here to support you with any task management queries,
                setup assistance, or feature inquiries. Reach out, and we'll
                respond as soon as possible.
              </p>

              {/* Form */}

              <div className="grid grid-cols-1  sm:grid-cols-2 gap-6">
                <InputField
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                />
                <InputField
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                />
              </div>

              <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
              />

              <InputField
                label="Phone Number"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          {/* Services Selection */}
          <div>
            <label className="text-lg font-semibold">How can we help?</label>
            <div className="flex flex-wrap gap-4 mt-2">
              {[
                "Task Setup",
                "Feature Inquiry",
                "Bug Report",
                "Account Assistance",
                "Other",
              ].map((service) => (
                <label key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={service}
                    checked={formData.services.includes(service)}
                    onChange={handleCheckboxChange}
                    className="text-blue-500 focus:ring-0"
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button type="submit" onClick={handleSubmit}>
              Send Message
            </Button>
          </div>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col items-center">
          <div className="mb-6 text-center">
            <p className="text-gray-900 dark:text-gray-300">Reach us via:</p>
            <div className="flex space-x-4 justify-center mt-4">
              <a href="#chat" className="text-blue-400 hover:text-blue-500">
                Start a live chat
              </a>
              <a
                href="mailto:support@taskflow.com"
                className="text-blue-400 hover:text-blue-500"
              >
                Email us
              </a>
              <a
                href="https://twitter.com/taskflow"
                target="_blank"
                className="text-blue-400 hover:text-blue-500"
              >
                Twitter
              </a>
              <a
                href="https://www.linkedin.com/company/taskflow"
                target="_blank"
                className="text-blue-400 hover:text-blue-500"
              >
                LinkedIn
              </a>
              <a
                href="tel:+12345678900"
                className="text-blue-400 hover:text-blue-500"
              >
                Call us
              </a>
            </div>
          </div>

          {/* Map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094875!2d144.96315771531574!3d-37.81621897975162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577a9c6f5d3ed3!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1613452677561!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactTaskManager;

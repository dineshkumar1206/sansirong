import React, { useState } from "react";
import AboutNavbar from "../About/AboutNavbar";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import AboutFooter from "../About/AboutFooter";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API = import.meta.env.VITE_PRODUCTION_BACKEND_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidForm =
    formData.name.trim() &&
    isValidEmail(formData.email) &&
    formData.message.trim() &&
    !isSubmitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "Sending...", type: "info" });

    try {
      const res = await axios.post(`${API}/send-email`, formData);
      console.log(res.status);
      if (res && res.status === 200) {
        setStatus({ message: "Application submitted", type: "success" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ message: "Something went wrong", type: "failed" });
      }
      setTimeout(() => {
        setStatus({ message: "", type: "" });
      }, 2000);
    } catch (error) {
      setStatus({ message: "Something went wrong", type: "failed" });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setStatus({ message: "", type: "" });
      }, 2000);
    }
  };

  return (
    <div className="  overflow-y-scroll h-screen ">
      {/* <div>
        <AboutNavbar />
      </div>
      <div
        className="bg-cover bg-center brightness-50 bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://static.vecteezy.com/system/resources/previews/051/166/491/non_2x/communication-concept-with-email-message-box-and-contacts-icons-e-mail-marketing-customer-support-counseling-and-support-hotline-connection-with-modern-network-technology-contact-us-free-photo.jpg")',
          height: "400px",
        }}></div> */}

      <div className="relative">
        <div className="absolute top-0 left-0 w-full z-20">
          <AboutNavbar t={t} />
        </div>
        <div
          className="bg-cover  top-14 bg-center brightness-50 bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://static.vecteezy.com/system/resources/previews/051/166/491/non_2x/communication-concept-with-email-message-box-and-contacts-icons-e-mail-marketing-customer-support-counseling-and-support-hotline-connection-with-modern-network-technology-contact-us-free-photo.jpg")',
            height: "500px",
          }}
        >
          {/* Buttons */}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl md:text-5xl font-bold md:pt-32 text-white text-center">
            {t("contact")}
          </h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:pt-20 items-start justify-center gap-8 px-6 py-12 md:px-16">
        {/* Left Side - Image */}
        <div className="flex-1">
          <img
            src="/contact/c1.jpeg"
            alt="Office Building"
            className="rounded-xl shadow-lg w-full md:h-[460px] object-cover"
          />
        </div>

        {/* Right Side - Address Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            {t("contactaddress")}
          </h2>

          {/* Phone */}
          <div className="flex items-center mb-3 text-gray-700">
            <FaPhoneAlt className="text-pink-500 mr-3" />
            <span className="text-sm">+91 8610102669</span>
          </div>

          {/* Email */}
          <div className="flex items-center mb-3 text-gray-700">
            <FaEnvelope className="text-pink-500 mr-3" />
            <a
              href="mailto:sanisorgosales@gmail.com"
              className="text-sm hover:underline"
            >
              sanisorgosales@gmail.com
            </a>
          </div>

          {/* Address */}
          <div className="flex items-start mb-6 text-gray-700">
            <FaMapMarkerAlt className="text-pink-500 mr-3 mt-1" />
            <p className="text-sm leading-relaxed">
              4, Maple Building, Thiriveni nagar, Opposite to Saraswathi Statue
              Vadakkupattu village Oragadam Industrial Area, Kancheepuram, Tamil
              Nadu 603204
            </p>
          </div>

          {/* Google Map */}
          <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.643495934319!2d79.932525!3d12.8175113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52faa4d7a6001d%3A0x7e173ecf45f4c639!2s4%2C%20maple%20building%2C%20thiriveni%20nagar%2C%20opposite%20to%20saraswathi%20statue%20vadakupattu%20village!5e0!3m2!1sen!2sin!4v1691590913415!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <section className="px-6 md:px-20 md:mb-20 py-12 bg-white relative">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E91] mb-8">
            {t("moredetails")}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side - Working Hours */}
            <div className="border border-blue-200 rounded-lg md:h-[100px] md:mt-5 flex justify-between items-center p-4 text-sm text-[#2C3E91]">
              <span>{t("Mon-Sat")}</span>
              <span className="font-medium">09:00 AM - 06:00 PM</span>
            </div>

            {/* Right side - Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#2C3E91] mb-1">
                  {t("Name")}
                </label>
                <input
                  type="text"
                  placeholder={t("Name")}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-blue-200 rounded-md p-2 text-sm focus:outline-none focus:border-pink-300"
                />
              </div>

              <div>
                <label className="block text-xs text-[#2C3E91] mb-1">
                  {t("Email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("Email")}
                  className="w-full border border-blue-200 rounded-md p-2 text-sm focus:outline-none focus:border-pink-300"
                />
              </div>

              <div>
                <label className="block text-xs text-[#2C3E91] mb-1">
                  {t("Message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("Message")}
                  rows="4"
                  className="w-full border border-blue-200 rounded-md p-2 text-sm focus:outline-none focus:border-pink-300"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={!isValidForm}
                className={`w-full py-2   rounded-md font-medium transition ${
                  isValidForm
                    ? "bg-pink-300 text-white hover:bg-pink-400"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? t("Sending") : t("Send")}
              </button>

              {status.message ? (
                status.type === "success" ? (
                  <p className="text-green-500 border bg-[#effdef] border-[#c6fac6] py-5 rounded font-bold text-center">
                    {status.message}
                  </p>
                ) : status.type === "failed" ? (
                  <p className="text-red-500 border bg-[#fde3e3] border-[#fad1d1] py-5 rounded font-bold text-center">
                    {status.message}
                  </p>
                ) : status.type === "info" ? (
                  <p className="text-neutral-700 border bg-[#f7f6f6] border-neutral-500 py-5 rounded font-bold text-center">
                    {status.message}
                  </p>
                ) : null
              ) : null}
            </form>
          </div>
        </div>

        {/* WhatsApp Floating Button */}
        {/* <a
          href="https://wa.me/your-number"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 flex items-center gap-2 bg-white shadow-lg px-3 py-2 rounded-full border hover:shadow-xl transition">
          <span className="text-sm">Contact us</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-8 h-8"
          />
        </a> */}
      </section>
      <AboutFooter />
    </div>
  );
};

export default Contact;

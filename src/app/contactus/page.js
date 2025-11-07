"use client";
import React, { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiRefreshCw,
  FiUsers,
  FiClock,
} from "react-icons/fi";
import { MapPin, Phone, Mail } from "lucide-react";

import { callApi } from "../api";
import constant from "../env";
import { showSuccess, showError } from "../components/toaster";

export default function ContactSection() {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    city: "",
    zipcode: "",
    productcategory: "",
    productinterest: "",
    subject: "",
    message: "",
    captchaInput: "",
  });
  const [loading, setLoading] = useState(false);

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 5 })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");
  }

  const refreshCaptcha = () => setCaptcha(generateCaptcha());

  const productOptions = {
    Admixtures: [
      "Shalimar’s KAVASSU STRUC-486 (ISI MARKED)",
      "Shalimar’s KAVASSU CRYSTALLOMIX-PG (IRC ACCR.)",
      "Shalimar’s KAVASSU Integral Waterproofing Admixture G-50 (L) (ISI MARKED) (IS:2645)",
      "Shalimar’s KAVASSU (CI) Corrosion Inhibiting Admixture (IRC ACCR.)",
      "Shalimar’s KAVASSU (TTCI) Corrosion Inhibiting Admixture (IRC ACCR.)",
    ],
    "Curing Compounds": [
      "Shalimar’s KAVASSU CURE-Acrylic",
      "Shalimar’s KAVASSU CURE-Water Based",
      "Shalimar’s KAVASSU CURE-Resin Based",
    ],
    "Joint Sealants": [
      "KAVASSU SEAL-PU",
      "KAVASSU SEAL-Polysulphide",
      "KAVASSU SEAL-Acrylic",
    ],
    "Waterproofing Membrane": [
      "KAVASSU MEMBRANE-Bituminous",
      "KAVASSU MEMBRANE-APP",
      "KAVASSU MEMBRANE-SBS",
    ],
    "Epoxy Grouts": [
      "KAVASSU GROUT-EP",
      "KAVASSU GROUT-EP FAST",
      "KAVASSU GROUT-EP FLEX",
    ],
  };

  const filteredInterests =
    formData.productcategory && productOptions[formData.productcategory]
      ? productOptions[formData.productcategory]
      : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "productcategory") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        productinterest: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return "Enter a valid email address.";
    if (!formData.mobile.trim()) return "Phone number is required.";
    if (!formData.city.trim()) return "City is required.";
    if (!formData.zipcode.trim()) return "Pincode/Zipcode is required.";
    if (!formData.productcategory.trim())
      return "Product Category is required.";
    if (!formData.message.trim()) return "Message cannot be empty.";
    if (formData.captchaInput.trim().toUpperCase() !== captcha)
      return "Captcha is incorrect.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      showError(validationError);
      return;
    }

    setLoading(true);
    try {
      const payload = { ...formData };
      const url = constant?.API?.USER?.USERINQUIRE;
      const res = await callApi(url, "POST", payload);

      if (res?.status || res?.success) {
        showSuccess("Thank you! Your message has been sent successfully.");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          company: "",
          city: "",
          zipcode: "",
          productcategory: "",
          productinterest: "",
          subject: "",
          message: "",
          captchaInput: "",
        });
        refreshCaptcha();
      } else {
        showError("Failed to send message. Please try again later.");
      }
    } catch (err) {
      console.error("Form error:", err);
      showError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative">
        <div className="absolute inset-0">
          <div className="h-[450px] bg-sky-100"></div>
          <div className="h-full "></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-3 py-5">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Get In Touch</h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              We’re here to answer your queries. Reach out to us through the
              following ways.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2 bg-white relative">
            {/* LEFT IMAGE */}
    <div
       className="relative bg-cover bg-center text-white py-16 px-6 md:px-14"
      style={{
        backgroundImage: "url('/contactus.jpg')", // 🔹 update with correct path
      }}
    >
   

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Contact Information
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* ===== INDIA ===== */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">India</h3>

            {/* Registered Address */}
            <div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-white/90" />
                <strong className="text-lg">Registered Address:</strong>
              </div>
              <p className="ml-6 leading-relaxed">
                148, Masarkhedi, Benada Mode, Bassi, <br />
                Jaipur, Rajasthan - 303301
              </p>
            </div>

            {/* Corporate Office */}
            <div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-white/90" />
                <strong className="text-lg">Corporate Office:</strong>
              </div>
              <p className="ml-6 leading-relaxed">
                B-6/7/8, Jaipur Tower, MI Road, <br />
                Jaipur, Rajasthan - 302001
              </p>
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-white/90" />
                <strong className="text-lg">Phone:</strong>
              </div>
              <p className="ml-6">
                +91 98290 65184 <br />
                +91 75681 77777
              </p>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-white/90" />
                <strong className="text-lg">Email:</strong>
              </div>
              <p className="ml-6">
                sales@shalimartar.com <br />
                kmd@shalimartar.com <br />
                ocrd@shalimartar.com
              </p>
            </div>
          </div>

          {/* ===== DUBAI ===== */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Dubai</h3>

            {/* Phone */}
            <div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-white/90" />
                <strong className="text-lg">Phone:</strong>
              </div>
              <p className="ml-6">+971 5015 94756</p>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-white/90" />
                <strong className="text-lg">Email:</strong>
              </div>
              <p className="ml-6">dubai@shalimartar.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>

            {/* <div className="p-10 bg-[url('/contactus.jpg')] bg-cover bg-center"></div> */}

            {/* RIGHT FORM */}
            <div className="p-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput
                    label="Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                  <FormInput
                    label="Email *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@company.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput
                    label="Phone *"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                  />
                  <FormInput
                    label="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput
                    label="City *"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                  />
                  <FormInput
                    label="Pincode/Zipcode *"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    placeholder="Enter your Pincode/Zipcode"
                  />
                  <FormSelect
                    label="Product Category *"
                    name="productcategory"
                    value={formData.productcategory}
                    onChange={handleChange}
                    options={[
                      "Admixtures",
                      "Curing Compounds",
                      "Joint Sealants",
                      "Waterproofing Membrane",
                      "Epoxy Grouts",
                    ]}
                  />
                  <FormSelect
                    label="Product Interest"
                    name="productinterest"
                    value={formData.productinterest}
                    onChange={handleChange}
                    options={filteredInterests}
                  />
                </div>

                <FormInput
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief subject of your inquiry"
                />

                <FormTextarea
                  label="Message *"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide details about your requirements..."
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Captcha *
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      name="captchaInput"
                      value={formData.captchaInput}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Captcha"
                      className="flex-1 inputcls px-4 py-3 text-sm shadow focus:ring-1 focus:ring-[#07D] outline-none"
                    />
                    <div className="relative px-2 py-2 font-extrabold text-lg text-sky-900 rounded-lg select-none bg-gradient-to-r from-sky-100 via-sky-200 to-sky-300 border border-sky-400 shadow-inner tracking-widest skew-x-6">
                      {captcha.split("").map((c, i) => (
                        <span
                          key={i}
                          className={`inline-block mx-1 ${
                            i % 2 ? "rotate-6" : "-rotate-6"
                          }`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-2 rounded-full bg-sky-200 cursor-pointer hover:bg-sky-300 transition"
                    >
                      <FiRefreshCw className="text-sky-600" />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 thmbtn"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* INFO CARDS */}
<section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    <InfoCard
      icon={<FiClock className="text-2xl" />}
      title="Business Hours"
      text={
        <>
          Mon - Fri: <span className="font-medium">9 AM - 6 PM</span> <br />
          Saturday: <span className="font-medium">9 AM - 2 PM</span> <br />
          <span className="text-yellow-300 font-semibold">Sunday: Closed</span>
        </>
      }
      bg="/contactbg1.png"
      iconBg="bg-yellow-500 text-black"
      titleColor="text-white"
    />

    <InfoCard
      icon={<FiUsers className="text-2xl" />}
      title="Customer Care"
      text={
        <>
          +91-9829065184 <br /> +91-7568177777
        </>
      }
      bg="/contactbg2.png"
      iconBg="bg-yellow-500 text-black"
      titleColor="text-white"
    />

    <InfoCard
      icon={<FiMapPin className="text-2xl" />}
      title="Manufacturing Plant"
      text={
        <>
          Plot No.: 148, Village: Masarkhedi <br />
          Benada Mode, Bassi, Jaipur - 303301, Rajasthan, India
        </>
      }
      bg="/contactbg3.png"
      iconBg="bg-yellow-500 text-black"
      titleColor="text-white"
    />
  </div>
</section>

    </>
  );
}

/* -------------------------- FORM COMPONENTS -------------------------- */

function FormInput({ label, name, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-4 py-3 inputcls"
      />
    </div>
  );
}

function FormTextarea({ label, name, placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        name={name}
        rows="4"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="inputcls px-4 py-3"
      ></textarea>
    </div>
  );
}

function FormSelect({ label, name, value, onChange, options = [] }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="px-4 py-3 inputcls cursor-pointer"
      >
        <option value="">Select an option</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

/* -------------------------- CARD COMPONENT -------------------------- */
function InfoCard({ icon, title, text, bg, iconBg, titleColor }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-[1.03] transition duration-300"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >


      {/* Card content */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between ">
        <div className="flex items-center gap-3 mb-3">
          <div className={`${iconBg} p-3 rounded-full shadow-inner`}>
            {icon}
          </div>
          <h3 className={`font-semibold text-lg sm:text-xl ${titleColor}`}>
            {title}
          </h3>
        </div>
        <p className="leading-relaxed text-sm sm:text-base text-white">
          {text}
        </p>
      </div>
    </div>
  );
}


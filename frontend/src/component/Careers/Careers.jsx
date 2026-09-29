import React, { useMemo, useState } from "react";
import AboutNavbar from "../About/AboutNavbar";
import AboutFooter from "../About/AboutFooter";
import countryList from "react-select-country-list";
import Select from "react-select";
import Clients from "../../clients/Clients";
import { useTranslation } from "react-i18next";

const Careers = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const options = useMemo(() => countryList().getData(), []);

  //console.log(country);

  const API = import.meta.env.VITE_PRODUCTION_BACKEND_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    confirm: false,
  });

  const [education, setEducation] = useState([
    {
      degree: "",
      year: "",
      institute: "",
    },
  ]);

  const [work, setWork] = useState([
    {
      company: "",
      role: "",
      experience: "",
      responsibilities: "",
    },
  ]);
  //console.log(work);

  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const changeHandler = (val) => {
    setCountry(val);
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", year: "", institute: "" }]);
  };

  const handleEducationChange = (index, e) => {
    const newEdu = [...education];
    newEdu[index][e.target.name] = e.target.value;
    //console.log(newEdu);
    setEducation(newEdu);
  };

  const addwork = () => {
    setWork([
      ...work,
      { company: "", role: "", experience: "", responsibilities: "" },
    ]);
  };

  const handleWorkChange = (index, e) => {
    const workChange = [...work];
    workChange[index][e.target.name] = e.target.value;
    setWork(workChange);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      formData.append("country", country?.label || "");
      formData.append("education", JSON.stringify(education));
      formData.append("workExperience", JSON.stringify(work));
      if (resume) formData.append("resume", resume);

      const res = await fetch(`${API}/api/apply`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      setSuccess(true);

      setTimeout(() => {
        setForm({
          name: "",
          email: "",
          phone: "",
          street: "",
          apartment: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        });
        setEducation([
          {
            degree: "",
            year: "",
            institute: "",
          },
        ]);
        setWork([
          {
            company: "",
            role: "",
            experience: "",
            responsibilities: "",
          },
        ]);
        setResume(null);
        setSuccess(false);
      }, 1000);
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-screen overflow-y-scroll">
      {/* Navbar */}
      {/* <AboutNavbar /> */}

      {/* Top section with background image */}
      {/* <div
        className="bg-cover bg-center brightness-50 bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://img-cdn.publive.online/fit-in/640x430/filters:format(webp)/indian-express-malayalam/media/media_files/uploads/2021/07/jobs1.jpg")',
          height: "400px",
        }}></div> */}

      <div className="relative">
        <div className="absolute top-0 left-0 w-full z-20">
          <AboutNavbar />
        </div>
        <div
          className="bg-cover  top-14 bg-center brightness-50 bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://img-cdn.publive.online/fit-in/640x430/filters:format(webp)/indian-express-malayalam/media/media_files/uploads/2021/07/jobs1.jpg")',
            height: "500px",
          }}
        >
          {/* Buttons */}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl md:text-5xl font-bold text-white md:pt-32 text-center">
            {t("carrers")}
          </h1>
        </div>
      </div>

      <div>
        <div className="flex flex-col lg:flex-row md:pt-20 justify-between md items-start gap-8 sm:gap-10 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-6 sm:space-y-8">
            {/* What Defines Us */}
            <div>
              <h2 className="text-xl md:text-xl font-bold mb-3 sm:mb-4">
                {t("c1")}
              </h2>
              <ul className="list-disc  list-inside space-y-2 sm:space-y-3 text-gray-700 text-[17px]">
                <li>
                  <strong>{t("c2")}</strong> {t("c3")}
                </li>
                <li>
                  <strong>{t("c4")}</strong> {t("c5")}
                </li>
                <li>
                  <strong>{t("c6")}</strong> {t("c7")}
                </li>
              </ul>
            </div>

            {/* Why Build Your Career with Us */}
            <div>
              <h2 className=" text-xl font-bold mb-3 sm:mb-4">{t("c8")}</h2>
              <ul className="list-disc list-inside text-[17px] space-y-2 leading-[30px] sm:space-y-3 text-gray-700 ">
                <li>
                  <strong>{t("c9")}</strong> {t("c10")}
                </li>
                <li>
                  <strong>{t("c11")}</strong> {t("c12")}
                </li>
                <li>
                  <strong>{t("c13")}</strong> {t("c14")}
                </li>
                <li>
                  <strong>{t("c15")}</strong> {t("c16")}
                </li>
                <li>
                  <strong>{t("c17")}</strong> {t("c18")}
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl  font-bold mb-3 sm:mb-4">{t("c19")}</h2>
              <ul className="list-disc text-[17px] list-inside space-y-2 sm:space-y-3 text-gray-700 ">
                <li>{t("c20")}</li>
                <li>{t("c21")}</li>
                <li>{t("c22")}</li>
                <li>{t("c23")}</li>
                <li>{t("c24")}</li>
              </ul>
            </div>
            <div>
              <h1 className="text-xl font-bold mb-3 sm:mb-4">{t("c25")}</h1>
              <h3 className="py-3 text-lg font-semibold">{t("c26")}</h3>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-gray-700 text-[17px]">
                <li>{t("c27")}</li>
                <li>{t("c28")}</li>
                <li>{t("c29")}</li>
                <li>{t("c30")}</li>
                <li>{t("c31")}</li>
              </ul>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:w-1/2 bg-purple-50 p-4 sm:p-6 rounded-md shadow-sm w-full">
            <h2 className="text-base sm:text-lg fonta-semibold mb-4 sm:mb-6">
              {t("c32")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("c33")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("c34")}
                  className="w-full border rounded p-2 text-sm sm:text-base"
                  required
                />
              </div>

              {/* Email & Phone */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">
                    {t("c35")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("c36")}
                    className="w-full border rounded p-2 text-sm sm:text-base"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">
                    {t("c37")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 9878473878"
                    className="w-full border rounded p-2 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("c38")}
                </label>
                <input
                  type="text"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  placeholder={t("c39")}
                  className="w-full border rounded p-2 text-sm sm:text-base"
                />
              </div>

              {/* Apartment */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("c40")}
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={form.apartment}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full border rounded p-2 text-sm sm:text-base"
                />
              </div>

              {/* City & State */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">
                    {t("c41")}
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder={t("c42")}
                    className="w-full border rounded p-2 text-sm sm:text-base"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">
                    {t("c43")}
                  </label>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    type="text"
                    placeholder={t("c44")}
                    className="w-full border rounded p-2 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* ZIP & Country */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">
                    {t("c45")}
                  </label>
                  <input
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    type="text"
                    placeholder="600457"
                    className="w-full border rounded p-2 text-sm sm:text-base"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">
                    {t("c46")}
                  </label>
                  <Select
                    options={options}
                    value={country}
                    onChange={changeHandler}
                    placeholder="Select country"
                  />
                </div>
              </div>
              <div className="  bg-purple-50 p-4 sm:p-6 rounded-md shadow-sm w-full">
                <h2 className="text-lg font-semibold mb-4">{t("c47")}</h2>
                {education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <input
                        type="text"
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(i, e)}
                        placeholder={t("c48")}
                        className="w-full border rounded p-2 text-sm"
                      />
                      <input
                        type="date"
                        name="year"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(i, e)}
                        className="w-full border rounded p-2 text-sm"
                      />
                    </div>
                    <textarea
                      placeholder={t("c49")}
                      name="institute"
                      value={edu.institute}
                      onChange={(e) => handleEducationChange(i, e)}
                      rows="3"
                      className="w-full border rounded p-2 text-sm"
                    ></textarea>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addEducation}
                  className="mt-3 px-4 py-2 text-sm border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                >
                  {t("c50")}
                </button>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">{t("c51")}</h2>
                {work.map((w, i) => (
                  <div key={i}>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <input
                        name="company"
                        value={w.company}
                        type="text"
                        placeholder={t("c52")}
                        onChange={(e) => handleWorkChange(i, e)}
                        className="w-full border rounded p-2 text-sm"
                      />
                      <input
                        type="text"
                        name="role"
                        value={w.role}
                        placeholder={t("c53")}
                        onChange={(e) => handleWorkChange(i, e)}
                        className="w-full border rounded p-2 text-sm"
                      />
                      <input
                        type="text"
                        name="experience"
                        value={w.experience}
                        placeholder={t("c54")}
                        onChange={(e) => handleWorkChange(i, e)}
                        className="w-full border rounded p-2 text-sm"
                      />
                    </div>
                    <textarea
                      placeholder={t("c55")}
                      name="responsibilities"
                      value={w.responsibilities}
                      onChange={(e) => handleWorkChange(i, e)}
                      rows="3"
                      className="w-full border rounded p-2 text-sm"
                    ></textarea>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addwork}
                  className="mt-3 px-4 py-2 text-sm border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                >
                  {t("c56")}
                </button>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">{t("c57")}</h2>
                <input
                  type="file"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={form.confirm}
                  required
                  onChange={(e) =>
                    setForm({ ...form, confirm: e.target.checked })
                  }
                />
                <label className="text-sm">{t("c58")}</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded text-sm ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : success
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {loading ? t("c60") : t("c59")}
              </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && (
              <p className="text-green-600 mt-2">
                Application submitted successfully!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <AboutFooter />
    </div>
  );
};

export default Careers;

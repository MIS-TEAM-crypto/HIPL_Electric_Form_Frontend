import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  CheckCircle2,
  Calendar,
  Search,
  AlertCircle,
  Zap,
} from "lucide-react";

import bgVideo1 from "../assets/bg_vedio1.mp4";

const API_BASE = import.meta.env.VITE_API_URL || "";


export default function ElectricalForm() {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    electrician1: "",
    electrician2: "",
    shift: "",
    boiler: "",
    solvent: "",
    refinery: "",
    np: "",
    pp: "",
    dryer: "",
    prep_compressor: "",
    pump: "",
    prep: "",
    wbsedcl_unit: "",
    Pulverizer_Mega: "",
    Pulverizer_Oils:"",
    Boiler_12_Ton:"",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const dropdown1Ref = useRef(null);
  const dropdown2Ref = useRef(null);

  const electricianNames = [
    "Bhaskar",
    "Saheb",
    "Monoj",
    "Nayeem",
    "Raju",
    "Buddha",
    "Nandan",
    "Anup",
    "Debdas",
    ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown1Ref.current &&
        !dropdown1Ref.current.contains(event.target)
      ) {
        setShowDropdown1(false);
      }
      if (
        dropdown2Ref.current &&
        !dropdown2Ref.current.contains(event.target)
      ) {
        setShowDropdown2(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterNames = (searchTerm) => {
    if (!searchTerm) return electricianNames;
    return electricianNames.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      const selectedDate = new Date(value);
      const todayDate = new Date(today);

      if (selectedDate > todayDate) {
        setDateError("Future dates are not allowed");
        setTimeout(() => setDateError(""), 3000);
        return;
      }
      setDateError("");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleElectricianSelect = (name, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: name,
    }));
    if (field === "electrician1") {
      setShowDropdown1(false);
    } else {
      setShowDropdown2(false);
    }
  };

  const handleSearchChange = (value, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      date: formData.date,
      electrician1: formData.electrician1,
      electrician2: formData.electrician2,
      shift: formData.shift,
      equipment_status: {
        boiler: formData.boiler,
        solvent: formData.solvent,
        refinery: formData.refinery,
        np: formData.np,
        pp: formData.pp,
        dryer: formData.dryer,
        prep_compressor: formData.prep_compressor,
        pump: formData.pump,
        prep: formData.prep,
        wbsedcl_unit: formData.wbsedcl_unit,
        Pulverizer_Mega: formData.Pulverizer_Mega,
        Pulverizer_Oils: formData.Pulverizer_Oils,
        Boiler_12_Ton: formData.Boiler_12_Ton

      },
      timestamp: new Date().toISOString(),
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // console.log("Payload:", payload);

      // Replace with your actual API endpoint
      const response = await fetch(
        `${API_BASE}/api/maintenance-log`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        // Show backend validation error message
        setError(result.message || "Failed to submit form. Please try again.");
        throw new Error(result.message || "Validation error");
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        handleReset();
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      date: today,
      electrician1: "",
      electrician2: "",
      shift: "",
      boiler: "",
      solvent: "",
      refinery: "",
      np: "",
      pp: "",
      dryer: "",
      prep_compressor: "",
      pump: "",
      prep: "",
      wbsedcl_unit: "",
      Pulverizer_Mega: "",
      Pulverizer_Oils: "",
      Boiler_12_Ton: ""
    });
    setDateError("");
  };

  const equipmentFields = [
    { name: "boiler", label: "BOILER" },
    { name: "solvent", label: "SOLVENT" },
    { name: "refinery", label: "REFINERY" },
    { name: "np", label: "N_P" },
    { name: "pp", label: "P_P" },
    { name: "dryer", label: "DRYER" },
    { name: "prep_compressor", label: "PREP_COMPROCER" },
    { name: "pump", label: "PUMP" },
    { name: "prep", label: "PREP" },
    { name: "wbsedcl_unit", label: "WBSEDCL_Unit" },
    { name: "Pulverizer_Mega", label: "Pulverizer_Mega" },
    { name: "Pulverizer_Oils", label: "Pulverizer_Oils" },
    { name: "Boiler_12_Ton", label: "Boiler_12_Ton" },
  ];

  return (
    <div className="fixed inset-0 w-full h-screen overflow-y-auto bg-white">
      {/* Background Video with Overlay */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={bgVideo1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-slate-90/70 to-slate-95/80"></div>
      </div>

      {/* Main Container */}
      <div className="h-screen flex flex-col items-center justify-center relative z-10 px-4 py-4">
        {/* Notification Messages */}
        <div className="w-full max-w-4xl flex-shrink-0">
          {submitted && (
            <div className="mb-3 bg-green-600 border-2 border-green-800 rounded-2xl p-4 flex items-center gap-3 shadow-lg animate-in slide-in-from-top duration-500">
              <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-green-100 font-bold text-lg">Success!</p>
                <p className="text-green-200 text-base">
                  Form submitted successfully
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-3 bg-red-600 border-2 border-red-800 rounded-2xl p-4 flex items-center gap-3 shadow-lg animate-in slide-in-from-top duration-500">
              <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Error</p>
                <p className="text-red-100 text-base">{error}</p>
              </div>
            </div>
          )}

          {dateError && (
            <div className="mb-3 bg-amber-500/10 border border-amber-400/30 rounded-2xl p-4 flex items-center gap-3 shadow-lg shadow-amber-500/20">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-amber-100 font-semibold">Invalid Date</p>
                <p className="text-amber-200/80 text-sm">{dateError}</p>
              </div>
            </div>
          )}
        </div>

        {/* Main Card - Scrollable */}
        <div className="w-full max-w-4xl flex-1 overflow-y-auto">
          <div className="backdrop-blur-2xl bg-slate-800/80 rounded-3xl shadow-2xl border border-white/10 overflow-hidden h-full flex flex-col">
            {/* Header with Gradient Bar */}
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"></div>

              <div className="px-4 pt-6 pb-4 border-b border-white/10">
                <div className="flex items-center justify-center mb-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-50"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <h1 className="text-3xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Electric Unit Sheet
                </h1>
                <p className="text-slate-300 text-center text-xs tracking-wide">
                  Real-time Equipment Status & Monitoring
                </p>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-5 flex-1 overflow-y-auto">
              {/* Section 1: Date & Personnel */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                  <h2 className="text-lg font-semibold text-white">
                    Shift Information
                  </h2>
                </div>

                {/* Date Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    max={today}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900/50 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Electricians Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Electrician 1 */}
                  <div className="space-y-1.5 relative" ref={dropdown1Ref}>
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      Electrician 1
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.electrician1}
                        onChange={(e) =>
                          handleSearchChange(e.target.value, "electrician1")
                        }
                        onFocus={() => setShowDropdown1(true)}
                        className="w-full px-3 py-2.5 pr-10 rounded-xl bg-slate-900/50 border border-white/10 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                        placeholder="Search or select"
                        required
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    </div>

                    {showDropdown1 && (
                      <div className="absolute z-50 w-full mt-1 backdrop-blur-xl bg-slate-900/95 border border-white/10 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                        {filterNames(formData.electrician1).length > 0 ? (
                          filterNames(formData.electrician1).map(
                            (name, idx) => (
                              <div
                                key={idx}
                                onClick={() =>
                                  handleElectricianSelect(name, "electrician1")
                                }
                                className="px-3 py-2 text-sm text-slate-100 hover:bg-cyan-500/20 cursor-pointer transition-colors border-b border-white/5 last:border-b-0"
                              >
                                {name}
                              </div>
                            )
                          )
                        ) : (
                          <div className="px-3 py-2 text-sm text-slate-400 text-center">
                            No matches found
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Electrician 2 */}
                  <div className="space-y-1.5 relative" ref={dropdown2Ref}>
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      Electrician 2
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.electrician2}
                        onChange={(e) =>
                          handleSearchChange(e.target.value, "electrician2")
                        }
                        onFocus={() => setShowDropdown2(true)}
                        className="w-full px-3 py-2.5 pr-10 rounded-xl bg-slate-900/50 border border-white/10 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                        placeholder="Search or select"
                        required
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    </div>

                    {showDropdown2 && (
                      <div className="absolute z-50 w-full mt-1 backdrop-blur-xl bg-slate-900/95 border border-white/10 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                        {filterNames(formData.electrician2).length > 0 ? (
                          filterNames(formData.electrician2).map(
                            (name, idx) => (
                              <div
                                key={idx}
                                onClick={() =>
                                  handleElectricianSelect(name, "electrician2")
                                }
                                className="px-3 py-2 text-sm text-slate-100 hover:bg-cyan-500/20 cursor-pointer transition-colors border-b border-white/5 last:border-b-0"
                              >
                                {name}
                              </div>
                            )
                          )
                        ) : (
                          <div className="px-3 py-2 text-sm text-slate-400 text-center">
                            No matches found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Shift Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    Shift
                  </label>
                  <select
                    name="shift"
                    value={formData.shift}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-900/50 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-slate-900">
                      Select Shift
                    </option>
                    <option value="A" className="bg-slate-900">
                      Shift A
                    </option>
                    <option value="B" className="bg-slate-900">
                      Shift B
                    </option>
                    <option value="C" className="bg-slate-900">
                      Shift C
                    </option>
                  </select>
                </div>
              </div>

              {/* Section 2: Equipment Status */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                    <h2 className="text-lg font-semibold text-white">
                      Plant Wise Reading
                    </h2>
                  </div>
                  <span className="text-xs font-medium text-slate-400 bg-slate-900/50 px-2.5 py-1 rounded-full border border-white/10">
                    12 Parameters
                  </span>
                </div>

                <div className="backdrop-blur-xl bg-slate-900/30 rounded-2xl p-4 border border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {equipmentFields.map((field) => (
                      <div key={field.name} className="group">
                        <label className="text-xs font-semibold text-slate-100 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-all 
  focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent
  group-hover:border-white/20
  ${
    formData[field.name]
      ? "bg-white text-slate-900 border-slate-300"
      : "bg-slate-800/50 text-white border-white/10 placeholder-slate-500"
  }`}
                          placeholder="Enter value"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={
                    loading ||
                    !formData.electrician1 ||
                    !formData.electrician2 ||
                    !formData.shift ||
                    !formData.date
                  }
                  className="flex-1 relative group overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2 text-sm">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Submit Report
                      </>
                    )}
                  </span>
                </button>

                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="sm:w-32 px-6 py-3 rounded-xl bg-slate-900/50 border border-white/10 text-slate-100 text-sm font-semibold hover:bg-slate-800/50 hover:border-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="w-full max-w-3xl flex-shrink-0 mt-2 text-center">
          <p className="text-slate-700 text-xs font-medium">
            • Powered by Advanced Monitoring System • Real-time Data Collection
          </p>
        </div>
      </div>
    </div>
  );
}
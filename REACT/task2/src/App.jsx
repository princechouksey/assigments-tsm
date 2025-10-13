import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const countries = {
  India: {
    MadhyaPradesh: {
      Bhopal: ["Hoshangabad", "Sehore", "Vidisha"],
      Indore: ["Dewas", "Ujjain", "Mhow"]
    },
    Maharashtra: {
      Mumbai: ["Thane", "Navi Mumbai"],
      Pune: ["PCMC", "Hinjewadi"]
    }
  },
  USA: {
    California: {
      LosAngeles: ["Downtown", "Hollywood"],
      SanFrancisco: ["Bay Area", "Silicon Valley"]
    },
    Texas: {
      Dallas: ["Plano", "Irving"],
      Austin: ["Round Rock", "Georgetown"]
    }
  }
};

const skillsList = ["JavaScript", "Python", "React", "Node.js", "C++"];

export default function DynamicForm() {
  const { register, handleSubmit, watch, control, setValue } = useForm({
    defaultValues: {
      skills: []
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form Submitted! Check console.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded-2xl shadow-lg w-[500px] space-y-4"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Dynamic Content Form</h2>

        {/* Basic Inputs */}
        <input
          {...register("name", { required: true })}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("email", { required: true })}
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("phone", { required: true })}
          placeholder="Phone Number"
          type="tel"
          className="w-full p-2 border rounded"
        />

        {/* Address */}
        <div>
          <label className="block font-semibold">Address</label>

          {/* Country */}
          <select
            {...register("country", { required: true })}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedState("");
              setSelectedCity("");
              setValue("state", "");
              setValue("city", "");
              setValue("district", "");
            }}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Select Country</option>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* State */}
          {selectedCountry && (
            <select
              {...register("state", { required: true })}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity("");
                setValue("city", "");
                setValue("district", "");
              }}
              className="w-full p-2 border rounded mt-2"
            >
              <option value="">Select State</option>
              {Object.keys(countries[selectedCountry]).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          )}

          {/* City */}
          {selectedState && (
            <select
              {...register("city", { required: true })}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setValue("district", "");
              }}
              className="w-full p-2 border rounded mt-2"
            >
              <option value="">Select City</option>
              {Object.keys(countries[selectedCountry][selectedState]).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          )}

          {/* District */}
          {selectedCity && (
            <select
              {...register("district", { required: true })}
              className="w-full p-2 border rounded mt-2"
            >
              <option value="">Select District</option>
              {countries[selectedCountry][selectedState][selectedCity].map(
                (district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                )
              )}
            </select>
          )}
        </div>

        {/* Skills */}
        <div>
          <label className="block font-semibold">Skills</label>
          {skillsList.map((skill) => (
            <label key={skill} className="block">
              <input
                type="checkbox"
                value={skill}
                {...register("skills")}
                className="mr-2"
              />
              {skill}
            </label>
          ))}
        </div>

        {/* Other Skills */}
        <div>
          <label className="block font-semibold">Other Skills</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <input
                {...register(`otherSkills.${index}.name`)}
                placeholder="Enter skill"
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ name: "" })}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            + Add Other Skill
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

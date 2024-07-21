import React, { useState } from "react";

const UpsertForm = () => {
  const [formData, setFormData] = useState({
    accountnumber: "",
    name: "",
    creditrating: "",
    preferredvendorstatus: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SEARCH_API}/upsert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        alert("Document upserted successfully");
      } else {
        const errorData = await response.json();
        console.error("Error upserting document:", errorData);
        alert("Failed to upsert document");
      }
    } catch (error) {
      console.error("Error upserting document:", error);
      alert("Failed to upsert document");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Account Number:
          <input
            type="text"
            name="accountnumber"
            value={formData.accountnumber}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Credit Rating:
          <input
            type="number"
            name="creditrating"
            value={formData.creditrating}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Preferred Vendor Status:
          <input
            type="checkbox"
            name="preferredvendorstatus"
            checked={formData.preferredvendorstatus}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Upsert Document</button>
    </form>
  );
};

export default UpsertForm;

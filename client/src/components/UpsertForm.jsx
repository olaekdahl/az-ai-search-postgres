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
      const response = await fetch(`${import.meta.env.VITE_SEARCH_API}:8080/upsert`, {
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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="accountnumber">Account #:</label>
        <input
          type="text"
          id="accountnumber"
          name="accountnumber"
          value={formData.accountnumber}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="creditrating">Credit Rating:</label>
        <input
          type="number"
          id="creditrating"
          name="creditrating"
          value={formData.creditrating}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="preferredvendorstatus">Preferred Vendor Status:</label>
        <input
          type="checkbox"
          id="preferredvendorstatus"
          name="preferredvendorstatus"
          checked={formData.preferredvendorstatus}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Upsert Document</button>
    </form>
  );
};

export default UpsertForm;

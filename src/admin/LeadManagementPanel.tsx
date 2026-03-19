import React, { useState } from "react";
import { Plus, Trash, X, Check } from "@phosphor-icons/react";

export default function LeadManagementPanel() {
  const [leads] = useState([
    { id: "1", name: "Demo Lead 1", status: "new" },
    { id: "2", name: "Demo Lead 2", status: "won" }
  ]);

  return (
    <div>
      <h1>Lead Management</h1>
      <button>+ Add Lead</button>
      <div>
        {leads.map((lead) => (
          <div key={lead.id}>
            <h3>{lead.name}</h3>
            <p>Status: {lead.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";

const clients = [];
const isPending = false;

const create = async () => {};
const update = async () => {};
const remove = async () => {};
const isMutating = false;

export default function ClientManagementPanel() {
  return (
    <div>
      <h1>Client Management</h1>
      <button>+ Add Client</button>
      <div>
        {clients.map((client) => (
          <div key={client.id}>
            <h3>{client.name}</h3>
            <button onClick={() => remove(client.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

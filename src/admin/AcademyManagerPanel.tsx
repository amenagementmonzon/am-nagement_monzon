import { useState } from "react";
import { Plus, Trash, PencilSimple, Check, Eye, EyeSlash, BookOpen, UsersFour, Wrench, CalendarBlank } from "@phosphor-icons/react";

const TYPES = ["course","coaching","workshop","event"];
const TYPE_LABELS = { course: "Course", coaching: "Coaching", workshop: "Workshop", event: "Event" };
const TYPE_ICONS = {
  course: <BookOpen size={15} weight="fill" className="text-blue-500" />,
  coaching: <UsersFour size={15} weight="fill" className="text-purple-500" />,
  workshop: <Wrench size={15} weight="fill" className="text-amber-500" />,
  event: <CalendarBlank size={15} weight="fill" className="text-green-500" />,
};

const EMPTY_FORM = { type: "course", title: "", description: "", price: "", duration: "", instructor: "", thumbnailUrl: "", status: "draft", maxAttendees: "", tags: "" };

const items = [];
const isPending = false;
const create = async () => {};
const update = async () => {};
const remove = async () => {};
const isMutating = false;

export default function AcademyManagerPanel() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const all = items;
  const filtered = typeFilter === "all" ? all : all.filter((i) => i.type === typeFilter);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) await update(editing, form);
    else await create(form);
    setForm(EMPTY_FORM);
    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (item) => {
    setEditing(item.id);
    setForm(item);
    setShowForm(true);
  };

  const toggleStatus = (id, status) => {
    update(id, { status: status === "published" ? "draft" : "published" });
  };

  const statusBadge = (s) => {
    if (s === "published") return "bg-green-100 text-green-700";
    if (s === "archived")  return "bg-gray-100 text-gray-500";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-headline font-bold text-2xl text-charcoal">Academy Manager</h1>
          <p className="font-sans text-sm text-gray-500 mt-1">Create and manage courses, coaching, workshops, and events.</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(EMPTY_FORM); }} className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white rounded-xl">
          <Plus size={13} /> Add Item
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {["all",...TYPES].map(f => (
          <button key={f} onClick={() => setTypeFilter(f)} className={`px-3 py-1.5 text-xs rounded-xl border ${f === typeFilter ? "bg-charcoal text-white border-charcoal" : "bg-white border-gray-200 text-gray-500"}`}>
            {f === "all" ? "All" : TYPE_LABELS[f]}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="font-bold text-xl mb-4">{editing ? "Edit Item" : "New Item"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="p-2 border rounded">
              {TYPES.map((t) => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
            </select>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="p-2 border rounded" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="p-2 border rounded md:col-span-2" />
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" className="p-2 border rounded" />
            <button type="submit" className="col-span-2 bg-charcoal text-white p-2 rounded">{editing ? "Update" : "Create"}</button>
          </form>
        </div>
      )}

      {isPending ? (
        <div>Loading...</div>
      ) : filtered.length === 0 ? (
        <div>No items</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="border p-4 rounded">
              <h3>{item.title}</h3>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => remove(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


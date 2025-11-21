import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsage } from "../redux/slices/usageSlice";
import axios from "axios";

import InputField from "../components/InputField";
import Table from "../components/Table";
import "../assets/styles/usage.css";

export default function Usage() {
    const dispatch = useDispatch();
    const usageItems = useSelector(state => state.usage.items);

    const [form, setForm] = useState({ date: "", item: "", category: "", quantityUsed: 0 });
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { dispatch(fetchUsage()); }, [dispatch]);

    const handleAddOrUpdate = async () => {
        if (!form.date || !form.item || !form.category || form.quantityUsed <= 0) {
            alert("Please fill all fields with valid values.");
            return;
        }

        if (editingId) {
            await axios.put(`http://localhost:5000/usage/${editingId}`, form);
            setEditingId(null);
        } else {
            await axios.post("http://localhost:5000/usage", form);
        }

        dispatch(fetchUsage());
        setForm({ date: "", item: "", category: "", quantityUsed: 0 });
    };

    const handleEdit = (entry) => {
        setEditingId(entry.id);
        setForm({ date: entry.date, item: entry.item, category: entry.category, quantityUsed: entry.quantityUsed });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            await axios.delete(`http://localhost:5000/usage/${id}`);
            dispatch(fetchUsage());
        }
    };

    // Filtered and sorted data
    const filteredData = usageItems.filter(u =>
        u.item.toLowerCase().includes(search.toLowerCase()) ||
        u.category.toLowerCase().includes(search.toLowerCase())
    );

    const columns = ["date", "item", "category", "quantityUsed", "actions"];

    return (
        <div className="container">
            <h1>Usage Log</h1>

            {/* Search bar */}
            <div className="search-bar">
                <InputField
                    label="Search by Item/Category"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* Add/Edit Usage Form */}
            <div className="form">
                <InputField
                    label="Date"
                    type="date"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                />
                <InputField
                    label="Item Name"
                    value={form.item}
                    onChange={e => setForm({ ...form, item: e.target.value })}
                />
                <InputField
                    label="Category"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                />
                <InputField
                    label="Quantity Used"
                    type="number"
                    value={form.quantityUsed}
                    onChange={e => setForm({ ...form, quantityUsed: Number(e.target.value) })}
                />
                <button onClick={handleAddOrUpdate}>{editingId ? "Update" : "Add Usage"}</button>
                {editingId && <button onClick={() => { setEditingId(null); setForm({ date: "", item: "", category: "", quantityUsed: 0 }) }}>Cancel</button>}
            </div>

            {/* Usage Table */}
            <Table
                columns={columns}
                data={filteredData}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

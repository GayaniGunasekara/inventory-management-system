import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../redux/slices/inventorySlice";
import axios from "axios";

import InputField from "../components/InputField";
import Table from "../components/Table";
import "../assets/styles/inventory.css";

export default function Inventory() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.inventory.items);

    const [form, setForm] = useState({ name: "", category: "", initial: 0 });
    const [editingId, setEditingId] = useState(null);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        dispatch(fetchInventory());
    }, [dispatch]);

    const handleAddOrUpdate = async () => {
        if (editingId) {
            await axios.put(`http://localhost:5000/inventory/${editingId}`, form);
            setEditingId(null);
        } else {
            await axios.post("http://localhost:5000/inventory", form);
        }
        dispatch(fetchInventory());
        setForm({ name: "", category: "", initial: 0 });
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setForm({ name: item.name, category: item.category, initial: item.initial });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await axios.delete(`http://localhost:5000/inventory/${id}`);
            dispatch(fetchInventory());
        }
    };

    // Filtered and mapped data
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase())
    );

    const data = filteredItems.map(i => ({
        ...i,
        currentStock: i.initial + i.purchased - i.used
    }));

    const columns = ["name", "category", "initial", "purchased", "used", "currentStock", "actions"];

    return (
        <div className="container">
            <h1>Inventory</h1>

            {/* Filter */}
            <div className="filter">
                <InputField
                    label="Search by Name/Category"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
            </div>

            {/* Add/Edit Form */}
            <div className="form">
                <InputField label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <InputField label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                <InputField label="Initial" type="number" value={form.initial} onChange={e => setForm({ ...form, initial: Number(e.target.value) })} />
                <button onClick={handleAddOrUpdate}>{editingId ? "Update" : "Add"}</button>
                {editingId && <button onClick={() => { setEditingId(null); setForm({ name: "", category: "", initial: 0 }) }}>Cancel</button>}
            </div>

            {/* Inventory Table */}
            <Table
                columns={columns}
                data={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

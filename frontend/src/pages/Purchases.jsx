import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchases } from "../redux/slices/purchaseSlice";
import axios from "axios";

import InputField from "../components/InputField";
import Table from "../components/Table";
import "../assets/styles/purchases.css";

export default function Purchases() {
    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases.items);
    const [form, setForm] = useState({ date: "", item: "", category: "", quantity: 0 });
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchPurchases());
    }, [dispatch]);

    const handleAdd = async () => {
        if (!form.date || !form.item || !form.category || form.quantity <= 0) {
            alert("Please fill all fields with valid values.");
            return;
        }
        await axios.post("http://localhost:5000/purchases", form);
        dispatch(fetchPurchases());
        setForm({ date: "", item: "", category: "", quantity: 0 });
    };

    // Filter purchases based on search
    const filteredPurchases = purchases.filter(p =>
        p.item.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Purchase Log</h1>

            {/* Search bar */}
            <div className="search-bar">
                <InputField
                    label="Search by Item/Category"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* Add Purchase Form */}
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
                    label="Quantity"
                    type="number"
                    value={form.quantity}
                    onChange={e => setForm({ ...form, quantity: Number(e.target.value) })}
                />
                <button onClick={handleAdd}>Add Purchase</button>
            </div>

            {/* Purchases Table */}
            <Table
                columns={["date", "item", "category", "quantity"]}
                data={filteredPurchases}
            />
        </div>
    );
}

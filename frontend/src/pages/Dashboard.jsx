import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../redux/slices/inventorySlice";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import "../assets/styles/dashboard.css";

export default function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state) => state.inventory.items);

    useEffect(() => {
        dispatch(fetchInventory());
    }, [dispatch]);

    const totalItems = items.length;
    const lowStock = items.filter((i) => i.initial + i.purchased - i.used < 5);

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>

            {/* Summary Cards */}
            <div className="cards">
                <Card title="Total Items" value={totalItems} color="#e0f7fa" />
                <Card
                    title="Low Stock Alerts"
                    value={lowStock.length}
                    color="#ffe0e0"
                    items={lowStock.map((item) => item.name)}
                />
            </div>

            {/* Quick Action Buttons */}
            <div className="quick-actions">
                <button onClick={() => navigate("/purchases")} className="action-btn add">
                    Add Purchase
                </button>
                <button onClick={() => navigate("/usage")} className="action-btn use">
                    Record Usage
                </button>
            </div>

            {/* Optional: show low stock items list */}
            {lowStock.length > 0 && (
                <div className="low-stock-list">
                    <h3>Low Stock Items:</h3>
                    <ul>
                        {lowStock.map((item) => (
                            <li key={item.id}>
                                {item.name} — {item.initial + item.purchased - item.used} left
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

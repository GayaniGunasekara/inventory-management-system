export default function Table({ columns, data, onEdit, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map(row => (
                    <tr key={row.id}>
                        {columns.map(col => {
                            if (col === "actions") {
                                return (
                                    <td key={col}>
                                        <button className="edit-btn" onClick={() => onEdit(row)}>Edit</button>
                                        <button className="delete-btn" onClick={() => onDelete(row.id)}>Delete</button>
                                    </td>
                                );
                            }
                            return <td key={col}>{row[col]}</td>;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

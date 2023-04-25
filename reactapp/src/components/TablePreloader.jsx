import Placeholder from 'react-bootstrap/Placeholder';

export default function TablePreloader() {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    return (
        <div className="card shadow">
            <table className="table mb-0">
                <thead>
                    <tr>
                        <th><Placeholder as="p" animation="glow"><Placeholder className="w-50" /></Placeholder></th>
                        <th><Placeholder as="p" animation="glow"><Placeholder className="w-50" /></Placeholder></th>
                        <th><Placeholder as="p" animation="glow"><Placeholder className="w-50" /></Placeholder></th>
                    </tr>
                </thead>
                <tbody>
                    {numbers.map((number) =>
                        <tr key={"TableRowPreloader" + number} className="align-middle">
                            <th><Placeholder as="p" animation="glow"><Placeholder className="w-75" /></Placeholder></th>
                            <th><Placeholder as="p" animation="glow"><Placeholder className="w-75" /></Placeholder></th>
                            <th><Placeholder as="p" animation="glow"><Placeholder className="w-75" /></Placeholder></th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
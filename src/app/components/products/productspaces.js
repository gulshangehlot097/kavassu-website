export default function ProductSpecs({ technicalData = [] }) {
  if (!technicalData.length) return <p>No technical data available.</p>;

  return (
    <table className="w-full border-collapse">
      <tbody>
        {technicalData.map((item, i) => {
          const [key, value] = Object.entries(item)[0];
          return (
            <tr key={i} className="border-b border-gray-100">
              <td className="py-2 pr-4 font-medium text-gray-800">{key}</td>
              <td className="py-2 text-gray-600">{value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

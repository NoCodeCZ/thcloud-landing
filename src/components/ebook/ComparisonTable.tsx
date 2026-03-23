export function ComparisonTable({
  headers,
  rows,
}: {
  headers: [string, string];
  rows: { left: string; right: string }[];
}) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="bg-brand-surface text-brand-subtitle font-medium text-left p-4 rounded-tl-xl">
              {headers[0]}
            </th>
            <th className="bg-brand-navy text-white font-medium text-left p-4 rounded-tr-xl">
              {headers[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-gray-100">
              <td className="p-4 text-brand-subtitle bg-brand-surface/50">
                {row.left}
              </td>
              <td className="p-4 text-brand-title font-medium">
                {row.right}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

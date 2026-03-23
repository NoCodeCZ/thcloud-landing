export function DepartmentTable({
  rows,
}: {
  rows: { dashboard: string; aiKnows: string }[];
}) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="bg-brand-navy text-white font-medium text-left p-4 rounded-tl-xl w-36">
              Dashboard
            </th>
            <th className="bg-brand-navy text-white font-medium text-left p-4 rounded-tr-xl">
              What the AI knows
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-gray-100">
              <td className="p-4 font-medium text-brand-title">
                {row.dashboard}
              </td>
              <td className="p-4 text-brand-subtitle">{row.aiKnows}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface Activity {
  icon: React.ReactNode;
  message: string;
  time: string;
}

interface Props {
  activities: Activity[];
  limit?: number;
}

export default function LiveActivity({ activities, limit = 4 }: Props) {
  return (
    <ul className="divide-y divide-gray-50">
      {activities.slice(0, limit).map((a, i) => (
        <li key={i} className="px-5 py-3 flex gap-3">
          
          {/* Icon */}
          <span className="text-lg shrink-0 leading-none mt-0.5">
            {a.icon}
          </span>

          {/* Content */}
          <div>
            <p className="text-[11px] text-gray-700 leading-snug">
              {a.message}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {a.time}
            </p>
          </div>
        </li>
      ))}

      {/* Empty state */}
      {activities.length === 0 && (
        <li className="px-5 py-6 text-center text-gray-400 text-sm">
          No recent activity
        </li>
      )}
    </ul>
  );
}
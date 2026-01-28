import { activityMock } from "../../data/activityMock";
import {
  Clock,
  CheckCircle,
  Brain,
  Folder,
  LogIn,
} from "lucide-react";

const iconMap = {
  login: <LogIn size={16} />,
  task: <CheckCircle size={16} />,
  ai: <Brain size={16} />,
  project: <Folder size={16} />,
};

export default function ActivityTimeline() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-glass">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

      <div className="space-y-5">
        {activityMock.map((item) => (
          <div key={item.id} className="flex gap-4">
            
            {/* ICON */}
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
              {iconMap[item.type]}
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <p className="text-sm">{item.message}</p>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <Clock size={12} />
                {item.time}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

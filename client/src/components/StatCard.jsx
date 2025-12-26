
import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ title, value, change, icon: Icon, color = "blue" }) => {
  const colorVariants = {
    blue: "from-cyan-500 to-blue-600",       // Total Bookings, Revenue, etc.
    teal: "from-teal-500 to-teal-600",
    orange: "from-orange-500 to-amber-600",   // Commission, Follow-up
    green: "from-green-500 to-emerald-600",   // Mco
    red: "from-red-500 to-rose-600",          // Loss Booking
    lightblue: "from-sky-400 to-cyan-500",    // Fresh, Send to Ticketing, etc.
    gray: "from-gray-400 to-gray-600",        // Charge Back, Users Available
  };

  const bgGradient = colorVariants[color] || colorVariants.blue;

  const isPositive = change?.startsWith("+");

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-90`}></div>

      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_50%)]"></div>
      </div>

      <div className="relative p-5 text-white">
        {Icon && (
          <div className="mb-4 inline-flex rounded-xl bg-white/20 p-3 backdrop-blur-sm">
            <Icon size={32} className="text-white" />
          </div>
        )}

        <p className="text-4xl font-bold tracking-tight">{value}</p>
        <h3 className="mt-2 text-sm font-medium uppercase tracking-wider opacity-90">
          {title}
        </h3>

        {change && (
          <div className={`mt-3 flex items-center gap-1 text-sm font-medium ${isPositive ? "text-green-200" : "text-red-200"}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{change}</span>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 translate-x-full animate-shine"></div>
      </div>
    </div>
  );
};

export default StatCard;
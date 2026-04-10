import { FaLeaf, FaTruck, FaFlask, FaStar, FaSeedling, FaRecycle } from "react-icons/fa";

const items = [
  { Icon: FaLeaf, text: "100% Organic" },
  { Icon: FaTruck, text: "Free Delivery on ₹499+" },
  { Icon: FaFlask, text: "Lab Tested" },
  { Icon: FaStar, text: "4.9/5 Rating" },
  { Icon: FaSeedling, text: "Farm Direct" },
  { Icon: FaRecycle, text: "Eco Packaging" },

  // duplicated for seamless marquee
  { Icon: FaLeaf, text: "100% Organic" },
  { Icon: FaTruck, text: "Free Delivery on ₹499+" },
  { Icon: FaFlask, text: "Lab Tested" },
  { Icon: FaStar, text: "4.9/5 Rating" },
  { Icon: FaSeedling, text: "Farm Direct" },
  { Icon: FaRecycle, text: "Eco Packaging" },
];


export default function MarqueeBanner() {
  return (
    <div className="bg-gold-light/30 border-y border-gold/20 py-3 overflow-hidden">
      <div className="marquee-track flex gap-12 w-max animate-marquee">
        {items.map((item, i) => {
          const Icon = item.Icon;

          return (
            <span
              key={i}
              className="flex items-center gap-2 text-xs font-body font-semibold text-bark whitespace-nowrap tracking-wide"
            >
              <Icon className="text-green-800 text-sm" />
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}

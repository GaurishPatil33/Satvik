import { FlaskConical, Handshake, Leaf, Truck } from "lucide-react"

const trusts = [
  {
    icon: <Leaf />,
    title: '100% Organic',
    desc: 'Certified by FSSAI & India Organic',
  },
  {
    icon: <Truck />,
    title: 'Free Delivery',
    desc: 'On all orders above ₹499',
  },

  {
    icon: <FlaskConical />,
    title: 'Lab Certified',
    desc: 'FSSAI approved quality',
  },

  // {
  //   icon: <FlaskConical />,
  //   title: 'Lab Tested',
  //   desc: 'Every batch verified for purity',
  // },

  {
    icon: <Handshake />,
    title: 'Farmer Direct',
    desc: 'Supporting 200+ local farmers',
  },
]

export default function TrustBanner() {
  return (
    <section className="py-10 bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trusts.map((t, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left"
            >
              <span className="text-3xl flex-shrink-0 bg-forest-light/55 ring-2 rounded-lg ring-white p-1.5 text-white">{t.icon}</span>
              <div>
                <p className="text-cream font-body font-semibold text-sm">{t.title}</p>
                <p className="text-cream/60 font-body text-xs mt-0.5 leading-snug">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

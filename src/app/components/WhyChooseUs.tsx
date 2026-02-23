const reasons = [
  {
    title: "Fast Delivery",
    description: "Quick and reliable shipping so your order reaches you on time.",
  },
  {
    title: "Secure Payments",
    description: "Trusted payment gateways with encrypted and safe transactions.",
  },
  {
    title: "Easy Returns",
    description: "Hassle-free return process with responsive customer support.",
  },
  {
    title: "Quality Products",
    description: "Carefully selected items with strong quality and value.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Choose Us</h2>
        <p className="text-gray-600 mt-2">We focus on trust, quality, and customer satisfaction.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reasons.map((item) => (
          <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

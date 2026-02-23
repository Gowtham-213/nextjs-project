const reviews = [
  {
    id: 1,
    name: "Ava Johnson",
    rating: 5,
    image: "https://i.pravatar.cc/120?img=32",
    text: "Excellent service and fast shipping. Product quality is even better than expected.",
  },
  {
    id: 2,
    name: "Liam Brown",
    rating: 5,
    image: "https://i.pravatar.cc/120?img=12",
    text: "Great prices and smooth checkout. My order arrived quickly and in perfect condition.",
  },
  {
    id: 3,
    name: "Sophia Davis",
    rating: 4,
    image: "https://i.pravatar.cc/120?img=47",
    text: "Very good experience overall. Support team was helpful and resolved my query quickly.",
  },
];

export default function TopReviews() {
  return (
    <section className="py-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top Reviews</h2>
        <p className="text-gray-600 mt-2">What customers are saying about their shopping experience.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <img
                src={review.image}
                alt={review.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-amber-200"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                <div className="text-base text-amber-500 leading-none">
                  {"\u2605".repeat(review.rating)}
                  <span className="text-gray-300">{"\u2605".repeat(5 - review.rating)}</span>
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-gray-700">"{review.text}"</p>
          </article>
        ))}
      </div>
    </section>
  );
}

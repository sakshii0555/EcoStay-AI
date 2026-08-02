function Card({ title, description, image, price, rating }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>

        <p className="text-gray-600 mb-3">
          📍 {description}
        </p>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-green-700">
            ₹{price}
          </span>

          <span className="font-medium">
            ⭐ {rating}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
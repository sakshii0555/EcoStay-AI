function Card({ title, description }) {
  return (
    <div className="border rounded-lg shadow-lg p-5">
      <h2 className="font-bold text-xl mb-2">{title}</h2>

      <p>{description}</p>
    </div>
  );
}

export default Card;
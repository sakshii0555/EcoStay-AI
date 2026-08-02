import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Dashboard() {
  const [homestays, setHomestays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");

  const [newHomestay, setNewHomestay] = useState({
    name: "",
    location: "",
    image: "",
    price: "",
    rating: "",
  });

  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5000/api/homestays", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setHomestays(data.data);
      } else {
        console.error(data.message);
      }
    })
    .catch((err) => console.error(err));
}, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const addHomestay = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/homestays", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newHomestay.name,
        location: newHomestay.location,
        image: newHomestay.image,
        price: Number(newHomestay.price),
        rating: Number(newHomestay.rating),
      }),
    });

    const data = await response.json();

    if (data.success) {
      setHomestays([...homestays, data.data]);

      setNewHomestay({
        name: "",
        location: "",
        image: "",
        price: "",
        rating: "",
      });

      setShowModal(false);

      alert("Homestay added successfully!");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to add homestay.");
  }
};
 
    const deleteHomestay = async (id) => {
  if (!window.confirm("Delete this homestay?")) return;

  try {
   const token = localStorage.getItem("token");

const response = await fetch(
  `http://localhost:5000/api/homestays/${id}`,
  {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    const data = await response.json();

    if (data.success) {
      setHomestays(homestays.filter((item) => item._id !== id));
      alert("Homestay deleted successfully!");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to delete homestay.");
  }
};

  const editHomestay = (homestay) => {
  setIsEditing(true);
  setEditId(homestay._id);

  setNewHomestay({
    name: homestay.name,
    location: homestay.location,
    image: homestay.image,
    price: homestay.price,
    rating: homestay.rating,
  });

  setShowModal(true);
};

  const updateHomestay = async () => {
  try {
    const token = localStorage.getItem("token");

const response = await fetch(
  `http://localhost:5000/api/homestays/${editId}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newHomestay),
  }
);

    const data = await response.json();

    if (data.success) {
      setHomestays(
        homestays.map((item) =>
          item._id === editId ? data.data : item
        )
      );

      setShowModal(false);
setIsEditing(false);
setEditId("");

setNewHomestay({
  name: "",
  location: "",
  image: "",
  price: "",
  rating: "",
});

      alert("Homestay updated successfully!");
    }
  } catch (error) {
    console.error(error);
    alert("Update failed.");
  }
};

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto pt-32 px-8 pb-8">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Available Homestays
          </h1>

          <button
  onClick={() => {
    setIsEditing(false);
    setEditId("");

    setNewHomestay({
      name: "",
      location: "",
      image: "",
      price: "",
      rating: "",
    });

    setShowModal(true);
  }}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold transition"
          >
            + Add Homestay
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homestays.map((homestay) => (
            <div
              key={homestay._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={homestay.image}
                alt={homestay.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold">
                  {homestay.name}
                </h2>

                <p className="mt-2">
                  📍 {homestay.location}
                </p>

                <p className="mt-2">
                  💰 ₹{homestay.price}
                </p>

                <p className="mt-2">
                  ⭐ {homestay.rating}
                </p>

                <div className="flex gap-3 mt-5">
                  <button
  onClick={() => editHomestay(homestay)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
>
  Edit
</button>

                <button
  onClick={() => deleteHomestay(homestay._id)}
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
>
  Delete
</button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">

          <div className="bg-white rounded-xl p-8 w-[420px] shadow-2xl">

            <h2 className="text-3xl font-bold mb-6">
  {isEditing ? "Edit Homestay" : "Add Homestay"}
</h2>

            <input
              type="text"
              placeholder="Homestay Name"
              value={newHomestay.name}
              onChange={(e) =>
                setNewHomestay({
                  ...newHomestay,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-4"
            />

            <input
              type="text"
              placeholder="Location"
              value={newHomestay.location}
              onChange={(e) =>
                setNewHomestay({
                  ...newHomestay,
                  location: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-4"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={newHomestay.image}
              onChange={(e) =>
                setNewHomestay({
                  ...newHomestay,
                  image: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-4"
            />

            <input
              type="number"
              placeholder="Price"
              value={newHomestay.price}
              onChange={(e) =>
                setNewHomestay({
                  ...newHomestay,
                  price: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-4"
            />

            <input
              type="number"
              step="0.1"
              placeholder="Rating"
              value={newHomestay.rating}
              onChange={(e) =>
                setNewHomestay({
                  ...newHomestay,
                  rating: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-6"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => {
  setShowModal(false);
  setIsEditing(false);
  setEditId("");

  setNewHomestay({
    name: "",
    location: "",
    image: "",
    price: "",
    rating: "",
  });
}}
                className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>

<button
  onClick={isEditing ? updateHomestay : addHomestay}
  className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
>
  {isEditing ? "Update" : "Save"}
</button>

            </div>

          </div>

        </div>
      )}

      <Footer />
    </>
  );
}

export default Dashboard;
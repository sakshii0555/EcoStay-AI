import { Button, Input, Modal, Toast, Loader } from "../components/UI";
import { useState } from "react";

function Showcase() {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">UI Component Showcase</h1>

      {/* Button */}
      <div>
        <h2 className="font-semibold mb-2">Button</h2>
        <Button text="Click Me" />
      </div>

      {/* Input */}
      <div>
        <h2 className="font-semibold mb-2">Input</h2>
        <Input placeholder="Enter your name" />
      </div>

      {/* Modal */}
      <div>
        <h2 className="font-semibold mb-2">Modal</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Open Modal
        </button>

        {showModal && (
          <Modal title="EcoStay AI Modal">
            <p>This is a sample modal component.</p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </Modal>
        )}
      </div>

      {/* Toast */}
      <div>
        <h2 className="font-semibold mb-2">Toast</h2>

        <button
          onClick={() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Show Toast
        </button>

        {showToast && (
          <Toast message="Booking successful!" />
        )}
      </div>

      {/* Loader */}
      <div>
        <h2 className="font-semibold mb-2">Loader</h2>
        <Loader />
      </div>
    </div>
  );
}

export default Showcase;
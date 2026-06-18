/**
 * Modal Component
 * Props:
 * - title: modal heading
 * - children: modal content
 */

function Modal({ title, children }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
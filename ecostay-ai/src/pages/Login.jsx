import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">
          Login
        </h1>

        <p>
          Sign in to access your EcoStay AI account.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Login;
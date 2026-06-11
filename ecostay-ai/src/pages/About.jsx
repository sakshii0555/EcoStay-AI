import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">
          About EcoStay AI
        </h1>

        <p>
          EcoStay AI helps travelers discover sustainable homestays and eco-tourism experiences.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default About;
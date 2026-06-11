import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 p-8">
        <Card
          title="Mountain View Homestay"
          description="Experience nature in a sustainable mountain retreat."
        />

        <Card
          title="Forest Eco Lodge"
          description="Stay close to nature while supporting responsible tourism."
        />
      </div>

      <Footer />
    </>
  );
}

export default Home;
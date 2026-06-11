function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/mountains.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
  Discover Sustainable Travel
</h1>

        <p className="text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mb-10">
          Where nature, comfort, and responsible tourism come together.
        </p>

        <button className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg">
          Explore Homestays
        </button>

      </div>
    </section>
  );
}

export default Hero;
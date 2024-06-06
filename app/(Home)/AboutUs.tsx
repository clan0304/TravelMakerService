const AboutUs = () => {
  return (
    <section className="flex flex-col gap-16  py-24 px-8 w-full bg-gradient-to-r from-red-500/60 to-blue-500/60">
      <h1 className="text-4xl font-bold text-center text-white">
        Get to know our services
      </h1>
      <div className="flex flex-col md:flex-row gap-10 w-full items-center text-center">
        <div className="min-h-[200px] w-full md:w-1/2 bg-white py-5  rounded-md">
          <h2 className="font-semibold text-2xl min-h-[70px] text-blue-700/70">
            Save your places
          </h2>
          <h3 className="text-md text-left pl-3">
            Search and save places you want. Make your own list!
          </h3>
        </div>
        <div className="min-h-[200px] w-full md:w-1/2 bg-slate-100 py-5 rounded-md ">
          <h2 className="font-semibold text-2xl min-h-[70px] text-red-700/90 ">
            Find great places based on the location.
          </h2>
          <h3 className="text-md text-left pl-3">
            Find places you have saved based on the location. And get ready to
            enjoy your time!
          </h3>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

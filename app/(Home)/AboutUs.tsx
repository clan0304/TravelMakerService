const AboutUs = () => {
  return (
    <section className="flex flex-col gap-10 mt-10 px-8 w-full">
      <h1 className="text-3xl font-bold text-center">
        Get to know our services
      </h1>
      <div className="flex flex-col sm:flex-row gap-10 w-full items-center text-center">
        <div className="min-h-[200px] w-1/2 bg-gradient-to-r from-red-100 to-blue-100 py-5  rounded-md">
          <h2 className="font-semibold text-xl min-h-[70px]">
            Save your places
          </h2>
          <h3 className="text-md text-left pl-2">
            Search and save places you want. Make your own list!
          </h3>
        </div>
        <div className="min-h-[200px] w-1/2 bg-slate-100 py-5 rounded-md bg-gradient-to-r to-red-100 from-blue-100">
          <h2 className="font-semibold text-xl min-h-[70px] ">
            Find great places based on the location.
          </h2>
          <h3 className="text-md text-left pl-2">
            Find places you have saved based on the location. And get ready to
            enjoy your time!
          </h3>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

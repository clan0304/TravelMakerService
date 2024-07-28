import Grid from './Grid';

const AboutUs = () => {
  return (
    <section className="flex flex-col gap-16  py-24 px-8 w-full bg-indigo-900">
      <h1 className="text-5xl font-bold text-center text-indigo-300/70 font-ubuntu">
        Get to know our services
      </h1>
      <Grid />
    </section>
  );
};

export default AboutUs;

import Grid from './Grid';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="flex flex-col gap-16  py-24 px-8 w-full bg-indigo-900">
      <h1 className="text-5xl font-bold text-center text-indigo-300/70 font-ubuntu">
        Get to know our services
      </h1>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0, ease: 'easeInOut' }}
        viewport={{ once: true }}
      >
        <Grid />
      </motion.div>
    </section>
  );
};

export default AboutUs;

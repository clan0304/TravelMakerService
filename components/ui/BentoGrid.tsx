import { cn } from '@/utils/cn';
import Image from 'next/image';
import { BackgroundGradientAnimation } from './Background-gradient-animation';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'grid  grid-cols-1 sm:grid-cols-2 gap-4 max-w-7xl mx-auto md:gap-10 lg:gap-20 xl:gap-32',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  image,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
}) => {
  return (
    <div
      className={cn(
        'relative row-span-1 aspect-[4/3]  rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black dark:border-white/[0.2] bg-white  justify-between flex flex-col space-y-4',
        className
      )}
    >
      {image ? (
        <Image
          src={image}
          alt="Grid Image"
          fill
          objectFit="fill"
          className="absolute inset-0 rounded-xl brightness-90"
        />
      ) : (
        <div className="w-full h-full rounded-xl brightness-90">
          <BackgroundGradientAnimation></BackgroundGradientAnimation>
        </div>
      )}
      <div className="group-hover/bento:translate-x-2 transition duration-200 absolute bottom-8 left-3 px-3">
        {icon}
        <div className="font-sans font-bold font-kanit text-3xl sm:text-xl md:text-2xl lg:text-3xl text-white dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-lg sm:text-md md:text-lg lg:text-xl text-white  dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};

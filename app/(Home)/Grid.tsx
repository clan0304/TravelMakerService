import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { gridItems } from '@/data';
import React from 'react';

const Grid = () => {
  return (
    <section>
      <BentoGrid>
        {gridItems.map((item) => (
          <BentoGridItem
            title={item.title}
            description={item.description}
            key={item.id}
            image={item.image}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;

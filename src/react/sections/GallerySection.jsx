import React from 'react';
import { SectionHeading } from '../components/ui/AnimatedHeading';
import { FilterableGallery } from '../components/ui/PhotoGallery';
import { TopographicPattern } from '../components/textures/TopographicPattern';

export const GallerySection = () => {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
      alt: 'Lake view from deck',
      title: 'Sunrise Views',
      category: 'exterior'
    },
    {
      src: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800',
      alt: 'Cozy living room',
      title: 'Living Room',
      category: 'interior'
    },
    {
      src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      alt: 'Master bedroom',
      title: 'Master Suite',
      category: 'interior'
    },
    {
      src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800',
      alt: 'Private dock',
      title: 'Private Dock',
      category: 'exterior'
    },
    {
      src: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800',
      alt: 'Kitchen',
      title: 'Modern Kitchen',
      category: 'interior'
    },
    {
      src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800',
      alt: 'Lake activities',
      title: 'Water Sports',
      category: 'activities'
    },
    {
      src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
      alt: 'Fire pit area',
      title: 'Evening Gatherings',
      category: 'exterior'
    },
    {
      src: 'https://images.unsplash.com/photo-1522444690501-3b8b5a0f3f42?w=800',
      alt: 'Guest bedroom',
      title: 'Guest Room',
      category: 'interior'
    },
    {
      src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800',
      alt: 'Lake at sunset',
      title: 'Golden Hour',
      category: 'activities'
    }
  ];

  const categories = ['exterior', 'interior', 'activities'];

  return (
    <section className="py-20 relative bg-white">
      <TopographicPattern animated={true} opacity={0.05} />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title="Capture the Moments"
          subtitle="Explore every corner of your lakeside paradise"
        />

        <FilterableGallery images={images} categories={categories} />
      </div>
    </section>
  );
};
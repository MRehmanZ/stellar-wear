import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">About StellarWear</h1>
        <p className="text-lg text-gray-600 mt-4">
          Discover the story behind StellarWear, a brand committed to bringing you the finest apparel with a blend of classic and modern designs.
        </p>
      </header>

      <section className="mb-12">
        <Card className="bg-gray-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              At StellarWear, our mission is to empower individuals through high-quality fashion. We believe in the power of a well-tailored suit or a perfectly chosen accessory to transform not just your look, but your confidence.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img src="/images/about-us/mission.jpg" alt="Our Mission" className="rounded-lg shadow-lg w-full h-auto object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
            <p className="text-gray-700 mb-4">
              We combine classic styles with modern trends, offering a wide range of products from tailored suits to stylish accessories. Our products are designed with the highest quality materials to ensure longevity and comfort.
            </p>
            <Button variant="primary" className="w-full sm:w-auto">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg">
            <CardHeader className="flex justify-center">
              <img src="/images/about-us/team-member-1.jpg" alt="Team Member" className="rounded-full h-32 w-32 object-cover shadow-lg" />
            </CardHeader>
            <CardContent className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Muhammad Rehman Zulfiquar</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex justify-center">
              <img src="/images/about-us/team-member-2.jpg" alt="Team Member" className="rounded-full h-32 w-32 object-cover shadow-lg" />
            </CardHeader>
            <CardContent className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Janette LaCroix</h3>
              <p className="text-gray-600">Chief Designer</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex justify-center">
              <img src="/images/about-us/team-member-3.jpg" alt="Team Member" className="rounded-full h-32 w-32 object-cover shadow-lg" />
            </CardHeader>
            <CardContent className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">John Johnson</h3>
              <p className="text-gray-600">Head of Marketing</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-12 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
        <p className="text-lg mb-8">
          Stay updated with our latest products and exclusive offers. Join the StellarWear community today.
        </p>
        <Button variant="secondary" className="w-full sm:w-auto">
          Subscribe to Newsletter
        </Button>
      </section>
    </div>
  );
};

export default AboutUs;

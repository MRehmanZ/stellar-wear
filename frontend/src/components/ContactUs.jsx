import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(form);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Get in Touch</h1>
        <p className="text-lg text-gray-600 mt-4">
          We would love to hear from you. Reach out to us with any inquiries or feedback.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-12 mb-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">123 Stellar Ave, Fashion City, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">+1 234 567 890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">support@stellarwear.com</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 block w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="mt-1 block w-full"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Location</h2>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.970688690739!2d-74.0060152845963!3d40.71277597933121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a19bf421e67%3A0x7b12168e5a1fbe1d!2sFashion%20Ave%2C%20New%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2s!4v1616486042526!5m2!1sen!2s"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
            title="Our Location"
            className="border-none"
          ></iframe>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-12 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold mb-4">Stay Connected</h2>
        <p className="text-lg mb-8">
          Follow us on social media to stay updated with our latest news and offers.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-200">
            Facebook
          </Button>
          <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-200">
            Twitter
          </Button>
          <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-200">
            Instagram
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('https://localhost:7233/api/addresses', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setAddresses(data.$values);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async () => {
    try {
      const response = await fetch('https://localhost:7233/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newAddress)
      });

      if (response.ok) {
        const address = await response.json();
        setAddresses([...addresses, address]);
        setNewAddress({
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: ''
        });
        toast.success('Address added successfully!');
      } else {
        throw new Error('Failed to add address');
      }
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error('Error adding address.');
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const response = await fetch(`https://localhost:7233/api/addresses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setAddresses(addresses.filter(address => address.id !== id));
        toast.success('Address deleted successfully!');
      } else {
        throw new Error('Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Error deleting address.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Addresses</h1>
      <div className="space-y-4 mb-6">
        {addresses.map(address => (
          <div key={address.id} className="p-4 border rounded">
            <p>{address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}</p>
            <Button variant="destructive" onClick={() => handleDeleteAddress(address.id)}>Delete</Button>
          </div>
        ))}
      </div>
      <div className="p-4 border rounded space-y-4">
        <h2 className="text-xl font-semibold">Add New Address</h2>
        <Input placeholder="Street" name="street" value={newAddress.street} onChange={handleChange} />
        <Input placeholder="City" name="city" value={newAddress.city} onChange={handleChange} />
        <Input placeholder="State" name="state" value={newAddress.state} onChange={handleChange} />
        <Input placeholder="Postal Code" name="postalCode" value={newAddress.postalCode} onChange={handleChange} />
        <Input placeholder="Country" name="country" value={newAddress.country} onChange={handleChange} />
        <Button onClick={handleAddAddress}>Add Address</Button>
      </div>
    </div>
  );
};

export default AddressManagement;

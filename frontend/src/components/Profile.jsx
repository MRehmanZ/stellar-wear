import React, { useState, useEffect } from 'react';
import { getUserData, updateUserData, deleteUserData } from '../services/GDPRService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react'; // Import a loader icon for visual feedback

const Profile = () => {
  const [userData, setUserData] = useState({ email: '', phoneNumber: '' });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    // Simple validation for email and phone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (userData.phoneNumber && userData.phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await updateUserData(userData);
      toast.success('User data updated successfully');
    } catch (error) {
      toast.error('Failed to update user data');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account and all associated data?')) {
      setSubmitting(true);
      try {
        await deleteUserData();
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('gdprConsent');
        toast.success('User account and data deleted successfully');
        navigate('/');  // Redirect to the home page or login after deletion
      } catch (error) {
        toast.error('Failed to delete user data');
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader className="animate-spin w-8 h-8 text-gray-600" /></div>;
  if (error) return <div className="text-red-600 text-center mt-4">{error}</div>;

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Your Data</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <Input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          disabled={submitting}
          className="mt-1 block w-full"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium">Phone Number</label>
        <Input
          type="text"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleChange}
          disabled={submitting}
          className="mt-1 block w-full"
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button 
          onClick={handleUpdate} 
          className="mr-4 w-full sm:w-auto"
          disabled={submitting}
        >
          {submitting ? <Loader className="animate-spin w-4 h-4 mr-2" /> : null}
          Update Data
        </Button>
        
        <Button 
          variant="destructive" 
          onClick={handleDelete} 
          className="w-full sm:w-auto"
          disabled={submitting}
        >
          {submitting ? <Loader className="animate-spin w-4 h-4 mr-2" /> : null}
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const JobSeekerProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        highestQualification: '',
        interestedRole: '',
        skillset: '',
        resume: null,
        profilePicture: null
    });
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Error fetching profile data. Please try again.');
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('highestQualification', profile.highestQualification);
        formData.append('interestedRole', profile.interestedRole);
        formData.append('skillset', profile.skillset);

        if (profile.resume) formData.append('resume', profile.resume);
        if (profile.profilePicture) formData.append('profilePicture', profile.profilePicture);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProfile(response.data);
            setSuccess('Profile updated successfully');
            setError(null);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Error updating profile. Please try again.');
            setSuccess(null);
        }
    };

    const handleProfilePictureClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen">
            <Navbar />
            <div className="pt-20 p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-800">Job Seeker Profile</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                {!editMode ? (
                    <div className="space-y-6">
                        <div className="flex justify-center mb-4">
                            {profile.profilePicture ? (
                                <img
                                    src={`http://localhost:5000/${profile.profilePicture}`}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover cursor-pointer"
                                    onClick={handleProfilePictureClick}
                                />
                            ) : (
                                <div
                                    className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 cursor-pointer"
                                    onClick={handleProfilePictureClick}
                                >
                                    No Image
                                </div>
                            )}
                            <input
                                type="file"
                                name="profilePicture"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                ref={fileInputRef}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">Name</label>
                            <p className="p-3 border border-gray-300 rounded-lg shadow-sm">{profile.name}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">Email</label>
                            <p className="p-3 border border-gray-300 rounded-lg shadow-sm">{profile.email}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">Highest Qualification</label>
                            <p className="p-3 border border-gray-300 rounded-lg shadow-sm">{profile.highestQualification}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">Interested Role</label>
                            <p className="p-3 border border-gray-300 rounded-lg shadow-sm">{profile.interestedRole}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">Skillset</label>
                            <p className="p-3 border border-gray-300 rounded-lg shadow-sm">{profile.skillset}</p>
                        </div>
                        <button
                            onClick={() => setEditMode(true)}
                            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700"
                        >
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center mb-4">
                            {profile.profilePicture ? (
                                <img
                                    src={`http://localhost:5000/${profile.profilePicture}`}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover cursor-pointer"
                                    onClick={handleProfilePictureClick}
                                />
                            ) : (
                                <div
                                    className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 cursor-pointer"
                                    onClick={handleProfilePictureClick}
                                >
                                    No Image
                                </div>
                            )}
                            <input
                                type="file"
                                name="profilePicture"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                ref={fileInputRef}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">Highest Qualification</label>
                            <input
                                type="text"
                                name="highestQualification"
                                value={profile.highestQualification}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">Interested Role</label>
                            <input
                                type="text"
                                name="interestedRole"
                                value={profile.interestedRole}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">Skillset</label>
                            <input
                                type="text"
                                name="skillset"
                                value={profile.skillset}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">Resume</label>
                            <input
                                type="file"
                                name="resume"
                                onChange={handleFileChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="w-full p-3 mt-3 bg-gray-600 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default JobSeekerProfile;

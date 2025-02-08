import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [email, setEmail] = useState("");
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        axios.get(import.meta.env.FRONT_URL+'/api/events')
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, []);

    const sendEmail = async (e) => {
        e.preventDefault();

        try {
            await axios.post(import.meta.env.FRONT_URL+'/api/email', { email });
            alert("✅ Email Submitted Successfully!");
            setToggle(false);
            setEmail("");
        } catch (error) {
            console.error(error);
            alert("❌ Failed to submit email. Try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <h2 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-blue-500 to-purple-600 py-4 rounded-lg shadow-md">
                🎉 Events in Sydney
            </h2>

            {/* Event Cards */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                    <div key={event._id || index} className="bg-white shadow-lg rounded-lg p-4 transition transform hover:scale-105 hover:shadow-xl">
                        <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-lg" />
                        <h3 className="text-xl font-semibold mt-3 text-gray-800">{event.title}</h3>
                        <p className="text-gray-600 mt-1">{event.date} • {event.location}</p>
                        <button 
                            className="mt-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition hover:opacity-80"
                            onClick={() => setToggle(true)}
                        >
                            🎟 Get Tickets
                        </button>
                    </div>
                ))}
            </div>

            {/* Email Modal */}
            {toggle && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg transform scale-105 transition-all">
                        <h3 className="text-lg font-semibold text-center">📩 Enter your Email</h3>
                        <form onSubmit={sendEmail} className="mt-4 flex flex-col gap-4">
                            <input 
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="Enter your email"
                                className="border p-2 rounded w-72 text-center focus:ring-2 focus:ring-blue-400 outline-none"
                                required
                            />
                            <button 
                                type="submit" 
                                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold transition hover:bg-green-600"
                            >
                                ✅ Submit
                            </button>
                        </form>
                        <button 
                            className="mt-3 w-full bg-red-500 text-white px-4 py-2 rounded-lg font-semibold transition hover:bg-red-600"
                            onClick={() => setToggle(false)}
                        >
                            ❌ Close
                        </button>
                    </div>
                </div>
            )}
            <h1 className='bg-green-400 text-white text-center mt-7'>These Events will be updated in every 24 hours</h1>
        </div>
    );
};

export default EventList;

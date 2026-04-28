"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type College = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  description: string;
};

export default function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState<College | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/colleges/${id}`)
      .then((res) => res.json())
      .then((data) => setCollege(data));
  }, [id]);

  if (!college) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h1 className="text-2xl font-semibold">{college.name}</h1>
        <p className="text-gray-600">{college.location}</p>

        <div className="mt-3">
          <p>💰 Fees: ₹{college.fees}</p>
          <p>⭐ Rating: {college.rating}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Courses */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Courses</h2>
          <ul className="text-sm text-gray-600">
            <li>B.Tech Computer Science</li>
            <li>B.Tech Mechanical</li>
            <li>B.Tech Electrical</li>
          </ul>
        </div>

        {/* Placements */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Placements</h2>
          <p className="text-sm text-gray-600">
            Average Package: ₹12 LPA  
            <br />
            Top Recruiters: Google, Microsoft, Amazon
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6 bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-2">About</h2>
        <p className="text-sm text-gray-600">{college.description}</p>
      </div>
    </div>
  );
}
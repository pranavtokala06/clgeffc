"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type College = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
};

export default function Home() {
  const router = useRouter();

  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<College[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/colleges")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleSelect = (college: College) => {
    const exists = selected.find((c) => c.id === college.id);

    if (exists) {
      setSelected(selected.filter((c) => c.id !== college.id));
    } else {
      if (selected.length < 2) {
        setSelected([...selected, college]);
      }
    }
  };

  const toggleSave = (id: string) => {
    if (saved.includes(id)) {
      setSaved(saved.filter((c) => c !== id));
    } else {
      setSaved([...saved, id]);
    }
  };

  const filtered = colleges.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "fees") return a.fees - b.fees;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-gray-700 text-white py-10 px-6 mb-10 shadow">
        <h1 className="text-3xl font-semibold text-center">clgeffc</h1>
        <p className="text-center text-sm text-gray-200 mt-2">
          smart college discovery made simple
        </p>
      </div>

      <div className="px-6 md:px-16">
        {/* Search */}
        <input
          type="text"
          placeholder="Search colleges..."
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 
          text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sort */}
        <select
          className="mb-6 border p-2 rounded"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="fees">Fees (Low to High)</option>
          <option value="rating">Rating (High to Low)</option>
        </select>

        {/* Stats */}
        <div className="flex gap-6 mb-6 text-sm text-gray-700">
          <div>Total: {colleges.length}</div>
          <div>Showing: {filtered.length}</div>
        </div>

        {/* Selected */}
        {selected.length > 0 && (
          <div className="mb-4 text-sm text-gray-700">
            Selected: {selected.map((c) => c.name).join(", ")}
          </div>
        )}

        {selected.length === 1 && (
          <p className="text-sm text-gray-500 mb-4">
            Select one more college to compare
          </p>
        )}

        {/* Compare */}
        {selected.length === 2 && (
          <div className="mb-10 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Comparison
            </h2>

            <table className="w-full text-sm text-gray-700">
              <tbody>
                <tr>
                  <td className="font-medium">Name</td>
                  <td>{selected[0].name}</td>
                  <td>{selected[1].name}</td>
                </tr>
                <tr>
                  <td className="font-medium">Location</td>
                  <td>{selected[0].location}</td>
                  <td>{selected[1].location}</td>
                </tr>
                <tr>
                  <td className="font-medium">Fees</td>
                  <td>₹{selected[0].fees}</td>
                  <td>₹{selected[1].fees}</td>
                </tr>
                <tr>
                  <td className="font-medium">Rating</td>
                  <td>{selected[0].rating}</td>
                  <td>{selected[1].rating}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Loading */}
        {loading && <p className="text-center text-gray-600">Loading...</p>}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          {sorted.map((college) => {
            const isSelected = selected.some((c) => c.id === college.id);
            const isSaved = saved.includes(college.id);

            return (
              <div
                key={college.id}
                onClick={() => toggleSelect(college)}
                className={`cursor-pointer rounded-xl overflow-hidden transition shadow-sm
                ${
                  isSelected
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "bg-white hover:shadow-lg"
                }`}
              >
                {/* Image */}
                <img
                  src={`https://source.unsplash.com/400x200/?university,campus&sig=${college.id}`}
                  className="w-full h-40 object-cover"
                />

                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {college.name}
                    </h2>

                    {college.rating > 4.7 && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        Top Pick
                      </span>
                    )}
                  </div>

                  <p className="text-gray-500 text-sm mt-1">
                    {college.location}
                  </p>

                  <div className="mt-3 text-sm text-gray-700">
                    <p>💰 Fees: ₹{college.fees}</p>
                    <p>⭐ Rating: {college.rating}</p>
                  </div>

                  {/* Buttons */}
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(college.id);
                      }}
                      className="text-xs text-blue-600"
                    >
                      {isSaved ? "Saved ✓" : "Save"}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/college/${college.id}`);
                      }}
                      className="text-xs text-gray-700 underline"
                    >
                      View →
                    </button>
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
                    Click card to compare
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
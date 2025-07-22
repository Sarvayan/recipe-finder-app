"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
};

type MealDetail = {
  id?: string;
  category: string;
  area: string;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [meal, setMeal] = useState<Meal[] | null>(null);
  const [enableDiv, setEnableDiv] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealDetail[]>([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=" + search)
      .then((res) => res.json())
      .then((res) => {
        setMeal(res.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);

  function showDetails(e: string) {
    setEnableDiv(true);
    if (meal) {
      const matched = meal.find((item) => item.idMeal === e);
      if (matched) {
        setSelectedMeal([{ 
          id: matched.idMeal,
          category: matched.strCategory, 
          area: matched.strArea 
        }]);
      }
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Food Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* Secondary Image (now positioned in the content) */}
      <div className="relative w-full max-w-4xl mx-auto mt-8 mb-8 h-64 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="https://plus.unsplash.com/premium_photo-1661507070247-1ed0a6ed3ca2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Featured Food"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Discover Culinary Delights</h2>
            <p className="text-white/90">Explore recipes from every corner of the world</p>
          </div>
        </div>
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Recipe Finder
          </h1>
          <p className="text-lg text-white/90 drop-shadow-md">
            Discover delicious recipes from around the world
          </p>
        </header>

        {/* Search Section */}
        <section className="flex flex-col items-center mb-12">
          <div className="w-full max-w-md relative">
            <input
              className="w-full px-6 py-4 rounded-full border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg placeholder-indigo-300 transition-all duration-200 bg-white/95 backdrop-blur-sm"
              placeholder="Search meal by first letter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              className="absolute right-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </section>

        {/* Results Section */}
        <section className="flex justify-center">
          <div className="w-full max-w-2xl">
            {Array.isArray(meal) && meal.length > 0 && (
              <ul className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl max-h-64 overflow-y-auto">
                {meal.map((item, index) => (
                  <div
                    key={index}
                    className="group border-b border-gray-100 last:border-b-0 hover:bg-indigo-50 transition-colors duration-150 relative"
                  >
                    <Link href={"/recipe/" + item.idMeal}>
                      <li
                        className="px-6 py-4 flex justify-between items-center cursor-pointer"
                        onMouseEnter={() => showDetails(item.idMeal)}
                        onMouseLeave={() => setEnableDiv(false)}
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-indigo-900">
                            {item.strMeal}
                          </h3>
                        </div>
                        <svg
                          className="h-5 w-5 text-indigo-400 group-hover:text-indigo-600 transition-colors duration-150"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </li>
                    </Link>

                    {/* Hover Details */}
                    {enableDiv && selectedMeal[0]?.id === item.idMeal && (
                      <div className="mt-2 ml-6 w-full bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <svg
                              className="h-5 w-5 text-indigo-500 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="font-medium text-gray-700">
                              Category:
                            </span>
                            <span className="ml-2 text-gray-900">
                              {selectedMeal[0].category}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <svg
                              className="h-5 w-5 text-indigo-500 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="font-medium text-gray-700">
                              Origin:
                            </span>
                            <span className="ml-2 text-gray-900">
                              {selectedMeal[0].area}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </ul>
            )}

            {Array.isArray(meal) && meal.length === 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 text-center">
                <svg
                  className="h-16 w-16 mx-auto text-indigo-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No recipes found
                </h3>
                <p className="text-gray-500">
                  Try searching with a different letter
                </p>
              </div>
            )}

            {!meal && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 text-center">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
                <p className="mt-4 text-gray-600">Start by typing a letter</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-white/80 text-sm drop-shadow-md pb-8">
          <p>Powered by TheMealDB API</p>
        </footer>
      </main>
    </div>
  );
}
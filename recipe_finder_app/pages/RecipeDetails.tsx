"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  params : {
    id: string
  }
};

type Meal = {
  idMeal: string;
  strArea: string;
  strCategory: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strInstructions: string;
  strMeal: string;
  strMealThumb: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strTags: string;
  strYoutube: string;
};

function RecipeDetails({params}: Props) {
  
  const { id } = params;
  console.log(id)
  const [meal, setMeal] = useState<Meal[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
      .then((res) => res.json())
      .then((res) => {
        setMeal(res.meals);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <div className="fixed inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Food Background"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        </div>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="relative min-h-screen">
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
        <div className="min-h-screen flex items-center justify-center text-center p-4">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              Meal not found
            </h2>
            <p className="text-gray-600 mt-2">Please try another recipe</p>
          </div>
        </div>
      </div>
    );
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

      {/* Content */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        {Array.isArray(meal) &&
          meal.map((item, index) => (
            <div
              key={index}
              className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Hero Section */}
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/2">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={item.strMealThumb}
                      alt={item.strMeal}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                  </div>
                </div>
                <div className="p-8 md:w-1/2">
                  <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                    {item.strCategory} • {item.strArea}
                  </div>
                  <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    {item.strMeal}
                  </h1>

                  {item.strTags && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.strTags.split(",").map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.strYoutube && (
                    <div className="mt-4">
                      <a
                        href={item.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                        Watch on YouTube
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Ingredients Section */}
              <div className="px-8 py-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Ingredients
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      ingredient: item.strIngredient1,
                      measure: item.strMeasure1,
                    },
                    {
                      ingredient: item.strIngredient2,
                      measure: item.strMeasure2,
                    },
                    {
                      ingredient: item.strIngredient3,
                      measure: item.strMeasure3,
                    },
                    {
                      ingredient: item.strIngredient4,
                      measure: item.strMeasure4,
                    },
                  ]
                    .filter(
                      (item) => item.ingredient && item.ingredient.trim() !== ""
                    )
                    .map((ing, i) => (
                      <div
                        key={i}
                        className="bg-indigo-50 rounded-lg p-3 flex items-center"
                      >
                        <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {ing.ingredient}
                          </p>
                          <p className="text-sm text-gray-500">{ing.measure}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Instructions Section */}
              <div className="px-8 py-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Instructions
                </h2>
                <div className="prose max-w-none text-gray-700">
                  {item.strInstructions.split("\n").map((paragraph, i) => (
                    <p key={i} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecipeDetails;

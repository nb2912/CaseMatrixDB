"use client";
import React from 'react';

export default function CourtsPage() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Courts Near Me</h1>
      <p className="mb-4">Find courts near your location. Click the links below to view on Google Maps:</p>
      <ul className="list-disc pl-6">
        <li><a href="https://www.google.com/maps/search/civil+court+near+me" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Civil Courts Near Me</a></li>
        <li><a href="https://www.google.com/maps/search/criminal+court+near+me" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Criminal Courts Near Me</a></li>
        <li><a href="https://www.google.com/maps/search/district+court+near+me" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">District Courts Near Me</a></li>
      </ul>
      <p className="mt-6 text-gray-600">For more accurate results, enable location services in your browser.</p>
    </div>
  );
}

"use client";
import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">About CaseMatrixDB</h1>
      <p className="mb-4">CaseMatrixDB is a modern legal case management platform designed to help users, lawyers, and judges manage cases, evidence, and appointments efficiently. Our mission is to make legal processes more accessible and transparent for everyone.</p>
      <ul className="list-disc pl-6">
        <li>Appoint lawyers by specialization</li>
        <li>Upload and manage evidence</li>
        <li>Find courts near you</li>
        <li>Get quick answers with our legal chatbot</li>
      </ul>
      <p className="mt-6 text-gray-600">For more information, contact us at <a href="mailto:support@casematrixdb.com" className="text-blue-600 underline">support@casematrixdb.com</a>.</p>
    </div>
  );
}

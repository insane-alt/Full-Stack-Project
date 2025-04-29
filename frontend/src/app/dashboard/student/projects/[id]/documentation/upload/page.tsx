'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileVideo } from 'react-icons/fa';

export default function UploadDocumentationPage() {
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const [fileType, setFileType] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(true);
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <Link href={`/dashboard/student/projects/${id}/documentation`} className="text-blue-600 hover:underline font-semibold mb-6 inline-block text-base">← Back to Documentation</Link>
      <div className="bg-white rounded-3xl shadow-2xl p-10 border border-blue-100">
        <h1 className="text-2xl font-extrabold text-blue-900 mb-8 flex items-center gap-2">
          <span>Upload Documentation</span>
        </h1>
        {success ? (
          <div className="text-green-600 font-semibold mb-4 text-center text-lg">Document uploaded successfully! (mock)</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Title</label>
              <input type="text" required className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition" placeholder="Enter document title" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Type</label>
              <select required className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition" value={fileType} onChange={e => setFileType(e.target.value)}>
                <option value="">Select type</option>
                <option value="Report">Report</option>
                <option value="Presentation">Presentation</option>
                <option value="DOC">DOC</option>
                <option value="PPTX">PPTX</option>
                <option value="PDF">PDF</option>
                <option value="MP4">MP4</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Date</label>
              <input type="date" required className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">File
                {fileType === 'PDF' && <FaFilePdf className="text-red-500" />}
                {fileType === 'DOC' && <FaFileWord className="text-blue-700" />}
                {fileType === 'PPTX' && <FaFilePowerpoint className="text-orange-500" />}
                {fileType === 'MP4' && <FaFileVideo className="text-purple-600" />}
              </label>
              <input
                type="file"
                required
                className="w-full border-2 border-blue-200 rounded-lg px-2 py-2 focus:outline-none focus:border-blue-500 transition bg-white"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4"
              />
              <p className="text-xs text-gray-500 mt-1">Allowed file types: PDF, DOC, DOCX, PPT, PPTX, MP4</p>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 font-bold text-lg transition">Upload</button>
          </form>
        )}
      </div>
    </div>
  );
} 
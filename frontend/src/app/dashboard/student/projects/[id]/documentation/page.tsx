'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const mockDocuments = [
  { id: 1, title: 'Phase 1 Report', type: 'Report', date: '2024-04-01', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 2, title: 'Phase 1 PPT', type: 'Presentation', date: '2024-04-02', url: 'https://file-examples.com/wp-content/uploads/2017/08/file_example_PPT_500kB.ppt' },
  { id: 3, title: 'Phase 2 Report', type: 'Report', date: '2024-05-01', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 4, title: 'Phase 2 PPT', type: 'Presentation', date: '2024-05-02', url: 'https://file-examples.com/wp-content/uploads/2017/08/file_example_PPT_500kB.ppt' },
];

export default function DocumentationTimelinePage() {
  const { id } = useParams();

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link href={`/dashboard/student/projects/${id}`} className="text-blue-600 hover:underline font-semibold mb-4 inline-block">← Back to Project</Link>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-blue-900">Documentation Timeline</h1>
          <Link href={`/dashboard/student/projects/${id}/documentation/upload`} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-semibold text-sm">
            Upload Documentation
          </Link>
        </div>
        <div className="relative border-l-2 border-blue-200 pl-6">
          {mockDocuments.map((doc, idx) => (
            <div key={doc.id} className="mb-8 flex items-start gap-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full mt-1.5" />
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-semibold text-blue-900 text-base">{doc.title}</span>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center text-sm font-semibold px-4 py-1 rounded-full shadow-md border-0 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400
                      ${doc.type === 'Report' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500'}`}
                    style={{ minWidth: '110px', justifyContent: 'center', textAlign: 'center' }}
                  >
                    {doc.type}
                  </a>
                </div>
                <div className="text-xs text-gray-500 mt-1">{doc.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
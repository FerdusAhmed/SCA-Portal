import React from 'react';

const SeeResultTable = ({ resultSheet }) => {
  if (!resultSheet?.subjects) {
    return null;
  }

  const validResult = resultSheet?.subjects.filter(m => m.mark !== null);

  const getSubjectGrad = mark => {
    if (mark >= 80) return 'A+';
    if (mark >= 70) return 'A';
    if (mark >= 60) return 'A-';
    if (mark >= 50) return 'B';
    if (mark >= 40) return 'C';
    if (mark >= 33) return 'D';
    return 'F';
  };

  const getGradeColor = grade => {
    if (grade === 'A+' || grade === 'A') return 'text-emerald-600';
    if (grade === 'F') return 'text-red-600';
    return 'text-blue-600';
  };

  const getPoint = mark => {
    if (mark >= 80) return 5;
    if (mark >= 70) return 4;
    if (mark >= 60) return 3.5;
    if (mark >= 50) return 3;
    if (mark >= 40) return 2;
    if (mark >= 33) return 1;
    return 0;
  };

  const totalPoint = validResult.reduce(
    (sum, sub) => sum + getPoint(sub.mark),
    0,
  );
  const gpa = (totalPoint / validResult.length).toFixed(2);

  return (
    <div className="p-4 bg-white border border-blue-100 rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="mb-6 p-2">
       
       
        <h2 className="md:text-2xl text-xl  font-black text-blue-700 uppercase mb-4">
            Academic Transcript
        
         </h2>
        

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="p-2 border-l-4 border-blue-500 bg-blue-50">
            <span className="text-xs uppercase text-blue-400 font-bold block">
              Student Name
            </span>
            <span className="text-gray-800 font-semibold">
              {resultSheet?.studentName}
            </span>
          </div>
          <div className="p-2 border-l-4 border-gray-300 bg-gray-50">
            <span className="text-xs uppercase text-gray-500 font-bold block">
              Class Roll
            </span>
            <span className="text-gray-800 font-semibold">
              #{resultSheet?.studentRoll}
            </span>
          </div>
          <div className="p-2 border-l-4 border-gray-300 bg-gray-50">
            <span className="text-xs uppercase text-gray-500 font-bold block">
              Exam Term
            </span>
            <span className="text-gray-800 font-semibold capitalize">
              {resultSheet?.examOption?.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto p-2">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-blue-600 text-white text-sm uppercase">
              <th className="px-4 py-3 font-bold">Subject</th>
              <th className="px-4 py-3 font-bold">Marks</th>
              <th className="px-4 py-3 font-bold text-right">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {validResult.map((sub, index) => {
              const grade = getSubjectGrad(sub.mark);
              return (
                <tr key={index} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-4 text-gray-700 font-medium">
                    {sub.name}
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-bold text-gray-600">{sub.mark}</span>
                  </td>
                  <td
                    className={`px-4 py-4 text-right font-black text-lg ${getGradeColor(grade)}`}
                  >
                    {grade}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="mt-6 p-4 bg-blue-50 flex items-center justify-between rounded-lg">
        <div className="text-blue-800">
          <p className="text-sm font-bold uppercase">Result Summary</p>
          <p className="text-xs text-blue-500">
            Passed in {validResult.length} Subjects
          </p>
        </div>

        <div className="bg-blue-700 px-6 py-2 rounded-md flex items-center gap-4 shadow-md">
          <span className="text-white font-bold text-sm uppercase">GPA</span>
          <span className="text-xl md:text-2xl font-black text-white">{gpa}</span>
        </div>
      </div>
    </div>
  );
};

export default SeeResultTable;
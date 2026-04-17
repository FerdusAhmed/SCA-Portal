import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Class6 from './Class6';
import Class7 from './Class7';
import Class8 from './Class8';
import Class910 from './Class910';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router';

const CreateResultSheet = () => {
  const { register, handleSubmit, reset } = useForm();
  const class_name = useWatch('class_name');
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const { id } = useParams();

  //  URL params 
  const [searchParams] = useSearchParams();
  const selectedClass = searchParams.get('class') || '';
  const selectedExam = searchParams.get('exam') || '';
  const currentPage = searchParams.get('page') || 1;

  const { data } = useQuery({
    queryKey: ['findStudent', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/students/student/${id}`);
      return res.data;
    },
  });

  const handleSubmitResult = resultData => {
    if (!resultData?.studentRoll) {
      toast.info('Add Student Roll');
      return;
    }

    const ignoreFields = [
      'class_name',
      'examOption',
      'studentEmail',
      'studentName',
      'studentRoll',
      'student_id',
    ];

    const subjects = Object.entries(resultData)
      .filter(([key]) => !ignoreFields.includes(key))
      .map(([subject, mark]) => ({
        name: subject,
        mark: Number(mark),
      }));

    const newResultSheet = {
      class_name: resultData.class_name,
      examOption: resultData.examOption,
      studentEmail: resultData.studentEmail,
      studentName: resultData.studentName,
      studentRoll: resultData.studentRoll,
      student_id: resultData.student_id,
      resultPublish: false,
      subjects,
    };

    axiosSecure.post('/result', newResultSheet)
      .then(res => {
        if (res?.data?.message) {
          toast.error(`${res?.data?.message}`);
        } else {
          toast.success('Result submitted successfully!');
        }

        reset({
          studentEmail: '',
          studentName: '',
          class_name: '',
          studentRoll: '',
          examOption: '',
          student_id: '',
        });

        
        navigate(
          `/dashboard/student-give-result?class=${selectedClass}&exam=${selectedExam}&page=${currentPage}`,
        );
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to submit result.');
      });
  };

  useEffect(() => {
    if (data && id) {
      reset({
        studentEmail: data?.email,
        studentName: data?.name,
        class_name: data?.class_name,
        studentRoll: data?.roll,
        student_id: data?.student_id,
      });
    }
  }, [data, id, reset]);

  return (
    <div className="min-h-screen   mx-auto">
      <form
        onSubmit={handleSubmit(handleSubmitResult)}
        className="bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-500/30 shadow-2xl shadow-blue-500/20 md:max-w-200 rounded-2xl mx-auto p-6 w-full text-slate-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-400 tracking-wide uppercase">
          Create Student Result
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Student Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold ml-1 text-blue-300">
              Student Email
            </label>
            <input
              readOnly
              type="email"
              {...register('studentEmail', { required: true })}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
              placeholder="email@student.com"
            />
          </div>

          {/* Student Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold ml-1 text-blue-300">
              Student Name
            </label>
            <input
              readOnly
              type="text"
              {...register('studentName', { required: true })}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
              placeholder="e.g. John Doe"
            />
          </div>

          {/* Class Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold ml-1 text-blue-300">
              Class Name
            </label>
            <select
              readOnly
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              {...register('class_name', { required: true })}
            >
              <option value="" className="bg-slate-900">
                Select Class
              </option>
              <option value="6" className="bg-slate-900">
                Class 6
              </option>
              <option value="7" className="bg-slate-900">
                Class 7
              </option>
              <option value="8" className="bg-slate-900">
                Class 8
              </option>
              <option value="9" className="bg-slate-900">
                Class 9
              </option>
              <option value="10" className="bg-slate-900">
                Class 10
              </option>
            </select>
          </div>

          {/* Class Roll */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold ml-1 text-blue-300">
              Class Roll
            </label>
            <input
              readOnly
              type="number"
              {...register('studentRoll', { required: true })}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
              placeholder="01"
            />
          </div>

          {/* studentId */}
          <div className="flex  flex-col gap-1 ">
            <label className="text-sm font-semibold ml-1 text-blue-300">
              StudentId
            </label>
            <input
              type="text"
              readOnly
              {...register('student_id', { required: true })}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
              placeholder="studentId 01..."
            />
          </div>

          {/* Exam Selection */}
          <div className="flex flex-col gap-1 ">
            <label className="text-sm font-semibold ml-1 text-blue-300">
              Select Exam Type
            </label>
            <select
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              {...register('examOption', { required: true })}
            >
              <option value="" className="bg-slate-900">
                Select Exam Option
              </option>
              <option value="test-1" className="bg-slate-900">
                Test 1
              </option>
              <option value="test-2" className="bg-slate-900">
                Test 2
              </option>
              <option value="final" className="bg-slate-900">
                Final Exam
              </option>
            </select>
          </div>
        </div>

        {/* Dynamic Subject Section */}
        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/10 rounded-xl min-h-25">
          <h3 className="text-lg font-medium mb-4 text-blue-200 border-b border-blue-500/20 pb-2">
            Subject Marks
          </h3>
          {class_name === '6' && <Class6 register={register} />}
          {class_name === '7' && <Class7 register={register} />}
          {class_name === '8' && <Class8 register={register} />}
          {(class_name === '9' || class_name === '10') && (
            <Class910 register={register} />
          )}
          {!class_name && (
            <p className="text-slate-500 text-center italic mt-4">
              Please select a class to enter marks
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-600/30 transform transition-all active:scale-95 uppercase tracking-wider cursor-pointer"
        >
          Submit Result Sheet
        </button>
      </form>
    </div>
  );
};

export default CreateResultSheet;
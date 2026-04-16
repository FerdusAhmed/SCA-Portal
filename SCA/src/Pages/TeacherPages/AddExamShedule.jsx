import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Plus,
  Trash2,
  Calendar as CalendarIcon,
  BookOpen,
  Save,
} from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css"; // ২য় ধাপে এই ফাইলটি তৈরি করুন

const AddExamSchedule = ({ refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      class_name: "",
      exam: "Third Semester",
      startDate: new Date(),
      endDate: new Date(),
      subjects: [
        { subjectName: "", examDate: new Date(), startTime: "", endTime: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  const onSubmit = async (data) => {
    // Date অবজেক্টকে String-এ রূপান্তর করা হচ্ছে ডাটাবেজে পাঠানোর আগে
    const scheduleData = {
      ...data,
      startDate: data.startDate.toLocaleDateString("en-CA"), // YYYY-MM-DD
      endDate: data.endDate.toLocaleDateString("en-CA"),
      subjects: data.subjects.map((s) => ({
        ...s,
        examDate: s.examDate.toLocaleDateString("en-CA"),
      })),
      email: user?.email,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/exam-routine", scheduleData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Exam schedule has been published.",
          icon: "success",
          background: "#1E293B",
          color: "#fff",
          confirmButtonColor: "#3B82F6",
        });
        reset();
        if (refetch) refetch();
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Failed to save schedule.",
        icon: "error",
        background: "#1E293B",
        color: "#fff",
      });
      console.log(err)
    }
  };

  const classOptions = [6, 7, 8, 9, 10];

  return (
    <div className=" md:p-10 flex justify-center">
      <div className="w-full md:bg-[#1E293B] md:border md:border-slate-800 md:p-8 rounded-xl md:rounded-[2.5rem] shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600/20 rounded-2xl">
            <CalendarIcon className="text-blue-500" size={28} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Create Exam Routine
            </h2>
            <p className="text-slate-400 text-sm">
              Set schedules with custom date picker
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/50 p-4 rounded-3xl border border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                Select Class
              </label>
              <select
                {...register("class_name", { required: true })}
                className="w-full bg-slate-900 border border-slate-700 rounded-sm p-3 text-slate-200 outline-none focus:border-blue-500"
              >
                <option value="">-- Class --</option>
                {classOptions.map((c) => (
                  <option key={c} value={c}>
                    Class {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                Start Date
              </label>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 outline-none focus:border-blue-500"
                  />
                )}
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                End Date
              </label>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 outline-none focus:border-blue-500"
                  />
                )}
              />
            </div>
          </div>

          {/* Subjects */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 px-2">
              <BookOpen size={18} className="text-emerald-500" /> Subjects List
            </h3>
            <div className="space-y-3">
              {fields.map((sub, idx) => (
                <div
                  key={sub.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-3 bg-slate-900/30 p-4 rounded-2xl border border-slate-800 items-end"
                >
                  <div className="lg:col-span-4">
                    <input
                      type="text"
                      placeholder="Subject Name"
                      {...register(`subjects.${idx}.subjectName`, {
                        required: true,
                      })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="lg:col-span-3">
                    <Controller
                      control={control}
                      name={`subjects.${idx}.examDate`}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-emerald-500"
                        />
                      )}
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <input
                      type="time"
                      {...register(`subjects.${idx}.startTime`, {
                        required: true,
                      })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <input
                      type="time"
                      {...register(`subjects.${idx}.endTime`, {
                        required: true,
                      })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="lg:col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                append({
                  subjectName: "",
                  examDate: new Date(),
                  startTime: "",
                  endTime: "",
                })
              }
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/5 rounded-xl text-xs font-bold uppercase tracking-widest"
            >
              <Plus size={16} /> Add More Subject
            </button>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 uppercase tracking-widest text-sm"
          >
            <Save size={20} /> Save Exam Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExamSchedule;

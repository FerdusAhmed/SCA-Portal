import React from 'react';

const Class910 = ({register}) => {
  return (
    <div className=" fieldset">
      <h4 className=" my-3 text-xl font-bold ">Subjects</h4>

      <label className=" label">Bangla</label>
      <input
        type="number"
        {...register('bangla', { require: true })}
        className="input text-blue-600 w-full"
        placeholder="give number"
      />
      <label className=" label">English</label>
      <input
        type="number"
        {...register('english', { require: true })}
        className="input text-blue-600 w-full"
        placeholder="give number"
      />
      <label className=" label">Mathematics</label>
      <input
        type="number"
        {...register('mathematics', { require: true })}
        className="input text-blue-600 w-full"
        placeholder="give number"
      />
    </div>
  );
};

export default Class910;
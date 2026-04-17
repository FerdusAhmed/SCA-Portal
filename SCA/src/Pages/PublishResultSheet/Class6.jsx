import React from 'react';

const Class6 = ({register}) => {
  return (
    <div className=" fieldset">
      <h4 className=" my-3 text-xl font-bold ">Subjects</h4>

      <label className=" label">Bangla</label>
      <input
        {...register('bangla', { require: true })}
        type="number"
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
      <label className=" label">ICT</label>
      <input
        type="number"
        {...register('ict', { require: true })}
        className="input text-blue-600 w-full"
        placeholder="give number"
      />
    </div>
  );
};

export default Class6;
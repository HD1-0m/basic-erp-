const Pagination = () => {
  return (
    <div className="p-4 flex items-center justify-between text-gray-700">
      <button
        disabled
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold">
        Next
      </button>
    </div>
  );
};

export default Pagination;

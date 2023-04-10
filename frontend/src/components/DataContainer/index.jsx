const DataContainer = ({ data, label, onClick }) => {
  return (
    <div className="data-container flex flex-col gap-y-1">
      <span className="text-gray-400 text-[.8rem]">{label}</span>
      <span
        onClick={onClick}
        className="block text-gray-700 text-3/4xl border border-gray-300 p-2"
      >
        {data}
      </span>
    </div>
  );
};

export default DataContainer;

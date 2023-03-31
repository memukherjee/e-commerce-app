export default function DetailsCard({ person }) {
  return (
    <div className="customer-container flex flex-wrap justify-between items-center px-6 pb-6 gap-2">
      <div className="customer-name w-3/4">
        <h1 className="text-2xl font-bold text-cyan-900">{person?.name}</h1>
      </div>
      <div className="customer-avatar w-20 h-20 rounded-full overflow-hidden">
        <img
          src={person?.avatar}
          alt="avatar"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="customer-details w-full flex flex-col gap-2 justify-start items-start border-t-2 pt-6">
        <div className="customer-id flex justify-start items-center gap-2">
          <span className="text-cyan-900 font-medium">ID</span>
          <span>{person?.id}</span>
        </div>
        <div className="customer-email flex justify-start items-center gap-2">
          <span className="text-cyan-900 font-medium">
            <i className="fa-regular fa-envelope"></i>
          </span>
          <span>{person?.email}</span>
        </div>
        <div className="customer-phone flex justify-start items-center gap-2">
          <span className="text-cyan-900 font-medium">
            <i className="fa-solid fa-phone"></i>
          </span>
          <span>{person?.mobile}</span>
        </div>
        {person?.address && (
          <div className="customer-address flex justify-start items-center gap-2">
            <span className="text-cyan-900 font-medium">
              <i className="fa-solid fa-location-dot"></i>
            </span>
            <span>{person?.address}</span>
          </div>
        )}
      </div>
    </div>
  );
}

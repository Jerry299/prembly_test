const UserCard = ({ user }: { user: any }) => {
  if (!user) {
    return (
      <div className="text-center p-4 text-gray-500">
        No user data available
      </div>
    );
  }

  const { name, location, phone, dob, picture, nat } = user;
  const fullName = `${name?.title || ""} ${name?.first || ""} ${
    name?.last || ""
  }`.trim();
  const address = `${location?.street?.number || ""} ${
    location?.street?.name || ""
  }, ${location?.city || ""}, ${location?.state || ""} ${
    location?.postcode || ""
  }, ${location?.country || ""}`.trim();
  const birthDate = new Date(dob?.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const nationality = nat?.toUpperCase() || "N/A";

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={picture?.large || "/placeholder-avatar.jpg"}
        alt={fullName}
      />
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{fullName}</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">Address:</span> {address || "N/A"}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {phone || "N/A"}
          </p>
          <p>
            <span className="font-medium">Date of Birth:</span> {birthDate}
          </p>
          <p>
            <span className="font-medium">Nationality:</span> {nationality}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

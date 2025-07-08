const UserCard = ({ user }) => {
  console.log(user);
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
  return (
    <div>
      <div className="card bg-base-300 w-96 h-[80vh] shadow-sm overflow-hidden">
        <figure>
          <img
            className="w-full h-[50vh] mt-1 object-cover"
            src={
              photoUrl ||
              "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
            }
            alt={`${firstName} ${lastName}'s Profile picture`}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}, ${
            age ? ` ${age} ` : ""
          }`}</h2>
          <p>{about}</p>
          {skills?.length > 0 && (
            <p className="font-semibold">
              Skills: &nbsp;
              <span className="font-light">{skills.join(", ")}</span>
            </p>
          )}
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

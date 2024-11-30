import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const [getUserIndividual, setGetUserIndividual] = useState([]);

  const { id } = useParams("");
  console.log(id);

  const navigate = useNavigate();

  const getUser = async () => {
    const res = await fetch(
      `https://api-crud-6w08.onrender.com/getuser/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setGetUserIndividual(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUser = async (id) => {
    const res2 = await fetch(
      `https://api-crud-6w08.onrender.com/deleteuser/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user delete");
      navigate("/");
    }
  };

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome {getUserIndividual.name}</h1>

      <div className="card" style={{ maxWidth: 700 }}>
        <div className="card-body">
          <div className="add_btn">
            <Link to={`/edit/${getUserIndividual._id}`}>
              <button className="btn btn-primary mx-3">
                <i className="bi bi-pencil"></i>
              </button>
            </Link>
            <button
              onClick={() => deleteUser(getUserIndividual._id)}
              className="btn btn-danger"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img
                src="/avatar2.png"
                style={{ width: 50, borderRadius: "50%" }}
                alt="profile"
              />
              <h3 className="mt-3">
                Name: <span>{getUserIndividual.name}</span>
              </h3>
              <h3 className="mt-3">
                Age: <span>{getUserIndividual.age}</span>
              </h3>
              <p className="mt-3">
                <i className="bi bi-envelope"></i>Email:{" "}
                <span>{getUserIndividual.email}</span>
              </p>
              <p className="mt-3">
                <i className="bi bi-briefcase-fill"></i>Ocuppation:{" "}
                <span>{getUserIndividual.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <i className="bi bi-phone-fill"></i>Mobile:{" "}
                <span>{getUserIndividual.mobile}</span>
              </p>
              <p className="mt-3">
                <i className="bi bi-geo-alt-fill"></i>Location:{" "}
                <span>{getUserIndividual.address}</span>
              </p>
              <p className="mt-3">
                Description: <span>{getUserIndividual.description}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

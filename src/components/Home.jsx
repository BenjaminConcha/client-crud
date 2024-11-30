import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { addData, deleteData, updateData } from "../context/ContextProvider";

const Home = () => {
  const [getUserData, setGetUserData] = useState([]);
  const { userData, setUserData } = useContext(addData);
  const { upData, setUpData } = useContext(updateData);
  const { delData, setDelData } = useContext(deleteData);

  const getData = async () => {
    const res = await fetch("http://localhost:8003/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setGetUserData(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = async (id) => {
    const res2 = await fetch(`http://localhost:8003/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedata = await res2.json();
    console.log(deletedata);
    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user delete");
      setDelData(deletedata);
      getData();
    }
  };

  const closeNotification = (type) => {
    if (type === "add") {
      setUserData(null);
    } else if (type === "update") {
      setUpData(null);
    } else if (type === "delete") {
      setDelData(null);
    }
  };

  return (
    <>
      {userData && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>{userData.name}</strong> added successfully!
          <button
            type="button"
            className="btn-close"
            onClick={() => closeNotification("add")}
            aria-label="Close"
          ></button>
        </div>
      )}
      {upData && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>{upData.name}</strong> updated successfully!
          <button
            type="button"
            className="btn-close"
            onClick={() => closeNotification("update")}
            aria-label="Close"
          ></button>
        </div>
      )}
      {delData && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>{delData.name}</strong> deleted successfully!
          <button
            type="button"
            className="btn-close"
            onClick={() => closeNotification("delete")}
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <Link to="/register" className="btn btn-primary">
              Add data
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getUserData.map((element, id) => (
                <tr key={element._id} className="align-baseline">
                  <th scope="row">{id + 1} </th>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.work}</td>
                  <td>{element.mobile}</td>
                  <td className="d-flex justify-content-around">
                    <Link to={`details/${element._id}`}>
                      <button className="btn btn-success">
                        <i className="bi bi-eye"></i>
                      </button>
                    </Link>
                    <Link to={`edit/${element._id}`}>
                      <button className="btn btn-primary">
                        <i className="bi bi-pencil"></i>
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteUser(element._id)}
                      className="btn btn-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;

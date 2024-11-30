import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { updateData } from "../context/ContextProvider";

const Edit = () => {
  // const [getUserIndividual, setGetUserIndividual] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const { upData, setUpData } = useContext(updateData);

  const navigate = useNavigate("");

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    description: "",
  });

  const setData = (e) => {
    const { name, value } = e.target;
    setInputValue((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getUser = async () => {
    const res = await fetch(`http://localhost:8003/getuser/${id}`, {
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
      setInputValue(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();

    const { name, email, age, mobile, work, address, description } = inputValue;

    const res2 = await fetch(`http://localhost:8003/updateuser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        age,
        mobile,
        work,
        address,
        description,
      }),
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 442 || !data2) {
      alert("fill the data");
    } else {
      alert("data added");
      navigate("/");
      setUpData(data2);
    }
  };

  return (
    <div className="container">
      <Link to="/">Home</Link>
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputUsername" className="form-label">
              Username
            </label>
            <input
              type="text"
              onChange={setData}
              name="name"
              value={inputValue.name}
              className="form-control"
              id="exampleInputUsername"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              onChange={setData}
              name="email"
              value={inputValue.email}
              className="form-control"
              id="exampleInputEmail"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Age
            </label>
            <input
              type="text"
              onChange={setData}
              name="age"
              value={inputValue.age}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              onChange={setData}
              name="mobile"
              value={inputValue.mobile}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Work
            </label>
            <input
              type="text"
              onChange={setData}
              name="work"
              value={inputValue.work}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              onChange={setData}
              name="address"
              value={inputValue.address}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              onChange={setData}
              value={inputValue.description}
              className="form-control"
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={updateUser}
            className="btn btn-primary"
          >
            Submit
          </button>{" "}
        </div>
      </form>
    </div>
  );
};

export default Edit;

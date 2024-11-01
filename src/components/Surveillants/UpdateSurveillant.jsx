import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateSurveillant = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveillant = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7125/api/SportCategorys/${id}`
        );
        // setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        // setTitle(response.data.title);
      } catch (error) {
        console.error("Error fetching surveillant:", error);
        Swal.fire({
          title: "Erreur lors de la récupération du surveillant",
          text: error.message,
          icon: "error",
        });
      }
    };
    fetchSurveillant();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!lastName ) {
      Swal.fire({
        title: "Assurez-vous de remplir tout!",
        icon: "error",
      });
      return;
    }

    const formData = {
      id: id,
      mydate: "",
      name: lastName,
      image: "",
      description:"",
      dateCreation:"",
      dateModification:""
    };

    try {
      const response = await axios.put(
        `https://localhost:7125/api/SportCategorys/update`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Surveillant mis à jour avec succès!",
          icon: "success",
        });
        navigate("/Surveillants");
      } else {
        Swal.fire({
          title: "Erreur lors de la mise à jour du surveillant!",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Erreur réseau!",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="m-0 mt-6 gap-9 sm:grid-cols-2 m-16">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Modifier Surveillant
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Prénom <span className="text-meta-1">*</span>
                  </label>
                  {/* <input
                    type="text"
                    value={firstName}
                    placeholder="Entrez votre prénom"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  /> */}
                  <label className="mt-8 mb-2.5 block text-black dark:text-white">
                    Nom de famille <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    placeholder="Entrez votre nom de famille"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 mb-4.5">
                <div className="w-full sm:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Titre <span className="text-meta-1">*</span>
                  </label>
                  {/* <input
                    type="text"
                    value={title}
                    placeholder="Entrez votre titre"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  /> */}
                </div>
              </div>
              <div className="flex justify-end gap-4.5">
                <Link
                  to="/Surveillants"
                  className="flex justify-center rounded bg-meta-1 py-2 px-6 font-medium text-white hover:bg-opacity-90"
                >
                  Annuler
                </Link>
                <button
                  type="submit"
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                >
                  Mettre à jour
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSurveillant;

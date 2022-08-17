import Head from "next/head";
import CV from "../components/CV";
import Settings from "../components/Settings";
import { useState, useEffect } from "react";
import { CvContext } from "../hooks/CvContext";
import { cvData } from "../data/cvData";

export default function Home() {
  const [cv, setCv] = useState(cvData);

  const updateCv = (key, value) => {
    const newCv = { ...cv, [key]: value };
    setCv(newCv);
    localStorage.setItem("cv", JSON.stringify(newCv));
  };

  const toogleCheckbox = (key, value) => {
    const newCv = { ...cv, [key]: value };
    setCv(newCv);
    localStorage.setItem("cv", JSON.stringify(newCv));
  };

  const addProject = (project) => {
    const newCv = { ...cv, projects: [...cv.projects, project] };
    setCv(newCv);
    localStorage.setItem("cv", JSON.stringify(newCv));
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      updateCv("image", e.target.result);
    };
    reader.readAsDataURL(file);
    console.log(file);
  };

  useEffect(() => {
    const cvLocal = JSON.parse(localStorage.getItem("cv"));
    if (cvLocal) {
      setCv((currentCv) => ({ ...currentCv, ...cvLocal }));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CvContext.Provider
        value={{ cv, uploadImage, updateCv, toogleCheckbox, addProject }}
      >
        <main className="flex relative bg-[#444444] h-screen">
          <section className="bg-[#E7E7E7] outline-1 overflow-auto outline-gray-300 outline rounded-3xl m-10  w-[400px]">
            <Settings />
          </section>
          <div className="m-auto">
            {/* <h1 className="text-[#444444] mx-auto text-center text-xl">Hello</h1> */}
            <section className="bg-white rounded-md scale-100 transition-all hover:scale-110 hover:shadow-xl shadow-sm p-8 resize w-[595px] h-[842px]">
              <CV className="" />
            </section>
          </div>
        </main>
      </CvContext.Provider>
    </>
  );
}

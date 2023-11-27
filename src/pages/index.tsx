import { SiluetaHumano } from "@/components/SiluetaHumano";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { DarkModeContextProvider } from "@/lib/darkModeContext";
import { Settings } from "@/components/Settings";

export default function Home() {
  const [selectedData, setSelectedData] = useState({
    muscle: "",
    equipment: "",
  });
  const [equipments, setEquipments] = useState([
    {
      nombre: "",
      url_foto: "",
    },
  ]);
  const [step, setStep] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipamientosData = await fetch(
          "http://localhost:3000/api/equipamiento",
          {
            method: "GET",
          }
        );

        if (!equipamientosData.ok) {
          throw new Error("Fetching error");
        }

        const data = await equipamientosData.json();
        setEquipments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectEquipment = async (equipment: string) => {
    setSelectedData({ ...selectedData, equipment });
    await fetch("http://localhost:3000/api/getVideo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        muscle: selectedData.muscle,
        equipment: selectedData.equipment,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          if (data && data.url_video) {
            const { url_video } = data;
            localStorage.setItem("videoURL", url_video);
            void router.push("/reproductor");
          } else {
            console.error("Video URL is missing in the response.");
          }
        } else {
          console.error("Error in fetch:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSelectMuscle = (muscle: string) => {
    setSelectedData({ ...selectedData, muscle });
    setStep(2);
  };

  return (
    <DarkModeContextProvider>
      {showSettings && <Settings />}
      <div className="flex flex-col justify-between min-h-screen items-center bg-[#D4D1D1] dark:bg-[#373737]">
        <NavBar setShowSettings={setShowSettings} setStep={setStep}/>
        <div className={styles.container + " dark:bg-[#595555] bg-[#BAB3B3]"}>
          <div className={styles.corner + " " + styles["top-left"]}></div>
          <div className={styles.corner + " " + styles["top-right"]}></div>
          <div className={styles.corner + " " + styles["bottom-left"]}></div>
          <div className={styles.corner + " " + styles["bottom-right"]}></div>
          {step === 1 && (
            <>
              <h1 className="font-bold text-2xl mb-6 dark:text-white">
                Que grupo muscular te gustaria entrenar hoy?
              </h1>
              <SiluetaHumano handleSelectMuscle={handleSelectMuscle} />
            </>
          )}
          {step === 2 && (
            <>
              <h1 className="font-bold text-2xl mb-6 dark:text-white">
                Con que equipamiento contas hoy?
              </h1>
              <div className="grid grid-cols-2 gap-4 w-full">
                {" "}
                {/* Adjust the number of columns as needed */}
                {equipments.map((equipment, index) => (
                  <button
                    onClick={() => handleSelectEquipment(equipment.nombre)}
                    key={index}
                    className="flex-1"
                  >
                    <div key={index} className="rounded-sm relative">
                      <h2 className="font-semibold text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#595555] px-6 py-2 rounded-full">
                        {equipment.nombre}
                      </h2>
                      {equipment.url_foto ? (
                        <Image
                          src={equipment.url_foto}
                          alt={equipment.nombre}
                          width={200}
                          height={200}
                          className="mt-2 object-fill rounded-lg w-full h-72"
                        />
                      ) : (
                        <p>No photo available</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </DarkModeContextProvider>
  );
}

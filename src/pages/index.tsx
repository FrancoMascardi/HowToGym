import { SiluetaHumano } from '@/components/SiluetaHumano'
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import styles from "../styles/Home.module.css";
import Image from 'next/image';
import { useRouter } from "next/router";

export default function Home() {
  const [selectedData, setSelectedData] = useState({
    muscle: "",
    equipment: "",
  });
  const [equipments, setEquipments] = useState([{
    nombre: "",
    url_foto: ""
  }]);
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipamientosData = await fetch("http://localhost:3000/api/equipamiento", {
          method: "GET"
        })

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
      body: JSON.stringify({ muscle: selectedData.muscle, equipment: selectedData.equipment }),
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

  }

  const handleSelectMuscle = (muscle: string) => {
    setSelectedData({ ...selectedData, muscle });
    setStep(2);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar />
      <div className={styles.container}>
        {step === 1 && (
          <>
            <h1 className="font-bold text-2xl mb-6">Elige un musculo</h1>
            <SiluetaHumano handleSelectMuscle={handleSelectMuscle} />
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="font-bold text-2xl mb-6">Elige tu equipamiento</h1>
            <div className="grid grid-cols-2 gap-4"> {/* Adjust the number of columns as needed */}
              {equipments.map((equipment, index) => (
                <button onClick={() => handleSelectEquipment(equipment.nombre)}>
                  <div key={index} className="p-4 border border-gray-300 rounded-md">
                    <h2 className="font-semibold text-lg">{equipment.nombre}</h2>
                    {equipment.url_foto ? (
                      <Image
                        src={equipment.url_foto}
                        alt={equipment.nombre}
                        width={200} // Set the desired width
                        height={200} // Set the desired height
                        className="mt-2"
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
  )
}

import { motion } from "framer-motion";

const clients = [
  { name: "IndiQube Limited", logo: "/assets/indie.jpeg" },
  { name: "Sree Gupta Bhavan", logo: "/assets/srb.png" },
  { name: "Esskay Design Structures Private", logo: "/assets/Esskey.jpeg" },
  { name: "BELRISE INDUSTRIES LTD", logo: "/assets/Belrise.jpeg" },
  { name: "Southern Chemical India Private Limited", logo: "/assets/southern chemical.jpeg" },
  { name: "LKS Old House", logo: "/assets/Lks.png" },
  { name: "DART GLOBAL LOGISTICS PVT LTD", logo: "/assets/dart.jpeg" },
  { name: "Deepam Eye Hospital", logo: "/assets/Deepam.png" },
  { name: "FATHIMA JEWELLERS", logo: "/assets/fathima.jpeg" },
  { name: "Qspiders", logo: "/assets/qspiders.png" },
];

export default function ClientsPage() {
  return (
    <section className="bg-gradient-to-br from-yellow-50 via-white to-sky-50 py-12 px-6">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h4 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-8 drop-shadow">
          Companies We’ve Worked With
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center w-36 h-36 md:w-40 md:h-40 bg-white p-4 rounded-2xl shadow hover:shadow-2xl transition group"
              whileHover={{ scale: 1.07 }}
            >
              <div className="flex-grow flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-14 md:max-h-16 max-w-[100px] md:max-w-[120px] object-contain grayscale group-hover:grayscale-0 transition"
                />
              </div>
              <p className="mt-2 text-xs md:text-sm text-center text-gray-700 font-medium">
                {client.name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

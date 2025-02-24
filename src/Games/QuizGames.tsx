import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Question = {
  question: string;
  options: string[];
  correct: string;
  category: "hardware" | "shortcut";
};

const questions: Question[] = [
    {
      "question": "What does GPU stand for?",
      "options": [
        "Graphical Processing Unit",
        "Graphics Processing Unit",
        "General Processing Unit",
        "Global Processing Unit"
      ],
      "correct": "Graphics Processing Unit",
      "category": "hardware"
    },
    {
      "question": "BIOS stands for:",
      "options": [
        "Basic Input/Output System",
        "Binary Integrated Operating System",
        "Base Input/Output Service",
        "Basic Integrated Operating System"
      ],
      "correct": "Basic Input/Output System",
      "category": "hardware"
    },
    {
      "question": "RAID stands for:",
      "options": [
        "Redundant Array of Independent Disks",
        "Rapid Access to Integrated Data",
        "Redundant Allocation of Independent Drives",
        "Random Array of Inexpensive Disks"
      ],
      "correct": "Redundant Array of Independent Disks",
      "category": "hardware"
    },
    {
      "question": "What does SSD stand for?",
      "options": [
        "Solid State Drive",
        "Serial Storage Device",
        "Static State Drive",
        "Synchronized Storage Disk"
      ],
      "correct": "Solid State Drive",
      "category": "hardware"
    },
    {
      "question": "LAN stands for:",
      "options": [
        "Local Area Network",
        "Large Area Network",
        "Logical Access Node",
        "Linked Access Network"
      ],
      "correct": "Local Area Network",
      "category": "hardware"
    },
    {
      "question": "USB stands for:",
      "options": [
        "Universal Serial Bus",
        "Unified Serial Bus",
        "Universal System Bus",
        "United Serial Board"
      ],
      "correct": "Universal Serial Bus",
      "category": "hardware"
    },
    {
      "question": "HDMI stands for:",
      "options": [
        "High-Definition Multimedia Interface",
        "High-Density Media Interface",
        "Hyper-Data Media Interface",
        "Hybrid Digital Media Input"
      ],
      "correct": "High-Definition Multimedia Interface",
      "category": "hardware"
    },
    {
      "question": "PSU stands for:",
      "options": [
        "Power Supply Unit",
        "Primary System Unit",
        "Power Synchronization Unit",
        "Peripheral Supply Unit"
      ],
      "correct": "Power Supply Unit",
      "category": "hardware"
    },
    {
      "question": "CPU stands for:",
      "options": [
        "Central Processing Unit",
        "Core Processing Unit",
        "Computer Processing Unit",
        "Central Peripheral Unit"
      ],
      "correct": "Central Processing Unit",
      "category": "hardware"
    },
    {
      "question": "What does ROM stand for?",
      "options": [
        "Read-Only Memory",
        "Random Operation Memory",
        "Read-Only Module",
        "Random Access Memory"
      ],
      "correct": "Read-Only Memory",
      "category": "hardware"
    },
    {
      "question": "CMOS stands for:",
      "options": [
        "Complementary Metal-Oxide-Semiconductor",
        "Central Metal-Oxide System",
        "Computer Memory Operating System",
        "Complementary Memory Oxide Semiconductor"
      ],
      "correct": "Complementary Metal-Oxide-Semiconductor",
      "category": "hardware"
    },
    {
      "question": "POST stands for:",
      "options": [
        "Power-On Self-Test",
        "Pre-Operating System Test",
        "Primary Online System Test",
        "Peripheral Operational Startup Test"
      ],
      "correct": "Power-On Self-Test",
      "category": "hardware"
    },
    {
      "question": "SATA stands for:",
      "options": [
        "Serial Advanced Technology Attachment",
        "Synchronized Advanced Technology Attachment",
        "System ATA",
        "Sequential Access Transfer Architecture"
      ],
      "correct": "Serial Advanced Technology Attachment",
      "category": "hardware"
    },
    {
      "question": "PCIe stands for:",
      "options": [
        "Peripheral Component Interconnect Express",
        "Peripheral Card Interface Express",
        "Protocol-Controlled Interconnect Extension",
        "Primary Component Interface Express"
      ],
      "correct": "Peripheral Component Interconnect Express",
      "category": "hardware"
    },
    {
      "question": "What does NIC stand for?",
      "options": [
        "Network Interface Card",
        "Network Integration Controller",
        "Network Internet Connection",
        "Network Interface Controller"
      ],
      "correct": "Network Interface Card",
      "category": "hardware"
    },
    {
      "question": "DVI stands for:",
      "options": [
        "Digital Visual Interface",
        "Digital Video Interface",
        "Display Video Input",
        "Dynamic Visual Interface"
      ],
      "correct": "Digital Visual Interface",
      "category": "hardware"
    },
    {
      "question": "VGA stands for:",
      "options": [
        "Video Graphics Array",
        "Video Graphics Adapter",
        "Visual Graphics Array",
        "Volatile Graphics Adapter"
      ],
      "correct": "Video Graphics Array",
      "category": "hardware"
    },
    {
      "question": "What does CRT stand for?",
      "options": [
        "Cathode Ray Tube",
        "Cathode Radiation Tube",
        "Compact Ray Tube",
        "Cathode-Raster Tube"
      ],
      "correct": "Cathode Ray Tube",
      "category": "hardware"
    },
    {
      "question": "LCD stands for:",
      "options": [
        "Liquid Crystal Display",
        "Liquid Color Display",
        "Light Crystal Display",
        "Liquid Compact Display"
      ],
      "correct": "Liquid Crystal Display",
      "category": "hardware"
    },
    {
      "question": "OLED stands for:",
      "options": [
        "Organic Light-Emitting Diode",
        "Organic Liquid Emitting Display",
        "Optical Light Emitting Diode",
        "Organic LED"
      ],
      "correct": "Organic Light-Emitting Diode",
      "category": "hardware"
    },
    {
      "question": "SoC stands for:",
      "options": [
        "System on a Chip",
        "Silicon on Chip",
        "System Operating Chip",
        "Synchronized on Chip"
      ],
      "correct": "System on a Chip",
      "category": "hardware"
    },
    {
      "question": "FPGA stands for:",
      "options": [
        "Field-Programmable Gate Array",
        "Flexible Programmable Gate Architecture",
        "Field-Programmable Graphics Array",
        "Fast-Processing Gate Array"
      ],
      "correct": "Field-Programmable Gate Array",
      "category": "hardware"
    },
    {
      "question": "ASIC stands for:",
      "options": [
        "Application-Specific Integrated Circuit",
        "Application-Specific Interface Controller",
        "Advanced System Integrated Chip",
        "Automated System Integrated Circuit"
      ],
      "correct": "Application-Specific Integrated Circuit",
      "category": "hardware"
    },
    {
      "question": "NVMe stands for:",
      "options": [
        "Non-Volatile Memory Express",
        "Non-Volatile Module Extension",
        "Network Volume Management Engine",
        "Non-Virtualized Memory Enhancement"
      ],
      "correct": "Non-Volatile Memory Express",
      "category": "hardware"
    },
    {
      "question": "UPS stands for:",
      "options": [
        "Uninterruptible Power Supply",
        "Universal Power Supply",
        "Unified Power System",
        "Uninterrupted Power Source"
      ],
      "correct": "Uninterruptible Power Supply",
      "category": "hardware"
    },
    {
      "question": "SCSI stands for:",
      "options": [
        "Small Computer System Interface",
        "System Computer Serial Interface",
        "Small Component System Interface",
        "Serial Computer System Interconnect"
      ],
      "correct": "Small Computer System Interface",
      "category": "hardware"
    },
    {
      "question": "IDE stands for:",
      "options": [
        "Integrated Drive Electronics",
        "Integrated Development Environment",
        "Interface Drive Electronics",
        "Internal Drive Enclosure"
      ],
      "correct": "Integrated Drive Electronics",
      "category": "hardware"
    },
    {
      "question": "EIDE stands for:",
      "options": [
        "Enhanced Integrated Drive Electronics",
        "Extended IDE",
        "Enhanced Interface Drive Electronics",
        "External IDE"
      ],
      "correct": "Enhanced Integrated Drive Electronics",
      "category": "hardware"
    },
    {
      "question": "APU stands for:",
      "options": [
        "Accelerated Processing Unit",
        "Advanced Processing Unit",
        "Audio Processing Unit",
        "Auxiliary Power Unit"
      ],
      "correct": "Accelerated Processing Unit",
      "category": "hardware"
    },
    {
      "question": "ISP stands for:",
      "options": [
        "Internet Service Provider",
        "Internet System Protocol",
        "Internal Service Provider",
        "Integrated Service Package"
      ],
      "correct": "Internet Service Provider",
      "category": "hardware"
    },
    {
      "question": "LED stands for:",
      "options": [
        "Light-Emitting Diode",
        "Light Emission Device",
        "Low-Energy Display",
        "Liquid Emitting Diode"
      ],
      "correct": "Light-Emitting Diode",
      "category": "hardware"
    },
    {
      "question": "HDD stands for:",
      "options": [
        "Hard Disk Drive",
        "Hybrid Disk Drive",
        "High-Density Disk",
        "Hardware Data Drive"
      ],
      "correct": "Hard Disk Drive",
      "category": "hardware"
    },
    {
      "question": "NAS stands for:",
      "options": [
        "Network-Attached Storage",
        "Network Access Storage",
        "Networked Array System",
        "Native Attached Storage"
      ],
      "correct": "Network-Attached Storage",
      "category": "hardware"
    },
    {
      "question": "SAN stands for:",
      "options": [
        "Storage Area Network",
        "System Area Network",
        "Secure Access Network",
        "Storage Array Node"
      ],
      "correct": "Storage Area Network",
      "category": "hardware"
    },
    {
      "question": "PoE stands for:",
      "options": [
        "Power over Ethernet",
        "Power on Ethernet",
        "Protocol over Ethernet",
        "Packet over Ethernet"
      ],
      "correct": "Power over Ethernet",
      "category": "hardware"
    },
    {
      "question": "ECC RAM stands for:",
      "options": [
        "Error-Correcting Code RAM",
        "Error Checking Code RAM",
        "Enhanced Correction Code RAM",
        "Electronic Code Correction RAM"
      ],
      "correct": "Error-Correcting Code RAM",
      "category": "hardware"
    },
    {
      "question": "DIMM stands for:",
      "options": [
        "Dual In-line Memory Module",
        "Dual Integrated Memory Module",
        "Digital In-line Memory Module",
        "Dual In-line Module Memory"
      ],
      "correct": "Dual In-line Memory Module",
      "category": "hardware"
    },
    {
      "question": "SDRAM stands for:",
      "options": [
        "Synchronous Dynamic Random-Access Memory",
        "Static Dynamic RAM",
        "Synchronized Data RAM",
        "System Dynamic Random-Access Memory"
      ],
      "correct": "Synchronous Dynamic Random-Access Memory",
      "category": "hardware"
    },
    {
      "question": "DDR in DDR4 stands for:",
      "options": [
        "Double Data Rate",
        "Dual Data Rate",
        "Dynamic Data Rate",
        "Dual Channel Data Rate"
      ],
      "correct": "Double Data Rate",
      "category": "hardware"
    },
    {
      "question": "RISC stands for:",
      "options": [
        "Reduced Instruction Set Computer",
        "Reduced Instruction Set Computing",
        "Random Instruction Set Computer",
        "Rapid Instruction Set Computing"
      ],
      "correct": "Reduced Instruction Set Computer",
      "category": "hardware"
    },
    {
      "question": "CISC stands for:",
      "options": [
        "Complex Instruction Set Computer",
        "Complex Instruction Set Computing",
        "Combined Instruction Set Computer",
        "Centralized Instruction Set Computing"
      ],
      "correct": "Complex Instruction Set Computer",
      "category": "hardware"
    },
    {
      "question": "TDP stands for:",
      "options": [
        "Thermal Design Power",
        "Thermal Dissipation Performance",
        "Total Design Power",
        "Thermal Dynamic Power"
      ],
      "correct": "Thermal Design Power",
      "category": "hardware"
    },
    {
      "question": "VRM stands for:",
      "options": [
        "Voltage Regulator Module",
        "Voltage Regulation Management",
        "Variable Resistance Module",
        "Voltage Regulator Motherboard"
      ],
      "correct": "Voltage Regulator Module",
      "category": "hardware"
    },
    {
      "question": "UEFI stands for:",
      "options": [
        "Unified Extensible Firmware Interface",
        "Universal Extensible Firmware Interface",
        "Unified Embedded Firmware Interface",
        "Universal Embedded Firmware Interconnect"
      ],
      "correct": "Unified Extensible Firmware Interface",
      "category": "hardware"
    },
    {
      "question": "PATA stands for:",
      "options": [
        "Parallel ATA",
        "Peripheral ATA",
        "Primary ATA",
        "Packet ATA"
      ],
      "correct": "Parallel ATA",
      "category": "hardware"
    },
    {
      "question": "VLIW stands for:",
      "options": [
        "Very Long Instruction Word",
        "Variable Length Instruction Word",
        "Vectorized Long Instruction Width",
        "Very Large Instruction Width"
      ],
      "correct": "Very Long Instruction Word",
      "category": "hardware"
    },
    {
      "question": "What does M.2 refer to?",
      "options": [
        "A form factor for SSDs",
        "A type of RAM",
        "A cooling solution",
        "A GPU interface"
      ],
      "correct": "A form factor for SSDs",
      "category": "hardware"
    },
    {
      "question": "Thunderbolt was co-developed by Intel and:",
      "options": [
        "Apple",
        "Microsoft",
        "Sony",
        "Dell"
      ],
      "correct": "Apple",
      "category": "hardware"
    },
    {
      "question": "What does SMBus stand for?",
      "options": [
        "System Management Bus",
        "Serial Memory Bus",
        "System Motherboard Bus",
        "Synchronized Management Bus"
      ],
      "correct": "System Management Bus",
      "category": "hardware"
    },
    {
      "question": "What does SoDIMM stand for?",
      "options": [
        "Small Outline Dual In-line Memory Module",
        "Synchronized Onboard DIMM",
        "System-Optimized DIMM",
        "Serial Output DIMM"
      ],
      "correct": "Small Outline Dual In-line Memory Module",
      "category": "hardware"
    }
  ]

const QuizGame: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("bestScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const handleAnswer = (selected: string) => {
    if (questions[currentQuestion].correct === selected) {
      setScore(prev => prev + 1);
      
      if (currentQuestion === questions.length - 1) {
        if (score + 1 > bestScore) {
          setBestScore(score + 1);
          localStorage.setItem("bestScore", (score + 1).toString());
        }
        setGameOver(true);
      } else {
        setCurrentQuestion(prev => prev + 1);
      }
    } else {
      setWrongAnswer(true);
      setTimeout(() => {
        setCurrentQuestion(0);
        setScore(0);
        setWrongAnswer(false);
      }, 1500);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameOver(false);
    setWrongAnswer(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 to-purple-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Computer Quiz</h1>

      <div className="flex gap-8 mb-8">
        <div className="bg-white/10 p-4 rounded-xl text-center backdrop-blur-sm border-2 border-white/20">
          <p className="text-xl">Current Score</p>
          <p className="text-4xl font-bold">{score}</p>
        </div>
        <div className="bg-white/10 p-4 rounded-xl text-center backdrop-blur-sm border-2 border-white/20">
          <p className="text-xl">Best Score</p>
          <p className="text-4xl font-bold">{bestScore}</p>
        </div>
      </div>

      {!gameOver && !wrongAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white/10 p-8 rounded-xl backdrop-blur-sm border-2 border-white/20 mb-8"
        >
          <h2 className="text-2xl mb-6">
            {questions[currentQuestion].question}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(option)}
                className="p-4 text-left rounded-lg bg-white/5 hover:bg-white/10 transition-colors border-2 border-white/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
          
          <p className="mt-6 text-white/70">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </motion.div>
      )}

      <AnimatePresence>
        {(wrongAnswer || gameOver) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-white/10 p-8 rounded-xl backdrop-blur-sm border-2 border-white/20 text-center mb-8"
          >
            <p className="text-2xl mb-4">
              {wrongAnswer ? "❌ Wrong Answer! Restarting..." : "🎉 Quiz Completed!"}
            </p>
            {gameOver && (
              <p className="text-xl">
                Final Score: {score}/{questions.length}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-6 mt-8 w-full max-w-2xl justify-center">
        <motion.button
          onClick={restartGame}
          className="px-8 py-4 bg-white/20 rounded-xl text-xl font-semibold hover:bg-white/30 
            transition-all duration-150 flex items-center gap-2 backdrop-blur-sm border-2 border-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw size={28} />
          Restart Quiz
        </motion.button>
        
        <motion.button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-white/20 rounded-xl text-xl font-semibold hover:bg-white/30 
            transition-all duration-150 flex items-center gap-2 backdrop-blur-sm border-2 border-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home size={28} />
          Go Home
        </motion.button>
      </div>
    </div>
  );
};

export default QuizGame;
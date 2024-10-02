import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <TimerApp />
    </div>
  );
}

function TimerApp() {
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [stage, setStage] = useState("start");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (stage === "work") {
        setModalOpen(true);
        setStage("break");
      } else if (stage === "break") {
        setModalOpen(true);
        setStage("end");
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, stage]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimeLeft(20 * 60);
    setIsActive(false);
    setStage("start");
  };

  const startBreak = () => {
    setTimeLeft(20); // 20 seconds for break
    setModalOpen(false);
    setIsActive(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Card className="w-full max-w-sm p-4">
      <CardHeader>
        <h2 className="text-2xl">20-20-20 Rule Timer</h2>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-5xl mb-4">{formatTime(timeLeft)}</div>
        <Button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</Button>
        <Button className="ml-2" onClick={resetTimer}>
          Reset
        </Button>
      </CardContent>

      {/* Modal for break notification */}
      <Modal
        isOpen={modalOpen && stage === "break"}
        onOpenChange={setModalOpen}
      >
        <ModalContent>
          <ModalHeader>Time for a Break!</ModalHeader>
          <ModalBody>Look at least 20 feet away for 20 seconds.</ModalBody>
          <ModalFooter>
            <Button onClick={startBreak}>Continue</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for end of break */}
      <Modal isOpen={modalOpen && stage === "end"} onOpenChange={setModalOpen}>
        <ModalContent>
          <ModalHeader>Break Over!</ModalHeader>
          <ModalBody>You can start working now.</ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setModalOpen(false);
                setStage("start");
                resetTimer();
              }}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}

export default App;

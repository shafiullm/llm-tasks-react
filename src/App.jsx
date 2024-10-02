import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@/components/ui/modal";

function Timer({ duration, onEnd }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      onEnd();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onEnd]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center">
      <h2 className="text-4xl mb-4">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h2>
      <Button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</Button>
      <Button onClick={resetTimer} className="ml-2">
        Reset
      </Button>
    </div>
  );
}

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [stage, setStage] = useState(0); // 0: initial, 1: 20 min, 2: 20 sec, 3: done

  const handleTimerEnd = () => {
    if (stage === 1) {
      setModalOpen(true);
      setStage(2);
    } else if (stage === 2) {
      setStage(3);
    }
  };

  const handleContinue = () => {
    if (stage === 2) {
      // Here, we assume the 20 seconds timer starts automatically
    } else if (stage === 3) {
      setStage(1);
      setModalOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm mx-4 sm:mx-0">
        <CardHeader>
          <CardTitle>Eye Care Timer</CardTitle>
        </CardHeader>
        <CardContent>
          {stage === 1 && <Timer duration={1200} onEnd={handleTimerEnd} />}
          {stage === 2 && <Timer duration={20} onEnd={handleTimerEnd} />}
          {stage === 3 && (
            <p className="text-center">You can start working now.</p>
          )}
        </CardContent>
        <CardFooter>
          {stage === 0 && (
            <Button onClick={() => setStage(1)}>Start 20 Minutes</Button>
          )}
        </CardFooter>
      </Card>

      <Modal open={modalOpen} onOpenChange={setModalOpen}>
        <ModalContent>
          <ModalHeader className="text-center">
            {stage === 2 && "Look Away Alert"}
          </ModalHeader>
          <div className="p-4 text-center">
            {stage === 2 &&
              "You have to look at least 20 feet away for 20 seconds."}
          </div>
          <ModalFooter>
            <Button onClick={handleContinue}>Continue</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;

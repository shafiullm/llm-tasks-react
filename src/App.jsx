import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";

function useTimer(initialTime) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
  };

  return { timeLeft, start, pause, reset, isActive };
}

function TimerCard({
  timeLeft,
  start,
  pause,
  reset,
  isActive,
  lookAwayCount,
  cancelCount,
}) {
  return (
    <Card
      className={`w-full max-w-sm mx-auto mt-10 ${
        isActive
          ? "bg-black text-white"
          : "bg-gradient-to-r from-gray-200 to-gray-300"
      }`}
    >
      <CardHeader>
        <CardTitle>20-20-20 Rule Tracker</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-4xl mb-4">
          {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
        </div>
        <div>
          Looked Away: {lookAwayCount} | Cancelled: {cancelCount}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={isActive ? pause : start}
          className={`mr-2 ${
            isActive
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={reset} className="bg-red-500 hover:bg-red-600">
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}

function LookAwayModal({ onClose, onContinue, timeLeft, start, isActive }) {
  return (
    <Modal open={true} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Time to Look Away</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>You have to look at least 20 feet away for 20 seconds.</p>
          <div className="text-2xl text-center mt-4">
            {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onContinue}
            className="mr-2 bg-blue-500 hover:bg-blue-600"
          >
            Continue
          </Button>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function App() {
  const twentyMinutes = 20 * 60;
  const twentySeconds = 20;
  const {
    timeLeft: timer,
    start,
    pause,
    reset,
    isActive,
  } = useTimer(twentyMinutes);
  const { timeLeft: lookAwayTimer } = useTimer(twentySeconds);
  const [showModal, setShowModal] = useState(false);
  const [lookAwayCount, setLookAwayCount] = useState(0);
  const [cancelCount, setCancelCount] = useState(0);
  const [isLookAway, setIsLookAway] = useState(false);

  useEffect(() => {
    if (timer === 0 && !isLookAway) {
      setShowModal(true);
      setIsLookAway(true);
    }
  }, [timer, isLookAway]);

  const handleContinue = () => {
    setShowModal(false);
    start();
    setLookAwayCount((prev) => prev + 1);
  };

  const handleClose = () => {
    setShowModal(false);
    reset();
    setCancelCount((prev) => prev + 1);
  };

  const handleLookAwayComplete = () => {
    if (lookAwayTimer === 0) {
      setIsLookAway(false);
    }
  };

  useEffect(handleLookAwayComplete, [lookAwayTimer]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        showModal
          ? "bg-gradient-to-r from-yellow-200 to-yellow-300"
          : "bg-gradient-to-r from-gray-100 to-gray-200"
      }`}
    >
      <TimerCard
        timeLeft={isLookAway ? twentySeconds : timer}
        start={isLookAway ? () => {} : start}
        pause={isLookAway ? () => {} : pause}
        reset={reset}
        isActive={isActive && !isLookAway}
        lookAwayCount={lookAwayCount}
        cancelCount={cancelCount}
      />
      {showModal && (
        <LookAwayModal
          onClose={handleClose}
          onContinue={handleContinue}
          timeLeft={lookAwayTimer}
          start={start}
          isActive={isActive}
        />
      )}
    </div>
  );
}

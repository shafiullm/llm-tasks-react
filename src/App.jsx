import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const Timer = ({ time, isRunning, onStart, onPause, onReset }) => (
  <Card className="w-full max-w-sm mx-auto">
    <CardHeader>
      <CardTitle className="text-center text-2xl font-bold">
        20-20-20 Rule Timer
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center text-7xl font-bold mb-6">
        {formatTime(time)}
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          onClick={isRunning ? onPause : onStart}
          className="w-32 h-12 flex text-center items-center justify-center"
        >
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="w-32 h-12 flex items-center justify-center"
        >
          Reset
        </Button>
      </div>
    </CardContent>
  </Card>
);

const Modal = ({ isOpen, title, description, actionText, onAction }) => (
  <AlertDialog open={isOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction
          onClick={onAction}
          className="w-full sm:w-auto h-12 flex items-center justify-center"
        >
          {actionText}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default function App() {
  const [mainTime, setMainTime] = useState(20 * 60);
  const [lookAwayTime, setLookAwayTime] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [showLookAwayModal, setShowLookAwayModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [currentTimer, setCurrentTimer] = useState("main");

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (currentTimer === "main") {
          setMainTime((prevTime) => {
            if (prevTime <= 1) {
              setIsRunning(false);
              setShowLookAwayModal(true);
              return 20 * 60;
            }
            return prevTime - 1;
          });
        } else if (currentTimer === "lookAway") {
          setLookAwayTime((prevTime) => {
            if (prevTime <= 1) {
              setIsRunning(false);
              setShowCompletionModal(true);
              return 20;
            }
            return prevTime - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentTimer]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMainTime(20 * 60);
  };

  const handleLookAwayStart = () => {
    setShowLookAwayModal(false);
    setCurrentTimer("lookAway");
    setIsRunning(true);
  };

  const handleCompletion = () => {
    setShowCompletionModal(false);
    setCurrentTimer("main");
    setMainTime(20 * 60);
    setLookAwayTime(20);
    setIsRunning(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {currentTimer === "main" ? (
          <Timer
            time={mainTime}
            isRunning={isRunning}
            onStart={handleStartPause}
            onPause={handleStartPause}
            onReset={handleReset}
          />
        ) : (
          <Card className="w-full max-w-sm mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">
                Look Away Timer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-7xl font-bold mb-4">
                {formatTime(lookAwayTime)}
              </div>
            </CardContent>
          </Card>
        )}

        <Modal
          isOpen={showLookAwayModal}
          title="Time to look away!"
          description="Look at least 20 feet away for 20 seconds."
          actionText="Continue"
          onAction={handleLookAwayStart}
        />

        <Modal
          isOpen={showCompletionModal}
          title="Good job!"
          description="You can start working now."
          actionText="Continue"
          onAction={handleCompletion}
        />
      </div>
    </div>
  );
}

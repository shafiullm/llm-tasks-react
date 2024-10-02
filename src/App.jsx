import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function WaterInput({ value, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" onClick={onDecrement}>
        -
      </Button>
      <input
        type="text"
        value={`${value.toFixed(2)} L`}
        readOnly
        className="text-center w-16 bg-transparent border-b-2 border-gray-300 focus:outline-none"
      />
      <Button variant="outline" onClick={onIncrement}>
        +
      </Button>
    </div>
  );
}

export default function App() {
  const [consumed, setConsumed] = useState(0);
  const [tempInput, setTempInput] = useState(0);
  const goalMax = 3.7;
  const goalMin = 2.7;
  const remaining = Math.max(goalMax - consumed, 0);

  const handleIncrement = () =>
    setTempInput((prev) => Math.min(prev + 0.25, goalMax));
  const handleDecrement = () =>
    setTempInput((prev) => Math.max(prev - 0.25, 0));

  const addWater = () => {
    setConsumed((prev) => Math.min(prev + tempInput, goalMax));
    setTempInput(0);
  };

  const clearWater = () => {
    setConsumed(0);
    setTempInput(0);
  };

  const getProgressColor = () => {
    if (consumed < 1.7 || consumed > 3.7) return "red";
    if (consumed < 2.7) return "yellow";
    return "green";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Water Consumption Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            value={(consumed / goalMax) * 100}
            className={`mb-4 h-4 ${getProgressColor()}`}
          />
          <div className="flex justify-between mb-4">
            <span>Consumed: {consumed.toFixed(2)} L</span>
            <span>Remaining: {remaining.toFixed(2)} L</span>
          </div>
          <p className="text-sm text-center text-gray-500">
            Goal: {goalMin} to {goalMax} liters
          </p>
          <WaterInput
            value={tempInput}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
          <div className="mt-4 flex space-x-2">
            <Button
              onClick={addWater}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              Add
            </Button>
            <Button
              onClick={clearWater}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

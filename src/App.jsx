import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DAILY_WATER_GOAL = {
  min: 2.7,
  max: 3.7,
};

const CONSUMPTION_LEVELS = {
  low: 1.7,
  medium: 2.7,
  high: 3.7,
};

export default function App() {
  const [waterRemaining, setWaterRemaining] = useState(DAILY_WATER_GOAL.max);
  const [waterConsumed, setWaterConsumed] = useState(0);
  const [inputAmount, setInputAmount] = useState(0.0);

  useEffect(() => {
    const newWaterRemaining = Math.max(DAILY_WATER_GOAL.max - waterConsumed, 0);
    setWaterRemaining(Number(newWaterRemaining.toFixed(2)));
  }, [waterConsumed]);

  const handleIncrement = () => {
    setInputAmount((prev) => Number((prev + 0.25).toFixed(2)));
  };

  const handleDecrement = () => {
    setInputAmount((prev) => Math.max(Number((prev - 0.25).toFixed(2)), 0));
  };

  const handleAdd = () => {
    setWaterConsumed((prev) => Number((prev + inputAmount).toFixed(2)));
    setInputAmount(0.0);
  };

  const handleClear = () => {
    setWaterConsumed(0);
    setInputAmount(0.0);
  };

  const getProgressColor = (consumed) => {
    if (consumed >= CONSUMPTION_LEVELS.high) return "bg-red-500";
    if (consumed >= CONSUMPTION_LEVELS.medium) return "bg-green-500";
    if (consumed >= CONSUMPTION_LEVELS.low) return "bg-yellow-500";
    return "bg-red-500";
  };

  const progressPercentage = Math.min(
    (waterConsumed / DAILY_WATER_GOAL.max) * 100,
    100
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Water Consumption Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className={`h-2.5 rounded-full ${getProgressColor(
                waterConsumed
              )}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">Consumed</p>
              <p className="text-3xl font-bold text-green-600">
                {waterConsumed.toFixed(2)} L
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">Remaining</p>
              <p className="text-3xl font-bold text-blue-600">
                {waterRemaining.toFixed(2)} L
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Goal: {DAILY_WATER_GOAL.max} to {DAILY_WATER_GOAL.min} liters
          </p>

          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrement}
              className="h-10 w-10 text-xl font-bold"
            >
              −
            </Button>
            <span className="text-2xl font-bold w-20 text-center">
              {inputAmount.toFixed(2)} L
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleIncrement}
              className="h-10 w-10 text-xl font-bold"
            >
              +
            </Button>
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={handleAdd} className="w-24">
              Add
            </Button>
            <Button
              onClick={handleClear}
              variant="destructive"
              className="w-24"
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

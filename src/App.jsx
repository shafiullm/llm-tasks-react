import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const App = () => {
  const [consumed, setConsumed] = useState(0);

  const remaining = useMemo(() => Math.max(3.7 - consumed, 0), [consumed]);
  const progress = useMemo(() => {
    if (consumed > 3.7) return 100;
    return (consumed / 3.7) * 100;
  }, [consumed]);

  const handleIncrement = () =>
    setConsumed((prev) => Math.min(prev + 0.25, 3.7));
  const handleDecrement = () => setConsumed((prev) => Math.max(prev - 0.25, 0));
  const handleAdd = () => setConsumed(consumed + parseFloat(currentInput || 0));
  const handleClear = () => setConsumed(0);

  const [currentInput, setCurrentInput] = useState("0.25");

  const progressBarColor = useMemo(() => {
    if (consumed < 1.7) return "bg-red-500";
    if (consumed < 2.7) return "bg-yellow-500";
    return "bg-green-500";
  }, [consumed]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:px-6 lg:px-8">
      <Card className="w-full max-w-sm">
        <CardContent>
          <div className="mb-4">
            <ProgressBar value={progress} color={progressBarColor} />
          </div>
          <ConsumptionDisplay consumed={consumed} remaining={remaining} />
          <WaterInput
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            onAdd={handleAdd}
            onClear={handleClear}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const WaterInput = ({
  onIncrement,
  onDecrement,
  currentInput,
  setCurrentInput,
  onAdd,
  onClear,
}) => (
  <div className="grid grid-cols-3 gap-2 items-center mb-2">
    <Button variant="outline" onClick={onDecrement}>
      -
    </Button>
    <Input
      type="number"
      step="0.25"
      value={currentInput}
      onChange={(e) => setCurrentInput(e.target.value)}
      className="text-center"
    />
    <Button variant="outline" onClick={onIncrement}>
      +
    </Button>
    <Button className="col-span-3 bg-red-500 hover:bg-red-600" onClick={onAdd}>
      Add
    </Button>
    <Button
      className="col-span-3 bg-red-500 hover:bg-red-600"
      onClick={onClear}
    >
      Clear
    </Button>
  </div>
);

const ConsumptionDisplay = ({ consumed, remaining }) => (
  <div className="text-center mb-4">
    <h2 className="text-lg">Consumed: {consumed.toFixed(2)}L</h2>
    <h2 className="text-lg">Remaining: {remaining.toFixed(2)}L</h2>
    <p className="text-sm text-gray-500">Goal: 3.7 to 2.7 liters</p>
  </div>
);

const ProgressBar = ({ value, color }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
    <div
      style={{ width: `${value}%` }}
      className={`h-2.5 rounded-full ${color}`}
    ></div>
  </div>
);

export default App;

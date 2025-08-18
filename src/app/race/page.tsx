'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface CarState {
  x: number;
  y: number;
  speed: number;
  angle: number;
  acceleration: number;
  maxSpeed: number;
  handling: number;
}

interface RaceState {
  isRacing: boolean;
  lapTime: number;
  currentLap: number;
  totalLaps: number;
  position: number;
  bestLapTime: number;
  raceTime: number;
}

interface Controls {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

const RacePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | undefined>(undefined);
  const keysRef = useRef<Controls>({ up: false, down: false, left: false, right: false });
  
  const [car, setCar] = useState<CarState>({
    x: 400,
    y: 500,
    speed: 0,
    angle: 0,
    acceleration: 0.5,
    maxSpeed: 8,
    handling: 0.08
  });

  const [race, setRace] = useState<RaceState>({
    isRacing: false,
    lapTime: 0,
    currentLap: 1,
    totalLaps: 3,
    position: 1,
    bestLapTime: 0,
    raceTime: 0
  });

  const [checkpoints, setCheckpoints] = useState<boolean[]>([false, false, false, false]);

  // Track boundaries and checkpoints
  const trackData = {
    width: 800,
    height: 600,
    centerX: 400,
    centerY: 300,
    outerRadius: 250,
    innerRadius: 150,
    checkpointPositions: [
      { x: 400, y: 50, angle: 0 },
      { x: 650, y: 300, angle: Math.PI / 2 },
      { x: 400, y: 550, angle: Math.PI },
      { x: 150, y: 300, angle: (3 * Math.PI) / 2 }
    ]
  };

  // Keyboard event handlers
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        keysRef.current.up = true;
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        keysRef.current.down = true;
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        keysRef.current.left = true;
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        keysRef.current.right = true;
        break;
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        keysRef.current.up = false;
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        keysRef.current.down = false;
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        keysRef.current.left = false;
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        keysRef.current.right = false;
        break;
    }
  }, []);

  // Physics and collision detection
  const isOnTrack = (x: number, y: number): boolean => {
    const dx = x - trackData.centerX;
    const dy = y - trackData.centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= trackData.outerRadius && distance >= trackData.innerRadius;
  };

  const checkCheckpoints = (carX: number, carY: number) => {
    trackData.checkpointPositions.forEach((checkpoint, index) => {
      const dx = carX - checkpoint.x;
      const dy = carY - checkpoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 30 && !checkpoints[index]) {
        setCheckpoints(prev => {
          const newCheckpoints = [...prev];
          newCheckpoints[index] = true;
          
          // Check if all checkpoints are hit
          if (newCheckpoints.every(cp => cp)) {
            // Complete lap
            setRace(prevRace => {
              const newLapTime = prevRace.lapTime;
              const newBestLap = prevRace.bestLapTime === 0 || newLapTime < prevRace.bestLapTime 
                ? newLapTime 
                : prevRace.bestLapTime;
              
              return {
                ...prevRace,
                currentLap: prevRace.currentLap + 1,
                bestLapTime: newBestLap,
                lapTime: 0
              };
            });
            
            // Reset checkpoints
            return [false, false, false, false];
          }
          
          return newCheckpoints;
        });
      }
    });
  };

  // Game loop
  const updateGame = useCallback(() => {
    setCar(prevCar => {
      let newCar = { ...prevCar };
      const keys = keysRef.current;

      // Handle acceleration and braking
      if (keys.up) {
        newCar.speed = Math.min(newCar.speed + newCar.acceleration, newCar.maxSpeed);
      } else if (keys.down) {
        newCar.speed = Math.max(newCar.speed - newCar.acceleration * 1.5, -newCar.maxSpeed * 0.5);
      } else {
        newCar.speed *= 0.95; // Natural deceleration
      }

      // Handle steering (only when moving)
      if (Math.abs(newCar.speed) > 0.1) {
        if (keys.left) {
          newCar.angle -= newCar.handling * (newCar.speed / newCar.maxSpeed);
        }
        if (keys.right) {
          newCar.angle += newCar.handling * (newCar.speed / newCar.maxSpeed);
        }
      }

      // Update position
      const newX = newCar.x + Math.sin(newCar.angle) * newCar.speed;
      const newY = newCar.y - Math.cos(newCar.angle) * newCar.speed;

      // Check track boundaries
      if (isOnTrack(newX, newY)) {
        newCar.x = newX;
        newCar.y = newY;
      } else {
        // Hit wall - reduce speed significantly
        newCar.speed *= 0.3;
      }

      // Check checkpoints
      checkCheckpoints(newCar.x, newCar.y);

      return newCar;
    });

    // Update race time
    if (race.isRacing) {
      setRace(prevRace => ({
        ...prevRace,
        lapTime: prevRace.lapTime + 1/60, // Assuming 60 FPS
        raceTime: prevRace.raceTime + 1/60
      }));
    }
  }, [race.isRacing, checkpoints]);

  // Render game
  const renderGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw track
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 4;
    
    // Outer boundary
    ctx.beginPath();
    ctx.arc(trackData.centerX, trackData.centerY, trackData.outerRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Inner boundary
    ctx.beginPath();
    ctx.arc(trackData.centerX, trackData.centerY, trackData.innerRadius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw track surface
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const radius = trackData.innerRadius + (trackData.outerRadius - trackData.innerRadius) * (i / 8);
      ctx.beginPath();
      ctx.arc(trackData.centerX, trackData.centerY, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Draw checkpoints
    trackData.checkpointPositions.forEach((checkpoint, index) => {
      ctx.fillStyle = checkpoints[index] ? '#10b981' : '#ef4444';
      ctx.beginPath();
      ctx.arc(checkpoint.x, checkpoint.y, 15, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText((index + 1).toString(), checkpoint.x, checkpoint.y + 4);
    });

    // Draw car
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle);
    
    // Car body
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-8, -12, 16, 24);
    
    // Car details
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(-6, -10, 12, 8);
    ctx.fillRect(-6, 2, 12, 8);
    
    ctx.restore();

    // Draw speed indicator
    const speedPercent = Math.abs(car.speed) / car.maxSpeed;
    ctx.fillStyle = `hsl(${120 - speedPercent * 120}, 70%, 50%)`;
    ctx.fillRect(10, 10, 200 * speedPercent, 10);
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(10, 10, 200, 10);
  }, [car, checkpoints]);

  // Game loop
  useEffect(() => {
    const gameLoop = () => {
      updateGame();
      renderGame();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    if (race.isRacing) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [race.isRacing, updateGame, renderGame]);

  // Event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const startRace = () => {
    setRace(prev => ({ ...prev, isRacing: true, lapTime: 0, raceTime: 0 }));
    setCar(prev => ({ ...prev, x: 400, y: 500, speed: 0, angle: 0 }));
    setCheckpoints([false, false, false, false]);
  };

  const stopRace = () => {
    setRace(prev => ({ ...prev, isRacing: false }));
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toFixed(2);
    return `${minutes}:${seconds.padStart(5, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Game Canvas */}
          <div className="flex-1">
            <Card className="bg-slate-800 border-slate-700 p-4">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-auto border border-slate-600 rounded-lg"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Card>
          </div>

          {/* Race HUD */}
          <div className="w-full lg:w-80 space-y-4">
            {/* Race Controls */}
            <Card className="bg-slate-800 border-slate-700 p-4">
              <h3 className="text-lg font-bold mb-4">Race Control</h3>
              <div className="space-y-2">
                {!race.isRacing ? (
                  <Button onClick={startRace} className="w-full bg-green-600 hover:bg-green-700">
                    Start Race
                  </Button>
                ) : (
                  <Button onClick={stopRace} className="w-full bg-red-600 hover:bg-red-700">
                    Stop Race
                  </Button>
                )}
              </div>
            </Card>

            {/* Race Stats */}
            <Card className="bg-slate-800 border-slate-700 p-4">
              <h3 className="text-lg font-bold mb-4">Race Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Current Lap:</span>
                  <Badge variant="outline">{race.currentLap}/{race.totalLaps}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Lap Time:</span>
                  <span className="font-mono">{formatTime(race.lapTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Best Lap:</span>
                  <span className="font-mono">
                    {race.bestLapTime > 0 ? formatTime(race.bestLapTime) : '--:--'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Race Time:</span>
                  <span className="font-mono">{formatTime(race.raceTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Position:</span>
                  <Badge className="bg-yellow-600">{race.position}/4</Badge>
                </div>
              </div>
            </Card>

            {/* Car Stats */}
            <Card className="bg-slate-800 border-slate-700 p-4">
              <h3 className="text-lg font-bold mb-4">Car Status</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Speed:</span>
                    <span>{Math.round(Math.abs(car.speed) * 20)} km/h</span>
                  </div>
                  <Progress 
                    value={(Math.abs(car.speed) / car.maxSpeed) * 100} 
                    className="h-2"
                  />
                </div>
                <div className="flex justify-between">
                  <span>Gear:</span>
                  <span>{car.speed < 0 ? 'R' : Math.min(Math.floor(Math.abs(car.speed) * 2) + 1, 6)}</span>
                </div>
              </div>
            </Card>

            {/* Checkpoint Progress */}
            <Card className="bg-slate-800 border-slate-700 p-4">
              <h3 className="text-lg font-bold mb-4">Checkpoint Progress</h3>
              <div className="grid grid-cols-2 gap-2">
                {checkpoints.map((completed, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-center text-sm ${
                      completed 
                        ? 'bg-green-600 text-white' 
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    Checkpoint {index + 1}
                  </div>
                ))}
              </div>
            </Card>

            {/* Controls Help */}
            <Card className="bg-slate-800 border-slate-700 p-4">
              <h3 className="text-lg font-bold mb-4">Controls</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Accelerate:</span>
                  <span>↑ or W</span>
                </div>
                <div className="flex justify-between">
                  <span>Brake/Reverse:</span>
                  <span>↓ or S</span>
                </div>
                <div className="flex justify-between">
                  <span>Steer Left:</span>
                  <span>← or A</span>
                </div>
                <div className="flex justify-between">
                  <span>Steer Right:</span>
                  <span>→ or D</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RacePage;
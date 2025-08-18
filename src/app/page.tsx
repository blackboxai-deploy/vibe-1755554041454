"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';

interface Track {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  length: number;
  laps: number;
  environment: string;
  weather: string;
  description: string;
  bestTime?: string;
  unlocked: boolean;
}

interface Car {
  id: string;
  name: string;
  manufacturer: string;
  speed: number;
  acceleration: number;
  handling: number;
  braking: number;
  price: number;
  owned: boolean;
  description: string;
}

const tracks: Track[] = [
  {
    id: 'speedway',
    name: 'Thunder Speedway',
    difficulty: 'Easy',
    length: 2.5,
    laps: 3,
    environment: 'Stadium',
    weather: 'Clear',
    description: 'A classic oval speedway perfect for beginners',
    bestTime: '2:34.567',
    unlocked: true
  },
  {
    id: 'city',
    name: 'Metro City Circuit',
    difficulty: 'Medium',
    length: 3.2,
    laps: 5,
    environment: 'Urban',
    weather: 'Cloudy',
    description: 'Navigate through busy city streets with tight corners',
    bestTime: '4:12.890',
    unlocked: true
  },
  {
    id: 'mountain',
    name: 'Alpine Mountain Pass',
    difficulty: 'Hard',
    length: 4.8,
    laps: 4,
    environment: 'Mountain',
    weather: 'Rain',
    description: 'Challenging mountain roads with elevation changes',
    unlocked: true
  },
  {
    id: 'desert',
    name: 'Sahara Desert Rally',
    difficulty: 'Expert',
    length: 6.1,
    laps: 3,
    environment: 'Desert',
    weather: 'Sandstorm',
    description: 'Extreme desert conditions with limited visibility',
    unlocked: false
  }
];

const cars: Car[] = [
  {
    id: 'starter',
    name: 'Phoenix GT',
    manufacturer: 'Velocity Motors',
    speed: 75,
    acceleration: 70,
    handling: 80,
    braking: 75,
    price: 0,
    owned: true,
    description: 'A reliable starter car with balanced performance'
  },
  {
    id: 'sports',
    name: 'Viper X1',
    manufacturer: 'Thunder Racing',
    speed: 90,
    acceleration: 85,
    handling: 75,
    braking: 80,
    price: 25000,
    owned: false,
    description: 'High-speed sports car with excellent acceleration'
  },
  {
    id: 'supercar',
    name: 'Apex Fury',
    manufacturer: 'Elite Automotive',
    speed: 95,
    acceleration: 90,
    handling: 85,
    braking: 90,
    price: 75000,
    owned: false,
    description: 'Ultimate supercar with top-tier performance'
  },
  {
    id: 'formula',
    name: 'Lightning F1',
    manufacturer: 'Pro Racing',
    speed: 100,
    acceleration: 95,
    handling: 95,
    braking: 95,
    price: 150000,
    owned: false,
    description: 'Professional formula car for expert drivers'
  }
];

export default function HomePage() {
  const router = useRouter();
  const [selectedTrack, setSelectedTrack] = useState<Track>(tracks[0]);
  const [selectedCar, setSelectedCar] = useState<Car>(cars[0]);
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    experience: 250,
    maxExperience: 1000,
    credits: 15000,
    racesWon: 12,
    totalRaces: 28
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-orange-500';
      case 'Expert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatColor = (value: number) => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 75) return 'bg-yellow-500';
    if (value >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const startRace = () => {
    localStorage.setItem('selectedTrack', JSON.stringify(selectedTrack));
    localStorage.setItem('selectedCar', JSON.stringify(selectedCar));
    router.push('/race');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-blue-500/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                VELOCITY RACING
              </h1>
              <p className="text-blue-300 mt-1">Ultimate Racing Experience</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <div className="text-yellow-400 font-bold">Credits: ${playerStats.credits.toLocaleString()}</div>
                  <div className="text-blue-300">Level {playerStats.level}</div>
                </div>
                <div className="w-32">
                  <Progress value={(playerStats.experience / playerStats.maxExperience) * 100} className="h-2" />
                  <div className="text-xs text-gray-400 mt-1">
                    {playerStats.experience}/{playerStats.maxExperience} XP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Track and Car Selection */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="tracks" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-black/30">
                <TabsTrigger value="tracks" className="data-[state=active]:bg-blue-600">Select Track</TabsTrigger>
                <TabsTrigger value="cars" className="data-[state=active]:bg-blue-600">Select Car</TabsTrigger>
              </TabsList>

              <TabsContent value="tracks" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tracks.map((track) => (
                    <Card 
                      key={track.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedTrack.id === track.id 
                          ? 'ring-2 ring-blue-500 bg-blue-900/30' 
                          : 'bg-black/30 hover:bg-black/50'
                      } ${!track.unlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => track.unlocked && setSelectedTrack(track)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white">{track.name}</CardTitle>
                          <Badge className={getDifficultyColor(track.difficulty)}>
                            {track.difficulty}
                          </Badge>
                        </div>
                        <CardDescription className="text-gray-300">
                          {track.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-400">Length</div>
                            <div className="text-white font-semibold">{track.length} km</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Laps</div>
                            <div className="text-white font-semibold">{track.laps}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Environment</div>
                            <div className="text-white font-semibold">{track.environment}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Weather</div>
                            <div className="text-white font-semibold">{track.weather}</div>
                          </div>
                        </div>
                        {track.bestTime && (
                          <div className="mt-4 pt-4 border-t border-gray-600">
                            <div className="text-gray-400 text-sm">Best Time</div>
                            <div className="text-yellow-400 font-bold">{track.bestTime}</div>
                          </div>
                        )}
                        {!track.unlocked && (
                          <div className="mt-4 pt-4 border-t border-gray-600">
                            <div className="text-red-400 text-sm font-semibold">🔒 Locked</div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="cars" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cars.map((car) => (
                    <Card 
                      key={car.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedCar.id === car.id 
                          ? 'ring-2 ring-blue-500 bg-blue-900/30' 
                          : 'bg-black/30 hover:bg-black/50'
                      } ${!car.owned ? 'opacity-75' : ''}`}
                      onClick={() => car.owned && setSelectedCar(car)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-white">{car.name}</CardTitle>
                            <CardDescription className="text-gray-300">
                              {car.manufacturer}
                            </CardDescription>
                          </div>
                          {!car.owned && (
                            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                              ${car.price.toLocaleString()}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-gray-300">
                          {car.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Speed</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getStatColor(car.speed)} transition-all duration-500`}
                                  style={{ width: `${car.speed}%` }}
                                />
                              </div>
                              <span className="text-white text-sm font-semibold w-8">{car.speed}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Acceleration</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getStatColor(car.acceleration)} transition-all duration-500`}
                                  style={{ width: `${car.acceleration}%` }}
                                />
                              </div>
                              <span className="text-white text-sm font-semibold w-8">{car.acceleration}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Handling</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getStatColor(car.handling)} transition-all duration-500`}
                                  style={{ width: `${car.handling}%` }}
                                />
                              </div>
                              <span className="text-white text-sm font-semibold w-8">{car.handling}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Braking</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getStatColor(car.braking)} transition-all duration-500`}
                                  style={{ width: `${car.braking}%` }}
                                />
                              </div>
                              <span className="text-white text-sm font-semibold w-8">{car.braking}</span>
                            </div>
                          </div>
                        </div>
                        {!car.owned && (
                          <div className="mt-4 pt-4 border-t border-gray-600">
                            <Button 
                              className="w-full bg-yellow-600 hover:bg-yellow-700"
                              disabled={playerStats.credits < car.price}
                            >
                              {playerStats.credits >= car.price ? 'Purchase' : 'Insufficient Credits'}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Race Info and Start */}
          <div className="space-y-6">
            {/* Player Stats */}
            <Card className="bg-black/30">
              <CardHeader>
                <CardTitle className="text-white">Racing Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Races Won</span>
                    <span className="text-green-400 font-bold">{playerStats.racesWon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Races</span>
                    <span className="text-white font-bold">{playerStats.totalRaces}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Rate</span>
                    <span className="text-blue-400 font-bold">
                      {Math.round((playerStats.racesWon / playerStats.totalRaces) * 100)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Race Setup */}
            <Card className="bg-black/30">
              <CardHeader>
                <CardTitle className="text-white">Race Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-gray-400 text-sm">Selected Track</div>
                  <div className="text-white font-semibold">{selectedTrack.name}</div>
                  <div className="text-gray-300 text-sm">{selectedTrack.length} km • {selectedTrack.laps} laps</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Selected Car</div>
                  <div className="text-white font-semibold">{selectedCar.name}</div>
                  <div className="text-gray-300 text-sm">{selectedCar.manufacturer}</div>
                </div>
                <Button 
                  onClick={startRace}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 text-lg"
                  disabled={!selectedTrack.unlocked || !selectedCar.owned}
                >
                  START RACE
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-black/30">
              <CardHeader>
                <CardTitle className="text-white">Racing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>• Use WASD or Arrow Keys to control your car</div>
                  <div>• Brake before corners for better handling</div>
                  <div>• Watch your speed on wet surfaces</div>
                  <div>• Complete races to earn credits and XP</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
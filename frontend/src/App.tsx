import { useState } from 'react'
import { ModeToggle } from './components/Mode-toggle'
import { PlayerSearch } from './components/Player-Search'
import { Card } from './components/ui/card'
import { PerformanceCharts } from './components/Performancecharts'
import { Chatbot } from './components/Chatbot'
import './App.css'

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState({
    id: 'virat-kohli',
    name: 'Virat Kohli'
  });

  const handlePlayerSelect = (playerId: string, playerName: string) => {
    setSelectedPlayer({ id: playerId, name: playerName });
  };
  
  return (
    <>
       <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cricket Dashboard</h1>
        <ModeToggle />
      </header>

      <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Player Selection & Chatbot */}
        <div className="col-span-1 flex flex-col gap-8">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Select Player</h2>
            <PlayerSearch 
              onPlayerSelect={handlePlayerSelect}
              selectedPlayerId={selectedPlayer.id}
            />
          </Card>

          <Card className="flex-1 p-4 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Player Chatbot</h2>
            <Chatbot playerId={selectedPlayer.id} playerName={selectedPlayer.name} />
          </Card>
        </div>

        {/* Right Column: Charts and Visualizations */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-8">
          <Card className="p-4 flex-1">
            <h2 className="text-xl font-semibold mb-4">
              Performance Overview - {selectedPlayer.name}
            </h2>
            <PerformanceCharts playerId={selectedPlayer.id} />
          </Card>
          {/* Add more chart cards here as needed */}
        </div>
      </main>
    </div>
    </>
  )
}

export default App

import { ThirdPersonCamera, Model, OrbitCamera, Skybox, usePreload, World, Cube } from 'lingo3d-react'
import { useRef, useState } from 'react'

const Game = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const characterRef = useRef()

  return (
    <>
      <World logarithmicDepth>
        <Model
          src="Grassland.glb"
          scale={270}
          physics="map"
          onClick={(e) => {
            setPosition(e.point)
            characterRef.current.lookAt(e.point)
          }}
        />
        {/* <OrbitCamera active /> */}
        <ThirdPersonCamera active>
          <Model
            ref={characterRef}
            src="Fox.fbx"
            physics="character"
            animations={{ idle: 'Rifle Idle.fbx', walking: 'Rifle Run.fbx' }}
          />
        </ThirdPersonCamera>
        <Skybox texture="skybox.jpg" />
        <Cube color="orange" x={position.x} y={position.y} z={position.z}></Cube>
      </World>
    </>
  )
}

const App = () => {
  const progress = usePreload(
    [
      'Fox.fbx',
      'Grassland.glb',
      'ground.jpeg',
      'Idle.fbx',
      'Rifle Idle.fbx',
      'Rifle Run.fbx',
      'skybox.jpg',
      'Walking.fbx',
    ],
    '6.6mb',
  )

  if (progress < 100)
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          left: 0,
          top: 0,
          backgroundColor: 'black',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        loading {Math.round(progress)}%
      </div>
    )

  return <Game />
}

export default App

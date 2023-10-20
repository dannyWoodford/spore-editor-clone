import { useMemo, useState } from "react";
import { button, useControls } from "leva";

import Terrain from "./Terrain";

const TerrainManager = () => {
  const [seed, setSeed] = useState(Date.now());

  const { resolution, height, levels, scale, offsetX, offsetZ } = useControls('Terrain', {
		generate: button(() => setSeed(Date.now())),
		resolution: { value: 120, min: 10, max: 500, step: 1 },
		height: { value: 0.09, min: 0, max: 1 },
		levels: { value: 8, min: 1, max: 10, step: 1 },
		// scale: { value: 1, min: 1, max: 16, step: 1 },
		// offsetX: 0,
		// offsetZ: 0,
	})

  const offset = useMemo(
    () => ({ x: 0, z: 0 }),
    []
  );

  return (
		<group position={[0, 4.0, 0]}>
			<Terrain seed={seed} size={resolution} height={height} levels={levels} 
			// scale={scale} 
			offset={offset} />
		</group>
	)
};

export default TerrainManager;

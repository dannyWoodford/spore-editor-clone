import { useMemo, useState } from "react";
import { button, useControls } from "leva";

import Terrain from "./Terrain";

const TerrainManager = () => {
  const [seed, setSeed] = useState(Date.now());

  const { enabled, resolution, height, levels } = useControls('Terrain', {
		enabled: { value: false },
		generate: button(() => setSeed(Date.now())),
		resolution: { value: 120, min: 10, max: 500, step: 1 },
		height: { value: 0.09, min: 0, max: 1 },
		levels: { value: 8, min: 1, max: 10, step: 1 },
	})

  const offset = useMemo(
    () => ({ x: 0, z: 0 }),
    []
  );

  return (
		<group position={[0, -0.2, 0]}>
			{enabled && (
				<Terrain
					seed={seed}
					size={resolution}
					height={height}
					levels={levels}
					offset={offset}
				/>
			)}
		</group>
	)
};

export default TerrainManager;

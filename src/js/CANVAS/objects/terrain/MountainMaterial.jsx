import { extend, useLoader } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { TextureLoader } from 'three'
import { useControls } from 'leva'

extend({
	SlopeBlendMaterial: shaderMaterial(
		{
			tFlat: undefined,
			tSlope: undefined,
			fNormal: { type: 'v3', value: [], boundTo: 'faces' },
		},
		`    
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vUv = vec2(uv.x, uv.y);
      vNormal = vec3(normal.x, normal.y, normal.z);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
		`
    uniform sampler2D tFlat;
    uniform sampler2D tSlope;

    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vec4 flatTex = texture2D(tFlat, vUv);
      vec4 slopeTex = texture2D(tSlope, vUv);

      gl_FragColor = mix(flatTex, slopeTex, smoothstep(0.0, 0.1, acos(dot(vec3(0.0, 1.0, 0.0), vNormal)) / 12.0));
    }
    `
	),
})

const MountainMaterial = () => {
	const { cartoon } = useControls('Terrain', {
		cartoon: true,
	})

	const [flatTexture, slopeTexture, toonFlatTexture, toonSlopeTexture] = useLoader(TextureLoader, [
		process.env.PUBLIC_URL + '/textures/terrain/grass.jpg',
		process.env.PUBLIC_URL + '/textures/terrain/rock.jpg',
		process.env.PUBLIC_URL + '/textures/terrain/toon_grass.jpeg',
		process.env.PUBLIC_URL + '/textures/terrain/toon_rock.jpeg',
	])

	return <slopeBlendMaterial tFlat={cartoon ? toonFlatTexture : flatTexture} tSlope={cartoon ? toonSlopeTexture : slopeTexture} />
}

export default MountainMaterial

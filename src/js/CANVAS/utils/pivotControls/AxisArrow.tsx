import * as React from 'react'
import * as THREE from 'three'
import { ThreeEvent, useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { Html } from '@react-three/drei'
import { context } from './context'

const vec1 = new THREE.Vector3()
const vec2 = new THREE.Vector3()

export const calculateOffset = (clickPoint: THREE.Vector3, normal: THREE.Vector3, rayStart: THREE.Vector3, rayDir: THREE.Vector3) => {
  const e1 = normal.dot(normal)
  const e2 = normal.dot(clickPoint) - normal.dot(rayStart)
  const e3 = normal.dot(rayDir)

  if (e3 === 0) {
    return -e2 / e1
  }

  vec1
    .copy(rayDir)
    .multiplyScalar(e1 / e3)
    .sub(normal)
  vec2
    .copy(rayDir)
    .multiplyScalar(e2 / e3)
    .add(rayStart)
    .sub(clickPoint)

  const offset = -vec1.dot(vec2) / vec1.dot(vec1)
  return offset
}

const upV = new THREE.Vector3(0, 1, 0)
const offsetMatrix = new THREE.Matrix4()

export const AxisArrow: React.FC<{ direction: THREE.Vector3; axis: 0 | 1 | 2 }> = ({ direction, axis }) => {
  const {
    translation,
    translationLimits,
		translationSnap,
    annotationsClass,
    depthTest,
    scale,
    lineWidth,
    fixed,
    axisColors,
    hoveredColor,
    displayValues,
    opacity,
    onDragStart,
    onDrag,
    onDragEnd,
    userData
  } = React.useContext(context)

  // @ts-expect-error new in @react-three/fiber@7.0.5
  const camControls = useThree((state) => state.controls) as { enabled: boolean }
  const divRef = React.useRef<HTMLDivElement>(null!)
  const objRef = React.useRef<THREE.Group>(null!)
  const clickInfo = React.useRef<{ clickPoint: THREE.Vector3; dir: THREE.Vector3 } | null>(null)
  const offset0 = React.useRef<number>(0)
  const [isHovered, setIsHovered] = React.useState(false)

  const onPointerDown = React.useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (displayValues) {
        divRef.current.innerText = `${translation.current[axis].toFixed(2)}`
        divRef.current.style.display = 'block'
      }
      e.stopPropagation()
      const rotation = new THREE.Matrix4().extractRotation(objRef.current.matrixWorld)
      const clickPoint = e.point.clone()
      const origin = new THREE.Vector3().setFromMatrixPosition(objRef.current.matrixWorld)
      const dir = direction.clone().applyMatrix4(rotation).normalize()
      clickInfo.current = { clickPoint, dir }
      offset0.current = translation.current[axis]
      onDragStart({ component: 'Arrow', axis, origin, directions: [dir] })
      camControls && (camControls.enabled = false)
      // @ts-ignore - setPointerCapture is not in the type definition
      e.target.setPointerCapture(e.pointerId)
    },
		// eslint-disable-next-line react-hooks/exhaustive-deps
    [direction, camControls, onDragStart, translation, axis]
  )

  const onPointerMove = React.useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      if (!isHovered) setIsHovered(true)
      if (clickInfo.current) {
        const { clickPoint, dir } = clickInfo.current
        const [min, max] = translationLimits?.[axis] || [undefined, undefined]
				
        let offset = calculateOffset(clickPoint, dir, e.ray.origin, e.ray.direction)
				
				if (translationSnap) {
					offset = Math.round( offset / translationSnap ) * translationSnap
				}

				if (axis === 1) {
					// dont translate on y axis through floor
					// offset = Math.max(offset, 0 - offset0.current)
				}

				if (axis === 0) {
					// console.log('axis', axis)
					// console.log('parcelTotal * 10', parcelTotal * 10)
					// console.log('offset', offset)
					// console.log('translation', translation)
					// console.log('selected', selected)
					// console.log('selected', selected.position)
					// console.log('transformSelected', transformSelected.position)

					// const worldTranslation = new THREE.Vector3()


					// translation.getWorldPosition(worldTranslation)

					// dont translate on y axis through floor
					// offset = Math.max(offset, 0 - offset0.current)
				}

				
        if (min !== undefined) offset = Math.max(offset, min - offset0.current)
        if (max !== undefined) offset = Math.min(offset, max - offset0.current)
        translation.current[axis] = offset0.current + offset
        if (displayValues) divRef.current.innerText = `${translation.current[axis].toFixed(2)}`
				
        offsetMatrix.makeTranslation(dir.x * offset, dir.y * offset, dir.z * offset)
				// selected.position.set(dir.x * offset, dir.y * offset, dir.z * offset)

        onDrag(offsetMatrix)
      }
    },
		// eslint-disable-next-line react-hooks/exhaustive-deps
    [onDrag, isHovered, translation, translationLimits, translationSnap, axis]
  )

  const onPointerUp = React.useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (displayValues) divRef.current.style.display = 'none'
      e.stopPropagation()
      clickInfo.current = null
      onDragEnd()
      camControls && (camControls.enabled = true)
      // @ts-ignore - releasePointerCapture & PointerEvent#pointerId is not in the type definition
      e.target.releasePointerCapture(e.pointerId)
    },
		// eslint-disable-next-line react-hooks/exhaustive-deps
    [camControls, onDragEnd]
  )

  const onPointerOut = React.useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setIsHovered(false)
  }, [])

  const { cylinderLength, coneWidth, coneLength, matrixL } = React.useMemo(() => {
    const coneWidth = fixed ? (lineWidth / scale) * 1.6 : scale / 20
    const coneLength = fixed ? 0.2 : scale / 5
    const cylinderLength = fixed ? 1 - coneLength : scale - coneLength
    const quaternion = new THREE.Quaternion().setFromUnitVectors(upV, direction.clone().normalize())
    const matrixL = new THREE.Matrix4().makeRotationFromQuaternion(quaternion)
    return { cylinderLength, coneWidth, coneLength, matrixL }
  }, [direction, scale, lineWidth, fixed])

  const color_ = isHovered ? hoveredColor : axisColors[axis]

  return (
    <group ref={objRef}>
      <group
        matrix={matrixL}
        matrixAutoUpdate={false}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerOut}>
        <Html position={[0, -coneLength, 0]}>
          <div
            style={{
              display: 'none',
              background: '#151520',
              color: 'white',
              padding: '6px 8px',
              borderRadius: 7,
              whiteSpace: 'nowrap'
            }}
            className={annotationsClass}
            ref={divRef}
          />
        </Html>
        {/* The invisible mesh being raycast */}
        <mesh visible={false} position={[0, (cylinderLength + coneLength) / 2.0, 0]} userData={userData}>
          <cylinderGeometry args={[coneWidth * 1.4, coneWidth * 1.4, cylinderLength + coneLength, 8, 1]} />
        </mesh>
        {/* The visible mesh */}
        <Line
          transparent
          raycast={() => null}
          depthTest={depthTest}
          points={[0, 0, 0, 0, cylinderLength, 0] as any}
          lineWidth={lineWidth}
          color={color_ as any}
          opacity={opacity}
          polygonOffset
          renderOrder={1}
          polygonOffsetFactor={-10}
        />
        <mesh raycast={() => null} position={[0, cylinderLength + coneLength / 2.0, 0]} renderOrder={500}>
          <coneGeometry args={[coneWidth, coneLength, 24, 1]} />
          <meshBasicMaterial transparent depthTest={depthTest} color={color_} opacity={opacity} polygonOffset polygonOffsetFactor={-10} />
        </mesh>
      </group>
    </group>
  )
}

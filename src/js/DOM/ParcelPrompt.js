import React, { useRef, useState, useEffect } from 'react'
import { useGlobalState } from './../GlobalState'

export default function ParcelPrompt() {
	const initialPrompt = useGlobalState((state) => state.intro.initialPrompt)
	const setInitialPrompt = useGlobalState((state) => state.intro.setInitialPrompt)
	const changeParcelTotal = useGlobalState((state) => state.intro.changeParcelTotal)

	const [count, setCount] = useState(3)

	const ogInput = useRef()
	const mirrorInput = useRef()

	useEffect(() => {
		// ___ Mirror inputs _____________________________
		mirrorInput.current.value = count
		ogInput.current.value = count

		changeParcelTotal(count)

		// eslint-disable-next-line
	}, [count])

	return (
		<div className={`parcel-prompt-bg ${initialPrompt ? 'hide-prompt' : ''}`}>
			<div className='parcel-prompt'>
				<h1 className='title'>Base Dimensions</h1>
				<hr id='divider'></hr>
				<p className='text'>Please choose a workspace size by inputting parcel dimensions</p>
				<div className='parcel-count'>
					<div className='quantity'>
						<input ref={ogInput} type='number' step='1' defaultValue={3} onChange={(e) => setCount(e.target.value)} />

						<span className='quantity-split'>
							<h1 className='parcel-x'>X</h1>
							<img className='parcel-lock' alt='' src={process.env.PUBLIC_URL + '/icons/locked.svg'} />
						</span>

						<input ref={mirrorInput} type='number' step='1' defaultValue={3} onChange={(e) => setCount(e.target.value)} />

						<div className='arrow-container'>
							<button id='countUp' onClick={() => setCount(count + 1)}>
								<i className='arrow up'></i>
							</button>
							<button id='countDown' onClick={() => setCount(count - 1)}>
								<i className='arrow down'></i>
							</button>
						</div>
					</div>
					<h2 className='parcel-total'>= {count * count} parcels</h2>
				</div>
				<p className='text note'>*Note: To place structures on your land, you must own enough consecutive parcels</p>
				<div className='button-container'>
					<button className='button cancel'>Cancel</button>
					<button className='button ready' onClick={() => setInitialPrompt()}>
						Ready
					</button>
				</div>
			</div>
		</div>
	)
}

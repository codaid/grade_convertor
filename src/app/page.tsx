'use client'

import Bareme from '@/components/Bareme';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio, Input, Kbd, Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { MouseEvent, useEffect, useState } from 'react'

const Home = () => {

	const [manualEnter, setManualEnter] = useState<string>('-');
	const [calculManualEnter, setCalculManualEnter] = useState<number>(0);
	const [destinationGrade, setDestinationGrade] = useState<number>(20);
	const [totalGrade, setTotalGrade] = useState<number>(40);
	const [arGrade, setArGrade] = useState<number[]>([]);
	const [roundType, setRoundType] = useState<string>('inf');

	useEffect(() => {
		const prov: number[] = [0];
		for (let i = 0.5; i < totalGrade; i += 0.5) {
			prov.push(i);
		}
		setArGrade(prov);
	}, [totalGrade])

	const calcul = (numbEnter: string): void => {
		const nbrEnter = parseFloat(numbEnter);
		if (isNaN(nbrEnter)) {
			setCalculManualEnter(0);
			return;
		}

		setCalculManualEnter(nbrEnter / totalGrade * destinationGrade);
	}


	const handleInput = (e: MouseEvent<HTMLButtonElement>): void => {
		let newVal = manualEnter.replace('-', '');
		switch (e.currentTarget.id) {
			case 'raz' :
				newVal = '-';
				break;
			case 'dot':
				newVal = newVal.split('.')[0] + '.';
				break;
			case '.25':
			case '.50':
			case '.75':
				newVal = newVal.split('.')[0] + e.currentTarget.id;
				break;
			case 'erase':
				if (newVal.length < 2)
					newVal = '-';
				else
					newVal = newVal.slice(0, -1);
				break;
			default:
				newVal = newVal + e.currentTarget.id;
		}
		setManualEnter(newVal);
		calcul(newVal);
	}


	return (
		<div className='p-5'>
			<h1 className='text-center text-primary text-4xl mb-8'>Convertion de note</h1>
			<Card className='w-96 mx-auto mb-8'>
				<CardHeader className='p-0'>
					<RadioGroup
						label="Selectionne la façon d'arrondir"
						orientation='horizontal'
						value={roundType}
						onValueChange={setRoundType}
						className='mx-auto w-fit p-5 mb-5 justify-center'
					>
						<Radio value="inf">Inferieur</Radio>
						<Radio value="real">Juste</Radio>
					</RadioGroup>
				</CardHeader>
				<Divider/>
				<CardBody>
					{roundType === 'inf' &&
						<div className="flex h-5 items-center justify-center space-x-4 text-small">
							<p>9,74 =&gt; 9,50 </p>
							<Divider orientation="vertical" />
							<p>9,99 =&gt; 9,50 </p>
						</div>
					}
					{roundType === 'real' &&
						<div className="flex h-5 items-center justify-center space-x-4 text-small">
							<p>9,74 =&gt; 9,50 </p>
							<Divider orientation="vertical" />
							<p>9,75 =&gt; 10 </p>
						</div>
					}
				</CardBody>
			</Card>

			<Bareme defaultVal={totalGrade.toString()} handleVal={(val: number) => setTotalGrade(val)} />

			<div className='grid lg:grid-cols-2'>

				<Card className='w-96 mx-auto p-3 mb-8 h-fit'>
					<CardHeader className='grid grid-cols-[1fr_10px_1fr] gap-2'>
							<Input isReadOnly type="number" label={`Note /${totalGrade}`} value={manualEnter} />
							<Divider orientation="vertical" />
							<p>
								{roundType === 'inf' && 
									<Input className='w-full' isReadOnly type="number" label={`Note /${destinationGrade}`} value={(Math.floor(calculManualEnter * 2) / 2).toString()} />
								}
								{roundType === 'real' &&
									<Input className='w-full' isReadOnly type="number" label={`Note /${destinationGrade}`} value={(Math.round(calculManualEnter * 2) / 2).toString()} />
								}
							</p>
					</CardHeader>
					<Divider/>
					<CardBody>
						<div className='mx-auto grid grid-cols-4 w-80 gap-3 mb-8'>
							<Button onClick={handleInput} className='py-3 px-1 flex justify-center items-center h-full col-span-4' id='raz'>R.A.Z</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14' id='1'>1</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14' id='2'>2</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14' id='3'>3</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-full' id='erase'><Kbd keys={["delete"]}></Kbd></Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14' id='4'>4</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14' id='5'>5</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14' id='6'>6</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14' id='.25'>0,25</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14' id='7'>7</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14' id='8'>8</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14' id='9'>9</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14' id='.50'>0,50</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14 col-span-2' id='0'>0</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14' id='dot'>.</Button>
							<Button onClick={handleInput} className='py-2 px-1 flex justify-center items-center h-14' id='.75'>0,75</Button>
						</div>
					</CardBody>
				</Card>

				<div className="flex flex-col gap-3 mx-auto max-w-lg">
					<Table 
						color='primary'
						selectionMode="single"  
						aria-label="Example static collection table"
					>
						<TableHeader>
							<TableColumn>
								<Input type="number" label="Bareme total" placeholder={totalGrade.toString()} onChange={(e) => setTotalGrade(Number(e.target.value))} />
							</TableColumn>
							<TableColumn><Input type="number" label="Note Final" placeholder={destinationGrade.toString()} onChange={(e) => setDestinationGrade(Number(e.target.value))} /></TableColumn>
						</TableHeader>
						<TableBody>
							{arGrade.map((grade, key) => {
								return (
									<TableRow key={key} className='border-b-1 border-slate-200'>
										<TableCell>{grade}</TableCell>
										{roundType === 'inf' ?
											<TableCell>{ Math.floor((grade / totalGrade * 20) * 2) / 2 }</TableCell>
										:
											<TableCell>{ Math.round((grade / totalGrade * 20) * 2) / 2 }</TableCell>
										}
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</div>
			</div>

		</div>
	)
}

export default Home;
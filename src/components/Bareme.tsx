'use client'

import React, { MouseEvent, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardBody, CardHeader, Divider, Kbd} from "@nextui-org/react";

type TBareme = {
	handleVal: (val:  number) => void,
	defaultVal: string
}

const Bareme = ({handleVal, defaultVal}: TBareme) => {
	const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
	const [val, setVal] = useState<string>(defaultVal);

	const handleInputVal = (e: MouseEvent<HTMLButtonElement>): void => {
		let newVal = val;
		switch (e.currentTarget.id) {
			case 'raz' :
				newVal = '';
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
					newVal = '';
				else
					newVal = newVal.slice(0, -1);
				break;
			default:
				newVal = newVal + e.currentTarget.id;
		}
		setVal(newVal);
	}

	const handleSave = () => {
		const numbVal = Number(val);
		if (isNaN(numbVal)) {
			return;
		}
		handleVal(numbVal);
		onClose();
	}

	return (
		<>
			<div className="mx-auto mb-8 flex justify-center">
				<Button onPress={onOpen} color="primary" variant="bordered">Bareme</Button>
			</div>
			<Modal
				isOpen={isOpen} 
				onOpenChange={onOpenChange}
				placement="center"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 text-center">Modifier le bareme</ModalHeader>
								<ModalBody>
									<Card className='w-96 mx-auto p-3 mb-8 h-fit'>
										<CardHeader className='grid grid-cols-[1fr_10px_1fr] gap-2'>
												<h5>Bareme /{val}</h5>
										</CardHeader>
										<Divider/>
										<CardBody>
											<div className='mx-auto grid grid-cols-4 w-80 gap-3 mb-8'>
												<Button onClick={handleInputVal} className='py-3 px-1 flex justify-center items-center h-full col-span-4' id='raz'>R.A.Z</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14' id='1'>1</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14' id='2'>2</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14' id='3'>3</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-full' id='erase'><Kbd keys={["delete"]}></Kbd></Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14' id='4'>4</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14' id='5'>5</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14' id='6'>6</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14' id='.25'>0,25</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14' id='7'>7</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14' id='8'>8</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14' id='9'>9</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14' id='.50'>0,50</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14 col-span-2' id='0'>0</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14' id='dot'>.</Button>
												<Button onClick={handleInputVal} className='py-2 px-1 flex justify-center items-center h-14' id='.75'>0,75</Button>
											</div>
										</CardBody>
									</Card>
								</ModalBody>
							<ModalFooter>
								<Button color="primary" onPress={handleSave}>
									Enregistrer
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

export default Bareme;
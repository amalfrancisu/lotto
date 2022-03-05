import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import { useTribes } from '@decentology/hyperverse-ethereum-tribes';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useHyperverse } from '@decentology/hyperverse';
import { useStorage } from '@decentology/hyperverse-storage-skynet';
import Image from 'next/image';


const Home: NextPage = () => {
	const router = useRouter();
	const { blockchain } = useHyperverse();
	const { address } = useEthereum();
	const { Tribe, Leave } = useTribes();
	const { data, isLoading: tribeDataLoading, error } = Tribe();
	console.log('Blockchian:', blockchain);
	const { clientUrl } = useStorage();

	const {
		mutate,
		isLoading: leaveTribeLoading,
		error: leaveErr,
	} = Leave({
		onSuccess: () => router.push('/'),
	});

	const isLoading = tribeDataLoading

	useEffect(() => {
		if (error) {
			if (error instanceof Error) {
				toast.error(error.message, {
					position: toast.POSITION.BOTTOM_CENTER,
				});
			}
		}
	}, [error]);
	return (
		<>
			<Head>
				<title>Casino Royale</title>
				<meta
					name="description"
					content="A Casino Royale game based on the tribes module"
				/>
			</Head>

			<main>
				<Nav />
				<div className={styles.hero} >
					<div className={styles.header}>
						<h2> Casino Royale</h2>
						<p className={styles.about}>
							Choose your card and get ready to win exciting prizes.
						</p>
						{address ? (
							!data ? (
								<button
									className={styles.join}
									onClick={() => {
										router.push('/all-tribes');
									}}
								>
									Choose a Card
								</button>
							) : (
								<button
									className={styles.join}
									onClick={() => router.push('/my-tribe')}
								>
									Change Your Card
								</button>
							)
						) : null}
					</div>




					<div className='yourCard'>
					{isLoading ? (
						<Loader loaderMessage="Processing..." />
					) : address && data ? (
						<div className='yourCard'>
						{/* <div className={styles.container3}> */}
							{data.image === 'N/A' ? (
								<div >
									<h2>{data.name}</h2>
								</div>
							) : (
								<div >
									<br>
									</br>
									<h2>Your Card</h2>
								<Image
									width={200}
									height={300}
									src={`${clientUrl}/${data.image}/`}
									alt={data.name}
									
								/>

<div >
								<h3>{data.name}</h3>
								<p >{data.description}</p>
							</div>

								</div>

								
								
							)}
	
							<div >
								<h3>{data.name}</h3>
								<p >{data.description}</p>
							</div>
						{/* </div> */}
						{/* <button className={styles.join} onClick={() => mutate()}>
							Leave Tribe
						</button> */}
					</div>

					) : (
						<div>hello</div>
					)
					}
				</div>

				</div>
				{/* <Footer /> */}



				
			</main>
		</>
	);
};

export default Home;

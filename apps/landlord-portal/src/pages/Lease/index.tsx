import { Container, Stack, Button } from '@mui/material';
import { styles } from './style';
import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import Filter from '../../components/Filter/Filter';
import { useEffect, useRef, useState } from 'react';
import { LeaseTable } from './LeaseTable';
import { filterOptions } from './filterOption';

const Lease = () => {
	const [filter, setFilter] = useState<Record<string, string | number>>({});

	return (
		<>
			<Container maxWidth='xl' sx={styles.container}>
				<Stack spacing={5}>
					<Stack
						direction={'row'}
						spacing={{ xs: 1, sm: 2, md: 4 }}
						sx={styles.buttonContainer}
					>
						<Button
							variant='contained'
							sx={styles.addLeaseButton}
							// onClick={handleAddProperties}
						>
							<LeftArrowIcon />
							Add New Lease
						</Button>
					</Stack>
					<Stack
						direction={'row'}
						spacing={{ xs: 1, sm: 2, md: 4 }}
						// sx={styles.buttonContainer}
					>
						<Filter
							filterList={filterOptions}
							getFilterResult={(options) => {
								setFilter(options);
							}}
							// disable={filterObjectLength ? false : !allPropertiesLength}
						/>
					</Stack>
					<Stack direction={'row'}>
						<LeaseTable title='Lease' filters={filter} />
					</Stack>
				</Stack>
			</Container>
		</>
	);
};

export default Lease;

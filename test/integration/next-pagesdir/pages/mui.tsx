
import * as React from "react";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from "@mui/material/Typography";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';


import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import Link from '@mui/material/Link';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const muiDefaultDarkTheme = createTheme({
	"palette": {
		"mode": "dark"
	}
});

const muiDefaultLightTheme = createTheme({
	"palette": {
		"mode": "light"
	}
});


export default function Mui() {

	const { isDark, setIsDark } = useIsDark();

	const [isProviderEnabled, setIsProviderEnabled] = React.useState(true);

	const Children = () => (
		<>
			<FormControlLabel control={<Switch
				checked={isProviderEnabled}
				onChange={event => setIsProviderEnabled(event.target.checked)}
				inputProps={{ 'aria-label': 'controlled' }}
			/>} label="Is provider enabled" />
			<br />
			<FormControlLabel control={<Switch
				checked={isDark}
				onChange={event => setIsDark(event.target.checked)}
				inputProps={{ 'aria-label': 'controlled' }}
			/>} label="Dark mode" />

			<Typography sx={{ mt: 2 }} variant="h4">
				This is a place for testing MUI components
			</Typography>
			<DataGridDemo />
			<BasicButtons />
			<ComboBox />
			<BasicChips />
			<IconMenu />
			<MaterialUIPickers />
			<BadgeVisibility />
			<HorizontalLinearStepper />
			<Links />
			<RecipeReviewCard />
		</>
	);

	return (
		isProviderEnabled ? (
			<MuiDsfrThemeProvider>
				<Children />
			</MuiDsfrThemeProvider>
		) : (
			<ThemeProvider theme={isDark ? muiDefaultDarkTheme : muiDefaultLightTheme}>
				<Children />
			</ThemeProvider>
		)
	);
}


const { ComboBox } = (() => {

	function ComboBox() {
		return (
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				options={top100Films}
				sx={{ width: 300, mt: 7 }}
				renderInput={(params) => <TextField {...params} label="Movie" />}
			/>
		);
	}

	// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
	const top100Films = [
		{ label: 'The Shawshank Redemption', year: 1994 },
		{ label: 'The Godfather', year: 1972 },
		{ label: 'The Godfather: Part II', year: 1974 },
		{ label: 'The Dark Knight', year: 2008 },
		{ label: '12 Angry Men', year: 1957 },
		{ label: "Schindler's List", year: 1993 },
		{ label: 'Pulp Fiction', year: 1994 },
		{
			label: 'The Lord of the Rings: The Return of the King',
			year: 2003,
		},
		{ label: 'The Good, the Bad and the Ugly', year: 1966 },
		{ label: 'Fight Club', year: 1999 },
		{
			label: 'The Lord of the Rings: The Fellowship of the Ring',
			year: 2001,
		},
		{
			label: 'Star Wars: Episode V - The Empire Strikes Back',
			year: 1980,
		},
		{ label: 'Forrest Gump', year: 1994 },
		{ label: 'Inception', year: 2010 },
		{
			label: 'The Lord of the Rings: The Two Towers',
			year: 2002,
		},
		{ label: "One Flew Over the Cuckoo's Nest", year: 1975 },
		{ label: 'Goodfellas', year: 1990 },
		{ label: 'The Matrix', year: 1999 },
		{ label: 'Seven Samurai', year: 1954 },
		{
			label: 'Star Wars: Episode IV - A New Hope',
			year: 1977,
		},
		{ label: 'City of God', year: 2002 },
		{ label: 'Se7en', year: 1995 },
		{ label: 'The Silence of the Lambs', year: 1991 },
		{ label: "It's a Wonderful Life", year: 1946 },
		{ label: 'Life Is Beautiful', year: 1997 },
		{ label: 'The Usual Suspects', year: 1995 },
		{ label: 'Léon: The Professional', year: 1994 },
		{ label: 'Spirited Away', year: 2001 },
		{ label: 'Saving Private Ryan', year: 1998 },
		{ label: 'Once Upon a Time in the West', year: 1968 },
		{ label: 'American History X', year: 1998 },
		{ label: 'Interstellar', year: 2014 },
		{ label: 'Casablanca', year: 1942 },
		{ label: 'City Lights', year: 1931 },
		{ label: 'Psycho', year: 1960 },
		{ label: 'The Green Mile', year: 1999 },
		{ label: 'The Intouchables', year: 2011 },
		{ label: 'Modern Times', year: 1936 },
		{ label: 'Raiders of the Lost Ark', year: 1981 },
		{ label: 'Rear Window', year: 1954 },
		{ label: 'The Pianist', year: 2002 },
		{ label: 'The Departed', year: 2006 },
		{ label: 'Terminator 2: Judgment Day', year: 1991 },
		{ label: 'Back to the Future', year: 1985 },
		{ label: 'Whiplash', year: 2014 },
		{ label: 'Gladiator', year: 2000 },
		{ label: 'Memento', year: 2000 },
		{ label: 'The Prestige', year: 2006 },
		{ label: 'The Lion King', year: 1994 },
		{ label: 'Apocalypse Now', year: 1979 },
		{ label: 'Alien', year: 1979 },
		{ label: 'Sunset Boulevard', year: 1950 },
		{
			label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
			year: 1964,
		},
		{ label: 'The Great Dictator', year: 1940 },
		{ label: 'Cinema Paradiso', year: 1988 },
		{ label: 'The Lives of Others', year: 2006 },
		{ label: 'Grave of the Fireflies', year: 1988 },
		{ label: 'Paths of Glory', year: 1957 },
		{ label: 'Django Unchained', year: 2012 },
		{ label: 'The Shining', year: 1980 },
		{ label: 'WALL·E', year: 2008 },
		{ label: 'American Beauty', year: 1999 },
		{ label: 'The Dark Knight Rises', year: 2012 },
		{ label: 'Princess Mononoke', year: 1997 },
		{ label: 'Aliens', year: 1986 },
		{ label: 'Oldboy', year: 2003 },
		{ label: 'Once Upon a Time in America', year: 1984 },
		{ label: 'Witness for the Prosecution', year: 1957 },
		{ label: 'Das Boot', year: 1981 },
		{ label: 'Citizen Kane', year: 1941 },
		{ label: 'North by Northwest', year: 1959 },
		{ label: 'Vertigo', year: 1958 },
		{
			label: 'Star Wars: Episode VI - Return of the Jedi',
			year: 1983,
		},
		{ label: 'Reservoir Dogs', year: 1992 },
		{ label: 'Braveheart', year: 1995 },
		{ label: 'M', year: 1931 },
		{ label: 'Requiem for a Dream', year: 2000 },
		{ label: 'Amélie', year: 2001 },
		{ label: 'A Clockwork Orange', year: 1971 },
		{ label: 'Like Stars on Earth', year: 2007 },
		{ label: 'Taxi Driver', year: 1976 },
		{ label: 'Lawrence of Arabia', year: 1962 },
		{ label: 'Double Indemnity', year: 1944 },
		{
			label: 'Eternal Sunshine of the Spotless Mind',
			year: 2004,
		},
		{ label: 'Amadeus', year: 1984 },
		{ label: 'To Kill a Mockingbird', year: 1962 },
		{ label: 'Toy Story 3', year: 2010 },
		{ label: 'Logan', year: 2017 },
		{ label: 'Full Metal Jacket', year: 1987 },
		{ label: 'Dangal', year: 2016 },
		{ label: 'The Sting', year: 1973 },
		{ label: '2001: A Space Odyssey', year: 1968 },
		{ label: "Singin' in the Rain", year: 1952 },
		{ label: 'Toy Story', year: 1995 },
		{ label: 'Bicycle Thieves', year: 1948 },
		{ label: 'The Kid', year: 1921 },
		{ label: 'Inglourious Basterds', year: 2009 },
		{ label: 'Snatch', year: 2000 },
		{ label: '3 Idiots', year: 2009 },
		{ label: 'Monty Python and the Holy Grail', year: 1975 },
	];

	return { ComboBox };

})();


function BasicButtons() {
	return (
		<>
			<Stack spacing={2} direction="row" sx={{ mt: 2 }}>
				<Button variant="text">Text</Button>
				<Button variant="contained">Contained</Button>
				<Button variant="outlined">Outlined</Button>
			</Stack>
			{/*
			<Stack spacing={2} direction="row" sx={{ mt: 7 }}>
				<Button color="secondary">Secondary</Button>
				<Button color="secondary" variant="contained">Secondary contained</Button>
				<Button color="secondary" variant="outlined">Secondary contained</Button>
			</Stack>
	*/}
			<Stack spacing={2} direction="row" sx={{ mt: 7 }}>
				<Button color="success">Success</Button>
				<Button color="success" variant="contained">Success contained</Button>
				<Button color="success" variant="outlined">Success contained</Button>
			</Stack>
			<Stack spacing={2} direction="row" sx={{ mt: 7 }}>
				<Button color="info">Info</Button>
				<Button color="info" variant="contained">Info contained</Button>
				<Button color="info" variant="outlined">Info contained</Button>
			</Stack>
			<Stack spacing={2} direction="row" sx={{ mt: 7 }}>
				<Button color="warning">Warning</Button>
				<Button color="warning" variant="contained">Warning contained</Button>
				<Button color="warning" variant="outlined">Warning contained</Button>
			</Stack>
			<Stack spacing={2} direction="row" sx={{ mt: 7 }}>
				<Button color="error">Error</Button>
				<Button color="error" variant="contained">Error contained</Button>
				<Button color="error" variant="outlined">Error contained</Button>
			</Stack>
		</>
	);
}

function BasicChips() {
	return (

		<Stack direction="row" spacing={1} sx={{ mt: 7 }}>
			<Chip label="Chip Filled" />
			<Chip label="Chip Outlined" variant="outlined" />
		</Stack>
	);
}

function IconMenu() {
	return (
		<Paper sx={{ width: 320, maxWidth: '100%', mt: 7 }}>
			<MenuList>
				<MenuItem>
					<ListItemIcon>
						<ContentCut fontSize="small" />
					</ListItemIcon>
					<ListItemText>Cut</ListItemText>
					<Typography variant="body2" color="text.secondary">
						⌘X
					</Typography>
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<ContentCopy fontSize="small" />
					</ListItemIcon>
					<ListItemText>Copy</ListItemText>
					<Typography variant="body2" color="text.secondary">
						⌘C
					</Typography>
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<ContentPaste fontSize="small" />
					</ListItemIcon>
					<ListItemText>Paste</ListItemText>
					<Typography variant="body2" color="text.secondary">
						⌘V
					</Typography>
				</MenuItem>
				<Divider />
				<MenuItem>
					<ListItemIcon>
						<Cloud fontSize="small" />
					</ListItemIcon>
					<ListItemText>Web Clipboard</ListItemText>
				</MenuItem>
			</MenuList>
		</Paper>
	);
}

function MaterialUIPickers() {
	const [value, setValue] = React.useState<Dayjs | null>(
		dayjs('2014-08-18T21:11:54'),
	);

	const handleChange = (newValue: Dayjs | null) => {
		setValue(newValue);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Stack spacing={3} sx={{ mt: 7 }}>
				<DesktopDatePicker
					label="Date desktop"
					inputFormat="MM/DD/YYYY"
					value={value}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
				<MobileDatePicker
					label="Date mobile"
					inputFormat="MM/DD/YYYY"
					value={value}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
				<TimePicker
					label="Time"
					value={value}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
				<DateTimePicker
					label="Date&Time picker"
					value={value}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
			</Stack>
		</LocalizationProvider>
	);

}
function BadgeVisibility() {
	const [count, setCount] = React.useState(1);
	const [invisible, setInvisible] = React.useState(false);

	const handleBadgeVisibility = () => {
		setInvisible(!invisible);
	};

	return (
		<Box
			sx={{
				mt: 7,
				color: 'action.active',
				display: 'flex',
				flexDirection: 'column',
				'& > *': {
					marginBottom: 2,
				},
				'& .MuiBadge-root': {
					marginRight: 4,
				},
			}}
		>
			<div>
				<Badge color="secondary" badgeContent={count}>
					<MailIcon />
				</Badge>
				<ButtonGroup>
					<Button
						aria-label="reduce"
						onClick={() => {
							setCount(Math.max(count - 1, 0));
						}}
					>
						<RemoveIcon fontSize="small" />
					</Button>
					<Button
						aria-label="increase"
						onClick={() => {
							setCount(count + 1);
						}}
					>
						<AddIcon fontSize="small" />
					</Button>
				</ButtonGroup>
			</div>
			<div>
				<Badge color="secondary" variant="dot" invisible={invisible}>
					<MailIcon />
				</Badge>
				<FormControlLabel
					sx={{ color: 'text.primary' }}
					control={<Switch checked={!invisible} onChange={handleBadgeVisibility} />}
					label="Show Badge"
				/>
			</div>
		</Box>
	);
}


const { HorizontalLinearStepper } = (() => {

	const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

	function HorizontalLinearStepper() {
		const [activeStep, setActiveStep] = React.useState(0);
		const [skipped, setSkipped] = React.useState(new Set<number>());

		const isStepOptional = (step: number) => {
			return step === 1;
		};

		const isStepSkipped = (step: number) => {
			return skipped.has(step);
		};

		const handleNext = () => {
			let newSkipped = skipped;
			if (isStepSkipped(activeStep)) {
				newSkipped = new Set(newSkipped.values());
				newSkipped.delete(activeStep);
			}

			setActiveStep((prevActiveStep) => prevActiveStep + 1);
			setSkipped(newSkipped);
		};

		const handleBack = () => {
			setActiveStep((prevActiveStep) => prevActiveStep - 1);
		};

		const handleSkip = () => {
			if (!isStepOptional(activeStep)) {
				// You probably want to guard against something like this,
				// it should never occur unless someone's actively trying to break something.
				throw new Error("You can't skip a step that isn't optional.");
			}

			setActiveStep((prevActiveStep) => prevActiveStep + 1);
			setSkipped((prevSkipped) => {
				const newSkipped = new Set(prevSkipped.values());
				newSkipped.add(activeStep);
				return newSkipped;
			});
		};

		const handleReset = () => {
			setActiveStep(0);
		};

		return (
			<Box sx={{ width: '100%', mt: 7 }}>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps: { completed?: boolean } = {};
						const labelProps: {
							optional?: React.ReactNode;
						} = {};
						if (isStepOptional(index)) {
							labelProps.optional = (
								<Typography variant="caption">Optional</Typography>
							);
						}
						if (isStepSkipped(index)) {
							stepProps.completed = false;
						}
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				{activeStep === steps.length ? (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>
							All steps completed - you&apos;re finished
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button onClick={handleReset}>Reset</Button>
						</Box>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Button
								color="inherit"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Back
							</Button>
							<Box sx={{ flex: '1 1 auto' }} />
							{isStepOptional(activeStep) && (
								<Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
									Skip
								</Button>
							)}
							<Button onClick={handleNext}>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</Box>
					</React.Fragment>
				)}
			</Box>
		);
	}


	return { HorizontalLinearStepper };


})();


const { DataGridDemo } = (() => {



	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{
			field: 'firstName',
			headerName: 'First name',
			width: 150,
			editable: true,
		},
		{
			field: 'lastName',
			headerName: 'Last name',
			width: 150,
			editable: true,
		},
		{
			field: 'age',
			headerName: 'Age',
			type: 'number',
			width: 110,
			editable: true,
		},
		{
			field: 'fullName',
			headerName: 'Full name',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
			valueGetter: (params: GridValueGetterParams) =>
				`${params.row.firstName || ''} ${params.row.lastName || ''}`,
		},
	];

	const rows = [
		{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
		{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
		{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
		{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
		{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
		{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
		{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
		{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
		{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
	];

	function DataGridDemo() {
		return (
			<div style={{ width: 800 }} >
			<Box sx={{ height: 400, mt: 7, width: "100%" }}>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					checkboxSelection
					disableSelectionOnClick
					experimentalFeatures={{ newEditingApi: true }}
				/>
			</Box>
			</div>
		);
	}

	return { DataGridDemo };



})();

const { Links } = (() => {


	const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

	function Links() {
		return (
			<Box
				sx={{
					typography: 'body1',
					'& > :not(style) + :not(style)': {
						ml: 2,
					},
					"mt": 7
				}}
				onClick={preventDefault}
			>
				<Link href="#">Link</Link>
				<Link href="#" target="_blank">Link target blank</Link>
				<Link href="#" color="inherit">
					{'color="inherit"'}
				</Link>
				<Link href="#" variant="body2">
					{'variant="body2"'}
				</Link>
			</Box>
		);
	}

	return { Links };

})();

const { RecipeReviewCard } = (() => {


	interface ExpandMoreProps extends IconButtonProps {
		expand: boolean;
	}

	const ExpandMore = styled((props: ExpandMoreProps) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { expand, ...other } = props;
		return <IconButton {...other} />;
	})(({ theme, expand }) => ({
		transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	}));

	function RecipeReviewCard() {
		const [expanded, setExpanded] = React.useState(false);

		const handleExpandClick = () => {
			setExpanded(!expanded);
		};

		return (
			<Card sx={{ maxWidth: 345, mt: 7 }}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
							R
						</Avatar>
					}
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title="Shrimp and Chorizo Paella"
					subheader="September 14, 2016"
				/>
				<CardMedia
					component="img"
					height="194"
					image="https://mui.com/static/images/cards/paella.jpg"
					alt="Paella dish"
				/>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						This impressive paella is a perfect party dish and a fun meal to cook
						together with your guests. Add 1 cup of frozen peas along with the mussels,
						if you like.
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography paragraph>Method:</Typography>
						<Typography paragraph>
							Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
							aside for 10 minutes.
						</Typography>
						<Typography paragraph>
							Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
							medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
							occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
							large plate and set aside, leaving chicken and chorizo in the pan. Add
							pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
							stirring often until thickened and fragrant, about 10 minutes. Add
							saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
						</Typography>
						<Typography paragraph>
							Add rice and stir very gently to distribute. Top with artichokes and
							peppers, and cook without stirring, until most of the liquid is absorbed,
							15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
							mussels, tucking them down into the rice, and cook again without
							stirring, until mussels have opened and rice is just tender, 5 to 7
							minutes more. (Discard any mussels that don&apos;t open.)
						</Typography>
						<Typography>
							Set aside off of the heat to let rest for 10 minutes, and then serve.
						</Typography>
					</CardContent>
				</Collapse>
			</Card>
		);
	}

	return { RecipeReviewCard };


})();

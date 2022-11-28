import * as React from "react";
import { createMuiDsfrThemeProvider, noAugmentation } from "@codegouvfr/react-dsfr/mui";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useIsDark } from "@codegouvfr/react-dsfr";
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

const { MuiDsfrThemeProvider } = createMuiDsfrThemeProvider({
	"augmentMuiTheme": noAugmentation
});

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

export function Mui() {

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

			<Typography sx={{ mt: 7 }} variant="h4">
				This is a place for testing MUI components
			</Typography>
			<ComboBox />
			<BasicButtons />
			<BasicChips />
			<IconMenu />
			<MaterialUIPickers />
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
		<Stack spacing={2} direction="row" sx={{ mt: 7 }}>
			<Button variant="text">Text</Button>
			<Button variant="contained">Contained</Button>
			<Button variant="outlined">Outlined</Button>
		</Stack>
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
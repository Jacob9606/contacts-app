import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CssBaseline,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContactCard from "./components/ContactCard"; // ContactCard 가져오기
import "./Contact.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#981A40",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleClose = () => {
    setSelectedContact(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Typography variant="h6">Resonate CX</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Contacts
          </Typography>
          <TextField
            label="Search Contacts"
            variant="outlined"
            fullWidth
            margin="normal"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Grid container spacing={3}>
            {filteredContacts.map((contact) => (
              <Grid item xs={12} sm={6} md={4} key={contact.id}>
                <ContactCard contact={contact} onCardClick={handleCardClick} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      {selectedContact && (
        <Dialog open={true} onClose={handleClose}>
          <DialogTitle>{selectedContact.name}</DialogTitle>
          <DialogContent>
            <Typography>Email: {selectedContact.email}</Typography>
            <Typography>Phone: {selectedContact.phone}</Typography>
            <Typography>Website: {selectedContact.website}</Typography>
            <Typography>Company: {selectedContact.company.name}</Typography>
            <Typography>
              Address:{" "}
              {`${selectedContact.address.suite}, ${selectedContact.address.street}, ${selectedContact.address.city}`}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Box className="footer">
        <Typography variant="body2" color="textSecondary" align="center">
          {"© "}
          Resonate 2001
          {"."}
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default App;

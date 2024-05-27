import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import "../Contact.css";

const ContactCard = ({ contact, onCardClick }) => (
  <Card className="contact-card" onClick={() => onCardClick(contact)}>
    <CardContent>
      <Typography variant="h6">{contact.name}</Typography>
      <Typography color="textSecondary">
        <EmailIcon /> {contact.email}
      </Typography>
      <Typography color="textSecondary">
        <PhoneIcon /> {contact.phone}
      </Typography>
      <Typography color="textSecondary">
        <LanguageIcon /> {contact.website}
      </Typography>
    </CardContent>
  </Card>
);

export default ContactCard;

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import book_hotel from "../../assets/book_hotel.jpg";
import cover_letter from "../../assets/cover_letter.jpg";
import visa_tips from "../../assets/visa_tips.jpg";
import return_ticket from "../../assets/return_ticker.jpg";

const blogCards = [
  {
    img: visa_tips, // Replace with your own or locally hosted
    title: "Visa Tips & Guides",
    desc: "Booked through official SRDV APIs and verifiable by airlines.",
  },
  {
    img: return_ticket,
    title: "Do I Need a Return Ticket for a ......",
    desc: "What embassies expect and how to avoid rejections.",
  },
  {
    img: cover_letter,
    title: "AI-Powered Visa Cover Letter",
    desc: "Craft your perfect visa cover letter in seconds — powered by AI for precision.",
  },
  {
    img: book_hotel,
    title: "How to Book a Hotel Without Pay......",
    desc: "Smart ways to create embassy-safe hotel vouchers.",
  },
];

export default function VisaHelpCards() {
  return (
    <Box sx={{ p: { xs: 5, md: 15 }, backgroundColor: "#fffaf9" }}>
      <Typography variant="h5" sx={{ fontWeight: 500, mb: 4, maxWidth: 600 }}>
        Dreaming of exploring new countries or building a career abroad?
        OnwardVisa makes your visa process smooth, fast, and stress-free
      </Typography>

      <Grid container spacing={3}>
        {blogCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Box>
              <CardMedia
                component="img"
                height="297"
                image={card.img}
                alt={card.title}
                sx={{ borderRadius: 3 }}
              />
              <CardContent sx={{ px: 0 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.desc}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

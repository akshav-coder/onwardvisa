import React from "react";
import {
  Box,
  Grid,
  Typography,
  CardMedia,
  CardContent,
  Link,
  Tooltip,
} from "@mui/material";
import book_hotel from "../../assets/book_hotel.jpg";
import cover_letter from "../../assets/cover_letter.jpg";
import visa_tips from "../../assets/visa_tips.jpg";
import return_ticket from "../../assets/return_ticker.jpg";

const blogCards = [
  {
    date: "March 2025",
    img: return_ticket,
    title: "Do I Need a Return Ticket for a ..........",
    desc: "Craft your perfect visa cover letter in seconds — powered by AI for precision.",
  },
  {
    date: "March 2025",
    img: cover_letter,
    title: "AI-Powered Visa Cover Letter",
    desc: "Craft your perfect visa cover letter in seconds — powered by AI for precision.",
  },
  {
    date: "May 2025",
    img: book_hotel,
    title: "How to Book a Hotel Without Pay......",
    desc: "Smart ways to create embassy-safe hotel vouchers.",
  },
];

export default function VisaHelpCards() {
  return (
    <Box sx={{ backgroundColor: "#fffaf9", px: { xs: 2, md: 10 }, py: 10 }}>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Latest News
      </Typography>
      <Typography
        variant="h5"
        fontWeight={600}
        textAlign="center"
        maxWidth={600}
        mx="auto"
        mt={1}
        mb={6}
      >
        Discover what’s new in the visa world—insights, updates, and stories
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {blogCards.map((card, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Box sx={{ width: 350, mx: "auto" }}>
              <CardMedia
                component="img"
                height="240"
                image={card.img}
                alt={card.title}
                sx={{ borderRadius: 2 }}
              />
              <CardContent sx={{ px: 0, pt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {card.date}
                </Typography>
                <Tooltip title={card.title} placement="top">
                  <Typography
                    variant="h6"
                    fontWeight={500}
                    gutterBottom
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {card.title}
                  </Typography>
                </Tooltip>
                <Typography variant="body2" color="text.secondary">
                  {card.desc}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box mt={6} textAlign="center">
        <Link href="#" underline="hover" fontWeight={500}>
          View More
        </Link>
      </Box>
    </Box>
  );
}

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  useTheme,
  Chip,
  useMediaQuery, // Import useMediaQuery
} from "@mui/material";
import { testimonials } from "../../utils/sampleData";

const TestimonialSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for small screens
  const isTablet = useMediaQuery(theme.breakpoints.down("md")); // Check for medium screens

  const [current, setCurrent] = useState(0);
  // Adjust slidesToShow based on screen size
  const slidesToShow = isMobile ? 1 : isTablet ? 2 : 3;
  const total = testimonials.length;

  // Mouse drag/swipe logic
  const [dragStartX, setDragStartX] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (e) => {
    setDragStartX(e.clientX);
    setDragging(true);
  };
  const handleMouseUp = (e) => {
    if (!dragging) return;
    const diff = e.clientX - dragStartX;
    if (diff > 50) {
      // Swipe right (previous)
      setCurrent((prev) =>
        prev - slidesToShow < 0
          ? total - (total % slidesToShow || slidesToShow)
          : prev - slidesToShow
      );
    } else if (diff < -50) {
      // Swipe left (next)
      setCurrent((prev) =>
        prev + slidesToShow >= total ? 0 : prev + slidesToShow
      );
    }
    setDragging(false);
    setDragStartX(null);
  };
  const handleMouseLeave = () => {
    setDragging(false);
    setDragStartX(null);
  };

  // Reset current index if slidesToShow changes (e.g., on screen resize)
  useEffect(() => {
    setCurrent(0);
  }, [slidesToShow]);

  // Only show `slidesToShow` at a time
  const visibleTestimonials = [];
  for (let i = 0; i < slidesToShow; i++) {
    visibleTestimonials.push(testimonials[(current + i) % total]);
  }

  return (
    <Box sx={{ mt: 2, px: { xs: 2, sm: 4 } }}>
      {" "}
      {/* Adjust horizontal padding */}
      <Chip label=" What people say about us" variant="outlined" />
      <Box
        sx={{
          maxWidth: "100%",
          py: 6,
          mt: 5,
          height: "100%",
          position: "relative",
          userSelect: dragging ? "none" : "auto",
          cursor: dragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <Box
          sx={{
            display: "flex",
            transition: dragging
              ? "none"
              : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {visibleTestimonials.map((item, index) => (
            <Box
              key={index}
              px={{ xs: 1, sm: 2 }} // Adjust horizontal padding for individual cards
              sx={{
                overflow: "visible",
                height: "100%",
                flex: `0 0 ${100 / slidesToShow}%`,
                boxSizing: "border-box",
                maxWidth: { xs: "100%", sm: 540 }, // Full width on small screens
                margin: "0 auto",
              }}
            >
              <Card
                elevation={1}
                sx={{
                  borderRadius: 2,
                  minHeight: 100,
                  overflow: "visible",
                  width: "100%",
                  borderTop: `4px solid ${theme.palette.primary.main}`,
                  p: 0,
                }}
              >
                <CardContent sx={{ textAlign: "center", pt: 4, px: 3 }}>
                  <Avatar
                    src={item.avatar}
                    alt={item.name}
                    sx={{
                      width: 60,
                      height: 60,
                      mx: "auto",
                      mb: 1,
                      mt: "-64px",
                      border: `3px solid ${theme.palette.primary.main}`,
                    }}
                  />

                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.location}
                  </Typography>
                  <Box sx={{ borderTop: "1px solid #ddd", my: 2 }} />
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    “{item.comment}”
                  </Typography>
                  <Rating
                    name="read-only"
                    value={item.rating}
                    precision={0.5}
                    readOnly
                  />
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
        {/* Pagination dots */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          {Array.from({ length: Math.ceil(total / slidesToShow) }).map(
            (_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background:
                    idx === Math.floor(current / slidesToShow)
                      ? theme.palette.primary.main
                      : "#ccc",
                  mx: 0.5,
                  transition: "background 0.3s",
                }}
              />
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TestimonialSlider;

import { Box, Button, Typography } from "@mui/material";
import React from "react";

const ProjectTitle = () => {
  const [typedText, setTypedText] = React.useState("");
  const fullText = "Minutes";
  React.useEffect(() => {
    let current = 0;
    let forward = true;
    let timeout;
    function type() {
      if (forward) {
        setTypedText(fullText.slice(0, current + 1));
        if (current < fullText.length - 1) {
          current++;
          timeout = setTimeout(type, 150);
        } else {
          forward = false;
          timeout = setTimeout(type, 1200);
        }
      } else {
        setTypedText(fullText.slice(0, current));
        if (current > 0) {
          current--;
          timeout = setTimeout(type, 80);
        } else {
          forward = true;
          timeout = setTimeout(type, 400);
        }
      }
    }
    type();
    return () => clearTimeout(timeout);
  }, []);
  return (
    <Box
      sx={{
        mt: 15,
        mb: 40,
        color: "white",
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Typography sx={{ fontSize: "34px", fontWeight: 800 }}>
        Get Embassy-Approved Travel
      </Typography>
      <Typography sx={{ fontSize: "34px", fontWeight: 800, mb: 2 }}>
        Documents in{" "}
        <span
          style={{
            borderRight: "2px solid #fff",
            paddingRight: 2,
            whiteSpace: "nowrap",
          }}
        >
          {typedText}
        </span>
      </Typography>
      <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
        Real flight tickets (with verifiable PNRs), hotel booking vouchers, and
      </Typography>
      <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 3 }}>
        visa cover letters — trusted by 20,000+ travelers worldwide.
      </Typography>

      <Button variant="contained" size="large">
        Get My Travel Docs
      </Button>
    </Box>
  );
};

export default ProjectTitle;

import React from "react";
import { Box, Typography, Container, Divider, Link } from "@mui/material";

const termsSections = [
  {
    title: "1. Purpose of the Service",
    content:
      "OnwardVisas offers travel itinerary documents meant for use as supporting paperwork in situations such as visa applications or proof of onward travel. These documents are not valid tickets and should not be used for actual travel or official verification.",
  },
  {
    title: "2. Disclaimer of Liability",
    content:
      "OnwardVisas does not guarantee that itinerary documents will be accepted by airlines, immigration, or government bodies. Use of our service is at your own discretion, and we are not liable for any consequences, including entry denial or travel delays.",
  },
  {
    title: "3. Prohibited Uses",
    content:
      "Our documents and website must not be used for illegal, misleading, or unauthorized purposes. You agree not to misrepresent travel plans or violate laws and regulations when using OnwardVisas services.",
  },
  {
    title: "4. Refund Policy",
    content:
      "All orders are final and non-refundable. However, if there is a mistake in your document due to an error from OnwardVisas, we will correct it at no extra cost.",
  },
  {
    title: "5. Intellectual Property",
    content:
      "All designs, content, and templates on the OnwardVisas website are our intellectual property. Any unauthorized copying or redistribution is strictly prohibited.",
  },
  {
    title: "6. Data Collection and Privacy",
    content:
      "OnwardVisas collects basic personal details (like name, email, travel origin/destination) to deliver your travel itinerary. This data is used only for service fulfillment and communication, and will never be sold to third parties.",
  },
  {
    title: "7. Limitation of Liability",
    content:
      "Our services are provided “as-is” without warranties. OnwardVisas’s maximum liability is limited to the fee paid for the document. You agree to release and hold us harmless from any issues arising from your use.",
  },
  {
    title: "8. Availability of Service",
    content:
      "We strive for uninterrupted service, but OnwardVisas is not responsible for temporary outages due to technical issues or external service failures.",
  },
  {
    title: "9. External Links",
    content:
      "OnwardVisas may include links to third-party websites. We are not responsible for the content, security, or practices of those sites.",
  },
  {
    title: "10. Governing Law",
    content:
      "These terms are governed by the laws of your jurisdiction. Any legal matters will be addressed in accordance with local legal procedures.",
  },
  {
    title: "11. Changes to the Terms",
    content:
      "OnwardVisas reserves the right to update these terms at any time. By continuing to use our services, you agree to the latest version of our Terms of Service.",
  },
  {
    title: "12. Contact Us",
    content:
      "For any questions or concerns, you can reach OnwardVisas at akshavanthm@gmail.com.",
  },
];

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6, fontFamily: "Manrope, sans-serif" }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #f0f4f8 60%, #e0ecfa 100%)",
          borderRadius: 4,
          boxShadow: "0 6px 32px 0 rgba(50,130,184,0.10)",
          px: { xs: 2, sm: 6 },
          py: { xs: 4, sm: 6 },
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0 12px 48px 0 rgba(50,130,184,0.18)",
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 700,
            background: "linear-gradient(90deg, #0f4c75 60%, #3282b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: 1.2,
            textAlign: "center",
          }}
        >
          Terms of Service & Privacy Policy
        </Typography>
        <Divider
          sx={{
            mb: 4,
            borderColor: "#3282b8",
            borderBottomWidth: 3,
            opacity: 0.2,
          }}
        />
        {termsSections.map((section, idx) => (
          <Box key={idx} sx={{ mb: 5, px: { xs: 0, sm: 2 } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                background: "linear-gradient(90deg, #3282b8 60%, #0f4c75 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1.5,
                letterSpacing: 0.5,
              }}
            >
              {section.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: 17, lineHeight: 1.7 }}
            >
              {section.content}
            </Typography>
          </Box>
        ))}
        <Divider
          sx={{
            mt: 7,
            borderColor: "#3282b8",
            borderBottomWidth: 2,
            opacity: 0.15,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            mt: 5,
            color: "text.secondary",
            textAlign: "center",
            fontSize: 15,
          }}
        >
          &copy; {new Date().getFullYear()} OnwardVisas. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfService;

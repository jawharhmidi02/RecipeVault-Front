import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import "/public/assets/fontawesome/css/fontawesome.css";
import "/public/assets/fontawesome/css/brands.css";
import "/public/assets/fontawesome/css/solid.css";
import "/public/assets/fontawesome/css/all.css";
import { Toaster } from "@/components/ui/toaster";
import FastLinks from "@/components/FastLinks/FastLinks";

export const metadata = {
  title: "Recipe Vault",
  description:
    "RecipeVault offers a vibrant community platform where culinary enthusiasts can discover, share, and explore a wide variety of recipes from around the world. Join us to find inspiration for every meal and connect with others who share your passion for cooking.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Host+Grotesk:ital,wght@0,300..800;1,300..800&family=Karla:ital,wght@0,200..800;1,200..800&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--bg)] font-geist">
        <Nav></Nav>
        <>{children}</>
        <Footer />
        <Toaster />
        <FastLinks/>
      </body>
    </html>
  );
}

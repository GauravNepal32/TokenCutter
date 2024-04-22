import Banner from "@/components/Global/Banner";
import Footer from "@/components/Global/Footer";
import { HeroHighlightDemo } from "@/components/Global/Hero";
import { HoverCard } from "@/components/Global/HoverCard";
import Navbar from "@/components/Global/Navbar";
import WhyUs from "@/components/Global/WhyUs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <Banner /> */}
      <Navbar />
      <HeroHighlightDemo />
      <WhyUs />
      <div className="container">
        <h1 className="text-3xl ">
          Package for {" "}
          <span className="text-primary font-bold">
            nodejs
          </span>
          {" "}
          now available
        </h1>
        <div className="mt-7">
          <Button>Try TokenCutter</Button>
          <Button className="ml-4" variant={'ghost'}>See the Docs</Button>
        </div>
      </div>
      <Footer />
    </main>
  );
}

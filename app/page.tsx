import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { MyDiary } from "@/components/sections/my-diary";
import { ClientShell } from "@/components/client-shell";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <ClientShell>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <MyDiary />
        <Contact />
      </main>
      <Footer />
    </ClientShell>
  );
}

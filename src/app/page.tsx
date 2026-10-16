import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { InterviewDemo } from "@/components/sections/InterviewDemo";
import { Evaluation } from "@/components/sections/Evaluation";
import { PracticeLoop } from "@/components/sections/PracticeLoop";
import { RolePreparation } from "@/components/sections/RolePreparation";
import { Trust } from "@/components/sections/Trust";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <InterviewDemo />
      <Evaluation />
      <PracticeLoop />
      <RolePreparation />
      <Trust />
      <AppShowcase />
      <FinalCTA />
    </>
  );
}

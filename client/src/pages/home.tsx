import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import ProjectsSection from "@/components/projects-section";
import VideoProjectsSection from "@/components/video-projects-section";
import WorkProcessSection from "@/components/work-process-section";
import AboutSection from "@/components/about-section";
import TestimonialsSection from "@/components/testimonials-section";
import CTASection from "@/components/cta-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import AnimatedBackground from "@/components/animated-background";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <VideoProjectsSection />
        <WorkProcessSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

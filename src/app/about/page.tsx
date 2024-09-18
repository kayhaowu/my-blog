import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "Information about me",
};

export default async function AboutPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            About me
          </h1>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="min-w-48 max-w-48 flex flex-col gap-2">
          <Avatar className="h-48 w-48">
            <AvatarImage src="/avatar.png" alt={siteConfig.author} />
            <AvatarFallback>kay_wu</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center break-words">
            {siteConfig.author}
          </h2>
          <p className="text-muted-foreground text-center break-words">
            Software Engineer <br /> Lab Administrator
          </p>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4">Professional Experience</h3>
          
          <h4 className="text-xl font-medium mb-2">System Engineer</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>Managed software data center and conducted System Integration Testing (SIT)</li>
            <li>Worked in DevOps team, familiar with CI/CD development processes</li>
            <li>Responsible for testing optical transceivers, line-rate testing, and EEPROM checks</li>
            <li>Deployed network topologies for testing and managed daily lab operations</li>
            <li>Currently learning Jenkins CI for sonic-mgmt development process</li>
          </ul>

          <h4 className="text-xl font-medium mb-2">Lab Management</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>Maintained LaaS (Lab as a Service) reservation system for switch management</li>
            <li>Utilized Netbox for recording and managing lab switches and test servers</li>
            <li>Updated Netbox information daily using LaaS API and Netbox API</li>
            <li>Responsible for server and switch rack installation and development environment setup</li>
            <li>Managed power description unit (PDU) and console servers</li>
            <li>Implemented TIG (Telegraf+InfluxDB+Grafana) for PDU information visualization</li>
          </ul>

          <h4 className="text-xl font-medium mb-2">AWS Management Project</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>Developed using Next.js framework with Microsoft Azure SAML SSO integration</li>
            <li>Implemented user instance and snapshot creation limits</li>
            <li>Enabled instance recovery from snapshots</li>
            <li>Developed SNMP API using Next.js pages router for remote PDU socket control</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

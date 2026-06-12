import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  return (
    <AppShell>
      <Card>
        <CardHeader><CardTitle>User Profile</CardTitle></CardHeader>
        <CardContent>
          <form action="/api/profile" method="post" className="grid gap-4 md:grid-cols-2">
            <Input name="name" defaultValue="Hetvi Founder" aria-label="Name" />
            <Input name="headline" defaultValue="AI SaaS Founder" aria-label="Headline" />
            <Input name="location" defaultValue="San Francisco / Remote" aria-label="Location" />
            <Input name="skills" defaultValue="LLMs, Product, GTM, Fundraising" aria-label="Skills" />
            <Textarea name="bio" className="md:col-span-2" defaultValue="Building AI-native tools for ambitious startup teams." aria-label="Bio" />
            <div className="flex flex-wrap gap-2 md:col-span-2">{["LLMs", "Product", "GTM", "Fundraising"].map((skill) => <Badge key={skill}>{skill}</Badge>)}</div>
            <Button className="md:w-fit">Save profile</Button>
          </form>
        </CardContent>
      </Card>
    </AppShell>
  );
}

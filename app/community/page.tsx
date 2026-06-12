import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const posts = [
  { title: "How are teams pricing AI agents in vertical SaaS?", tag: "Pricing", replies: 34 },
  { title: "Investor update template that actually gets replies", tag: "Fundraising", replies: 21 },
  { title: "Share your best failed validation experiment", tag: "Validation", replies: 58 }
];

export default function CommunityPage() {
  return (
    <AppShell>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-3xl font-bold text-white">Community Forum</h1><p className="mt-2 text-slate-400">Founder discussions with posts, comments, likes, and bookmarks.</p></div>
        <Button asChild><a href="#new-post">New post</a></Button>
      </div>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.title}>
            <CardContent className="flex items-center justify-between p-5">
              <div><Badge>{post.tag}</Badge><h2 className="mt-3 font-semibold text-white">{post.title}</h2></div>
              <span className="text-sm text-slate-400">{post.replies} replies</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card id="new-post" className="mt-6">
        <CardHeader><CardTitle>Publish a founder question</CardTitle></CardHeader>
        <CardContent>
          <form action="/api/forum" method="post" className="grid gap-4">
            <Input name="title" placeholder="Question title" required />
            <Textarea name="body" placeholder="Add useful context, constraints, and what you have tried." required />
            <Input name="tags" placeholder="fundraising, pricing, validation" />
            <Button type="submit">Publish post</Button>
          </form>
        </CardContent>
      </Card>
    </AppShell>
  );
}

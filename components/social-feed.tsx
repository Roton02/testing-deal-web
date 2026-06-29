import Link from "next/link";
import { Heart, MessageCircle, Share2, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { postsByPlatform, type SocialPlatform } from "@/lib/data/social";

/**
 * Simulated social feed. Each post is tagged as deal / non-deal so future
 * social scraping can be validated against a known ground truth.
 */
export function SocialFeed({ platform }: { platform: SocialPlatform }) {
  const posts = postsByPlatform(platform);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      {posts.map((post) => (
        <article
          key={post.id}
          data-social-post
          data-is-deal={post.isDeal ? "true" : "false"}
          className="overflow-hidden rounded-xl border bg-card"
        >
          <div className="flex items-center gap-3 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.avatar} alt={post.author} className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <p className="flex items-center gap-1 font-semibold">
                {post.author}
                <BadgeCheck className="h-4 w-4 text-sky-500" />
              </p>
              <p className="text-xs text-muted-foreground">
                {post.handle} · {new Date(post.timestamp).toLocaleDateString()}
              </p>
            </div>
            <Badge variant={post.isDeal ? "success" : "secondary"}>
              {post.isDeal ? "Promotion" : "Not a deal"}
            </Badge>
          </div>

          <p className="px-4 pb-3 text-sm">{post.text}</p>

          {post.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt="" className="w-full object-cover" />
          )}

          <div className="flex items-center gap-6 p-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" /> {post.likes.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" /> {post.comments.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Share2 className="h-4 w-4" /> {post.shares.toLocaleString()}
            </span>
            {post.dealId && (
              <Link
                href={`/deal/${post.dealId}`}
                className="ml-auto text-primary hover:underline"
              >
                View deal →
              </Link>
            )}
          </div>

          <p className="border-t bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">
            {post.testNote}
          </p>
        </article>
      ))}
    </div>
  );
}

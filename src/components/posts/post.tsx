"use client";

import { CMSPost } from "@/lib/cms";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PostProps {
  post: CMSPost;
  compact?: boolean;
}

export default function Post({ post, compact = false }: PostProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + "...";
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
        <CardDescription>
          By {post.author} • {formatDate(post.created_at)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-muted-foreground whitespace-pre-wrap">
            {compact ? truncateContent(post.content) : post.content}
          </p>
        </div>
        {post.media && post.media.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {post.media.slice(0, 4).map((media) => (
              <div key={media.id} className="relative aspect-video rounded-md overflow-hidden bg-muted">
                {media.type.startsWith("image") ? (
                  <img
                    src={media.url}
                    alt="Post media"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-xs text-muted-foreground">{media.type}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        {post.updated_at !== post.created_at && (
          <span>Updated: {formatDate(post.updated_at)}</span>
        )}
      </CardFooter>
    </Card>
  );
}



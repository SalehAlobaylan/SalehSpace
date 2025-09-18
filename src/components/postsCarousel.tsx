// "use client";
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Carousel, 
    CarouselContent, 
    CarouselItem, 
    CarouselPrevious, 
    CarouselNext 
} from "@/components/ui/carousel"
import { ArrowRight } from "lucide-react";

type Post = {
    id: string
    title: string
    url: string
    date: string // ISO
    source: "blog" | "x" | "linkedin"
    excerpt?: string
}

export default async function PostsCarousel() {
    // Use absolute URL that works in both dev and production
    const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : process.env.NODE_ENV === 'development' 
            ? 'http://localhost:3000' 
            : 'https://salehspace.dev'
    
    const res = await fetch(`${baseUrl}/posts.json`, {
        next: { revalidate: 86400 } // 24 hours
    })
    
    if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status}`)
    }
    
    const posts: Post[] = await res.json()

    const recent = posts
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 12)

    return (
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-sm"
            >
              <CarouselContent>
                {recent.map((post, index) => (
                  <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-3xl font-semibold">{post.title}</span>
                          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                          <p className="text-sm text-muted-foreground">{post.date}</p>
                        </CardContent>
                      </Card>
                      <Button variant="outline" className="w-full mt-2">
                        Read More {post.source}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )
}
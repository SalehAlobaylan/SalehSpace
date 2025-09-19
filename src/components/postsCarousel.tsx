"use client";
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Carousel, 
    CarouselContent, 
    CarouselItem, 
    CarouselPrevious, 
    CarouselNext 
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { ArrowRight } from "lucide-react";

type Post = {
    id: string
    title: string
    url: string
    date: string 
    source: "blog" | "x" | "linkedin"
    excerpt?: string
}

export default function PostsCarousel() {
    const [posts, setPosts] = React.useState<Post[]>([])
    const [loading, setLoading] = React.useState(true)
    const [api, setApi] = React.useState<any>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        fetch('/posts.json')
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch posts:', err)
                setLoading(false)
            })
    }, [])

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    if (loading) {
        return <div className="flex justify-center p-8">Loading posts...</div>
    }

    const recent = posts
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
        .slice(0, 12)

    return (
        <div className="flex justify-center w-full">
            <Carousel
              setApi={setApi}
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: true,
                }),
              ]}
              opts={{
                align: "center",
                loop: true,
                slidesToScroll: 1,
              }}
              className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl"
            >
              <CarouselContent>
                {recent.map((post, index) => {
                  const isCenter = index === current
                  return (
                  <CarouselItem key={post.id} className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
                     <div className={`px-0.5 transition-all duration-300 ${isCenter ? 'scale-105 z-10' : 'scale-60 opacity-70'}`}>
                      <Card className={`${isCenter ? 'shadow-lg ring-2 ring-primary/20' : ''}`}>
                        <CardContent className="flex flex-col aspect-square items-start justify-between p-2">
                          <div className="space-y-1 flex-1">
                            <h3 className="text-sm font-semibold line-clamp-2 leading-tight">{post.title}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-3">{post.excerpt}</p>
                          </div>
                          <div className="w-full">
                            <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
                            <span className="inline-block mt-1 px-2 py-1 text-xs bg-secondary rounded-md capitalize">{post.source}</span>
                          </div>
                        </CardContent>
                      <Button variant="ghost" size="sm" className="ml-auto mt-1 text-xs opacity-60 hover:opacity-100 px-1 py-0.5 h-auto" asChild>
                        <a href={post.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                          Read on {post.source}
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </Button>
                      </Card>
                    </div>
                  </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
        </div>
          )
}
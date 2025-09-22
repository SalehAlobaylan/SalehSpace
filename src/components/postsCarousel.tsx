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

const isArabic = (text: string): boolean => /[\u0600-\u06FF\u0750-\u077F]/.test(text)

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
        <div className="w-full max-w-full px-2">
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
              className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto overflow-hidden"
            >
              <CarouselContent>
                {recent.map((post, index) => {
                  const isCenter = index === current
                  const content = post.excerpt || post.title
                  const isRtl = isArabic(content)
                  return (
                  <CarouselItem key={post.id} className="basis-[90%] sm:basis-[75%] md:basis-[65%] lg:basis-[55%]">
                     <div className={`px-1 transition-all duration-500 ease-out ${isCenter ? 'scale-100 z-20' : 'scale-95 opacity-50'}`}>
                      <Card className={`${isCenter ? 'shadow-2xl ring-2 ring-primary/30 bg-background' : 'shadow-sm'}`}>
                        <CardContent className={`flex flex-col gap-2 ${isCenter ? 'p-4' : 'p-2'}`}>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full overflow-hidden">
                              {post.source === 'x' ? (
                                <img 
                                  src="/x-profile.jpg" 
                                  alt="X Profile" 
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : post.source === 'linkedin' ? (
                                <img 
                                  src="/inkedin-profile.jpg" 
                                  alt="LinkedIn Profile" 
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-lg">📝</span>
                              )}
                            </span>
                            <span className="capitalize">{post.source}</span>
                            <span>•</span>
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <p dir={isRtl ? "rtl" : "ltr"} className={`leading-snug line-clamp-5 ${isCenter ? 'text-base' : 'text-sm'} ${isRtl ? 'text-right' : 'text-left'}`}>
                            {content}
                          </p>
                        </CardContent>
                      <Button variant="ghost" size="sm" className={`ml-auto mt-1 opacity-60 hover:opacity-100 px-1 py-0.5 h-auto ${isCenter ? 'text-sm' : 'text-xs'}`} asChild>
                        <a href={post.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                          Read on {post.source}
                          <ArrowRight className={`${isCenter ? 'w-4 h-4' : 'w-3 h-3'}`} />
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
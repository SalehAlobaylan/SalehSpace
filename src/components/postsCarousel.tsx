"use client";
import * as React from "react"

import { Carousel, 
    CarouselContent, 
    CarouselItem, 
    CarouselPrevious, 
    CarouselNext,
    type CarouselApi
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export interface Post {
    id: string;
    title: string;
    url: string;
    date: string;
    source: string;
    excerpt: string;
    image?: string | null;
}

const isArabic = (text: string): boolean => /[\u0600-\u06FF\u0750-\u077F]/.test(text)

const getIcon = (source: string) => {
    if (source === 'x' || source === 'linkedin') {
        return <img src="https://avatars.githubusercontent.com/u/87912478?v=4" alt="Profile" className="w-full h-full object-cover" />;
    } else {
        return <span className="text-xs flex items-center justify-center h-full w-full">📝</span>;
    }
};

export default function PostsCarousel({ posts }: { posts: Post[] }) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const recent = React.useMemo(() => {
        return [...posts].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            
            // Handle invalid dates by treating them as oldest
            const validA = !isNaN(dateA);
            const validB = !isNaN(dateB);

            if (!validA && !validB) return 0;
            if (!validA) return 1;
            if (!validB) return -1;

            return dateB - dateA;
        });
    }, [posts]);

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
                  const dateObj = new Date(post.date);
                  const dateStr = !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString() : "Recent";

                  return (
                  <CarouselItem key={post.id} className={`basis-[90%] sm:basis-[75%] md:basis-[65%] lg:basis-[55%] pl-4 ${isCenter ? 'is-selected' : ''}`}>
                     <div className="slide-inner h-full px-1">
                        <div className="post-card p-4 h-full flex flex-col">
                            {/* Header */}
                            <div className="flex items-center gap-2 text-[10px] opacity-70 mb-2 flex-none">
                                <span className="w-6 h-6 rounded-full bg-[#045C5A] border border-[#F6E5C6]/20 flex items-center justify-center overflow-hidden">
                                    {getIcon(post.source)}
                                </span>
                                <span className="capitalize font-semibold text-[#FFB703]">{post.source}</span>
                                <span>•</span>
                                <span className="mono">{dateStr}</span>
                            </div>
                            
                            {/* Content */}
                            <p className={`${isRtl ? 'rtl text-right' : 'text-left'} text-sm leading-relaxed mb-4 flex-grow line-clamp-4 overflow-hidden`}>
                                {content}
                            </p>
                            
                            {/* Footer Link */}
                            <div className="mt-auto pt-2 border-t border-[#F6E5C6]/5 flex justify-end flex-none">
                                <a href={post.url} target="_blank" className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#FFB703] hover:text-white transition-colors">
                                    Read on {post.source}
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                  </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious className="embla__button embla__prev" />
              <CarouselNext className="embla__button embla__next" />
            </Carousel>
        </div>
          )
}
